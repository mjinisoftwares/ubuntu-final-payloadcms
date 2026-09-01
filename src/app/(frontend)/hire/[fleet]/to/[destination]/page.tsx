import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  CreditCard,
  Luggage,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Title from '@/components/Title'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const [fleetResult, destResult] = await Promise.all([
    payload.find({ collection: 'fleet', draft: false, limit: 50, select: { slug: true } }),
    payload.find({ collection: 'destinations', draft: false, limit: 50, select: { slug: true } }),
  ])

  const params: { fleet: string; destination: string }[] = []

  for (const f of fleetResult.docs) {
    const fSlug = typeof f.slug === 'string' ? f.slug : (f.slug as any)?.slug
    if (!fSlug) continue
    for (const d of destResult.docs) {
      const dSlug = typeof d.slug === 'string' ? d.slug : (d.slug as any)?.slug
      if (dSlug) {
        params.push({ fleet: fSlug, destination: dSlug })
      }
    }
  }

  return params
}

type Props = {
  params: Promise<{ fleet: string; destination: string }>
}

const queryProgrammaticData = cache(async (fleetSlug: string, destSlug: string) => {
  const payload = await getPayload({ config: configPromise })

  const [fleetResult, destResult] = await Promise.all([
    payload.find({
      collection: 'fleet',
      limit: 1,
      where: { slug: { equals: fleetSlug } },
      depth: 2,
    }),
    payload.find({
      collection: 'destinations',
      limit: 1,
      where: { slug: { equals: destSlug } },
      depth: 2,
    }),
  ])

  const vehicle = fleetResult.docs?.[0] || null
  const destination = destResult.docs?.[0] || null

  if (!vehicle || !destination) {
    return { vehicle: null, destination: null, pricing: [], faqs: [] }
  }

  // Fetch Pricing specific to this fleet & destination combination
  const pricingResult = await payload.find({
    collection: 'pricing',
    depth: 1,
    limit: 6,
    where: {
      or: [
        {
          and: [
            { fleet: { equals: vehicle.id } },
            { destination: { equals: destination.id } },
          ],
        },
        { fleet: { equals: vehicle.id } },
        { destination: { equals: destination.id } },
      ],
    },
  })

  // Fetch contextual FAQs: Fleet FAQs + Destination FAQs + Universal FAQs
  const faqsResult = await payload.find({
    collection: 'faqs',
    depth: 0,
    limit: 15,
    where: {
      or: [
        { fleet: { equals: vehicle.id } },
        { destination: { equals: destination.id } },
        { faqType: { equals: 'general' } },
      ],
    },
  })

  return {
    vehicle,
    destination,
    pricing: pricingResult.docs,
    faqs: faqsResult.docs,
  }
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { fleet: fleetSlug, destination: destSlug } = await params
  const { vehicle, destination } = await queryProgrammaticData(fleetSlug, destSlug)

  if (!vehicle || !destination) return {}

  const title = `Hire ${vehicle.title} to ${destination.title} | Nairobi Rates & Safari Booking`
  const description = `Book a ${vehicle.title} (${vehicle.passengerCapacity} seats, ${vehicle.specifications?.is4WD ? '4x4' : 'comfortable'}) for your trip from Nairobi to ${destination.title}. Distance: ${destination.distanceFromNairobiKm}km (${destination.estimatedTravelTime}). Chauffeur-guide included.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    alternates: {
      canonical: `/hire/${fleetSlug}/to/${destSlug}`,
    },
  }
}

export default async function ProgrammaticHirePage({ params }: Props) {
  const { fleet: fleetSlug, destination: destSlug } = await params
  const { vehicle, destination, pricing, faqs } = await queryProgrammaticData(fleetSlug, destSlug)

  if (!vehicle || !destination) {
    return notFound()
  }

  const specs = vehicle.specifications
  const routeInfo = destination.routeInfo

  // Route-specific price matching
  const exactRoutePrice = pricing.find(
    (p: any) =>
      typeof p.destination === 'object' &&
      p.destination?.id === destination.id &&
      typeof p.fleet === 'object' &&
      p.fleet?.id === vehicle.id,
  )

  const startingPriceKES = exactRoutePrice?.priceKES || vehicle.baseDayRateKES || 25000
  const startingPriceUSD = exactRoutePrice?.priceUSD || vehicle.baseDayRateUSD

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Hire ${vehicle.title} to ${destination.title}`,
    description: `Private transport and game drive safari car hire from Nairobi to ${destination.title} with a ${vehicle.title}.`,
    category: 'Transport & Tour Services',
    offers: {
      '@type': 'Offer',
      price: startingPriceKES,
      priceCurrency: 'KES',
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <main className="min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Programmatic Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/70 via-background to-background border-b pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6 flex-wrap">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href={`/fleet/${vehicle.slug}`} className="hover:text-foreground">{vehicle.title}</Link>
            <span>/</span>
            <span className="text-foreground/80">To {destination.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="default" className="px-3 py-1 font-semibold text-xs">
                  Direct Route Package
                </Badge>
                {specs?.is4WD && (
                  <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold">
                    4x4 Off-Road Verified
                  </Badge>
                )}
                <Badge variant="outline" className="px-3 py-1 text-xs">
                  {destination.distanceFromNairobiKm} KM Route
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                Hire <span className="text-primary">{vehicle.title}</span> to {destination.title}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Enjoy seamless, private transport and safari logistics from Nairobi to {destination.title} in our fully equipped {vehicle.title}. Driven by an experienced, vetted English-speaking chauffeur-guide.
              </p>

              {/* Route & Vehicle Highlights Pill */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-card border shadow-sm">
                <div>
                  <span className="text-xs text-muted-foreground block">Distance</span>
                  <span className="font-bold text-foreground text-sm sm:text-base">
                    {destination.distanceFromNairobiKm} KM
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Drive Time</span>
                  <span className="font-bold text-foreground text-sm sm:text-base">
                    {destination.estimatedTravelTime}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Capacity</span>
                  <span className="font-bold text-foreground text-sm sm:text-base">
                    {vehicle.passengerCapacity} Seats
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Luggage</span>
                  <span className="font-bold text-foreground text-sm sm:text-base">
                    {vehicle.luggageCapacity} Bags
                  </span>
                </div>
              </div>

              {/* Instant Price & CTA */}
              <div className="mt-8 p-5 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                    {exactRoutePrice ? 'Fixed Route Package' : 'Starting From (Day Rate)'}
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-sm font-bold text-muted-foreground">KES</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-foreground">
                      {startingPriceKES.toLocaleString('en-KE')}
                    </span>
                    {startingPriceUSD && (
                      <span className="ml-2 text-xs font-medium text-muted-foreground">
                        (~${startingPriceUSD})
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Includes professional chauffeur-guide & passenger insurance
                  </span>
                </div>

                <Button asChild size="lg" className="rounded-xl px-6 font-semibold w-full sm:w-auto">
                  <Link href={`/search?q=${encodeURIComponent(`${vehicle.title} ${destination.title}`)}`}>
                    Inquire / Book Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Vehicle & Destination Split Visuals */}
            <div className="lg:col-span-5 space-y-4">
              {vehicle.featuredImage && typeof vehicle.featuredImage === 'object' && (
                <div className="relative rounded-2xl overflow-hidden shadow-xl border bg-muted h-52">
                  <Media resource={vehicle.featuredImage} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-foreground">
                    Vehicle: {vehicle.title}
                  </div>
                </div>
              )}
              {destination.featuredImage && typeof destination.featuredImage === 'object' && (
                <div className="relative rounded-2xl overflow-hidden shadow-xl border bg-muted h-52">
                  <Media resource={destination.featuredImage} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-foreground">
                    Destination: {destination.title}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why this vehicle is ideal for this destination */}
      <section className="py-14 bg-background border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl border bg-card shadow-sm">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-foreground">
                <ShieldCheck className="h-5 w-5 text-primary" /> Route Logistics & Road Advice
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-foreground block">Road Terrain:</span>
                  <span className="text-muted-foreground capitalize">{destination.roadCondition?.replace(/-/g, ' ') || 'Mixed highway and off-road'}</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground block">Route:</span>
                  <span className="text-muted-foreground">{routeInfo?.startingPoint || 'Nairobi'} to {destination.title} ({destination.distanceFromNairobiKm} KM)</span>
                </div>
                {routeInfo?.recommendedStops && (
                  <div>
                    <span className="font-semibold text-foreground block">Stopovers:</span>
                    <span className="text-muted-foreground">{routeInfo.recommendedStops}</span>
                  </div>
                )}
                {routeInfo?.entryFeesNotes && (
                  <div className="p-3 rounded-xl bg-muted/60 text-xs text-muted-foreground border">
                    <span className="font-semibold text-foreground block mb-1">Park/Gate Entry:</span>
                    {routeInfo.entryFeesNotes}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 rounded-2xl border bg-card shadow-sm">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-foreground">
                <Sparkles className="h-5 w-5 text-primary" /> Vehicle Comfort on this Route
              </h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Seating for up to <strong>{vehicle.passengerCapacity} passengers</strong> with dedicated window seats.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Luggage boot fits up to <strong>{vehicle.luggageCapacity} large bags</strong> plus carry-on gear.</span>
                </li>
                {specs?.hasPopUpRoof && (
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Pop-up safari roof for unobstructed 360-degree photography in {destination.title}.</span>
                  </li>
                )}
                {specs?.hasAircon && (
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Dual air-conditioning for comfort along the Rift Valley corridor.</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Programmatic Pricing Breakdown */}
      {pricing.length > 0 && (
        <section className="py-16 bg-muted/30 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="mb-2">Rates & Packages</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {vehicle.title} to {destination.title} Rate Options
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricing.map((p: any, idx: number) => {
                const isExact =
                  typeof p.destination === 'object' &&
                  p.destination?.id === destination.id &&
                  typeof p.fleet === 'object' &&
                  p.fleet?.id === vehicle.id

                return (
                  <div
                    key={p.id ?? idx}
                    className={[
                      'p-6 rounded-2xl border bg-card shadow-sm flex flex-col justify-between',
                      isExact ? 'border-primary shadow-lg ring-1 ring-primary' : '',
                    ].join(' ')}
                  >
                    <div>
                      {isExact && (
                        <Badge className="mb-3 text-[10px] uppercase font-bold tracking-wider">
                          Exact Route Match
                        </Badge>
                      )}
                      <h3 className="text-lg font-bold">{p.title}</h3>
                      <div className="mt-4 border-y py-3">
                        <span className="text-2xl font-extrabold text-foreground">
                          KES {p.priceKES?.toLocaleString('en-KE')}
                        </span>
                        {p.priceUSD && (
                          <span className="ml-2 text-xs text-muted-foreground">(~${p.priceUSD})</span>
                        )}
                        <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                          {p.billingUnit?.replace(/_/g, ' ') || 'Per Day'}
                        </p>
                      </div>
                    </div>

                    <Button asChild className="mt-6 w-full rounded-xl" variant={isExact ? 'default' : 'outline'}>
                      <Link href={`/search?q=${encodeURIComponent(`${vehicle.title} ${destination.title}`)}`}>
                        Book Package
                      </Link>
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Programmatic Multi-Entity FAQs */}
      {faqs.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <Badge variant="outline" className="mb-2">Questions & Answers</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Frequently Asked Questions ({vehicle.title} & {destination.title})
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq: any, index: number) => (
                <AccordionItem
                  key={faq.id ?? index}
                  value={`faq-${faq.id ?? index}`}
                  className="rounded-xl border bg-card px-5 py-1"
                >
                  <AccordionTrigger className="text-left font-semibold text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pt-1 pb-4">
                    {faq.answer ? <RichText data={faq.answer} enableGutter={false} /> : null}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}
    </main>
  )
}
