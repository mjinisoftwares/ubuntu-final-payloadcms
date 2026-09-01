import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Fuel,
  Gauge,
  Luggage,
  Radio,
  Refrigerator,
  ShieldCheck,
  Sparkles,
  Tv,
  Users,
  Wifi,
  Wind,
  Zap,
} from 'lucide-react'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { FAQsBlockComponent } from '@/blocks/FAQBlock/Component'
import { PricingBlockComponent } from '@/blocks/PricingBlock/Component'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const fleet = await payload.find({
    collection: 'fleet',
    draft: false,
    limit: 1000,
    select: { slug: true },
  })

  return fleet.docs
    .map((doc) => {
      const slug = typeof doc.slug === 'string' ? doc.slug : (doc.slug as any)?.slug
      return typeof slug === 'string' && slug.length > 0 ? { slug } : null
    })
    .filter(Boolean) as { slug: string }[]
}

type Props = {
  params: Promise<{ slug: string }>
}

const queryFleetBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'fleet',
    limit: 1,
    where: { slug: { equals: slug } },
    depth: 2,
  })
  return result.docs?.[0] || null
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const vehicle = await queryFleetBySlug(slug)
  if (!vehicle) return {}

  const title = vehicle.meta?.title || `Hire ${vehicle.title} in Nairobi, Kenya | Rates & Specs`
  const description =
    vehicle.meta?.description ||
    vehicle.summary ||
    `Rent a ${vehicle.title} (${vehicle.passengerCapacity} passenger seats) with professional chauffeur-guide. Ideal for safari tours, corporate transport, and Kenya excursions.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    alternates: {
      canonical: `/fleet/${slug}`,
    },
  }
}

export default async function FleetPage({ params }: Props) {
  const { slug } = await params
  const vehicle = await queryFleetBySlug(slug)

  if (!vehicle) {
    return notFound()
  }

  const specs = vehicle.specifications
  const featuresList = Array.isArray(vehicle.featuresList) ? vehicle.featuresList : []
  const idealFor = Array.isArray(vehicle.idealFor) ? vehicle.idealFor : []
  const gallery = Array.isArray(vehicle.gallery) ? vehicle.gallery : []

  // Schema.org structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: vehicle.title,
    description: vehicle.summary || vehicle.subTitle,
    seatingCapacity: vehicle.passengerCapacity,
    driveWheelConfiguration: specs?.is4WD ? 'AllWheelDrive' : 'FrontWheelDrive',
    fuelType: specs?.fuelType || 'Diesel',
    offers: {
      '@type': 'Offer',
      price: vehicle.baseDayRateKES,
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/60 to-background border-b pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span>Fleet</span>
            <span>/</span>
            <span className="text-foreground/80">{vehicle.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2 mb-4">
                {vehicle.vehicleType && (
                  <Badge variant="secondary" className="font-semibold px-3 py-1 uppercase tracking-wider text-xs">
                    {vehicle.vehicleType.replace(/-/g, ' ')}
                  </Badge>
                )}
                {specs?.is4WD && (
                  <Badge variant="default" className="px-3 py-1 text-xs font-semibold">
                    4x4 Capable
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                {vehicle.title}
              </h1>
              {vehicle.subTitle && (
                <p className="mt-4 text-lg sm:text-xl text-primary font-medium">
                  {vehicle.subTitle}
                </p>
              )}
              {vehicle.summary && (
                <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {vehicle.summary}
                </p>
              )}

              {/* Price Banner */}
              <div className="mt-6 p-4 rounded-xl bg-card border flex items-baseline justify-between max-w-md">
                <div>
                  <span className="text-xs text-muted-foreground block">Daily Hire Rate (with Chauffeur)</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xs font-semibold text-muted-foreground">KES</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
                      {vehicle.baseDayRateKES?.toLocaleString('en-KE')}
                    </span>
                    {vehicle.baseDayRateUSD && (
                      <span className="ml-2 text-xs font-medium text-muted-foreground">
                        (~${vehicle.baseDayRateUSD}/day)
                      </span>
                    )}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">Chauffeur Included</Badge>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-xl px-6 font-semibold">
                  <Link href={`/search?q=${encodeURIComponent(vehicle.title)}`}>
                    Inquire / Book This Vehicle <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {vehicle.featuredImage && typeof vehicle.featuredImage === 'object' && (
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
                  <Media resource={vehicle.featuredImage} className="w-full h-80 lg:h-96 object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Specifications & Amenities */}
      <section className="py-14 bg-background border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold tracking-tight">Vehicle Specifications & Amenities</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border bg-card text-center">
              <Users className="h-6 w-6 text-primary mx-auto mb-2" />
              <span className="text-xs text-muted-foreground block">Passenger Capacity</span>
              <span className="text-base font-bold text-foreground">{vehicle.passengerCapacity} Window Seats</span>
            </div>

            <div className="p-4 rounded-xl border bg-card text-center">
              <Luggage className="h-6 w-6 text-primary mx-auto mb-2" />
              <span className="text-xs text-muted-foreground block">Luggage Space</span>
              <span className="text-base font-bold text-foreground">{vehicle.luggageCapacity} Large Bags</span>
            </div>

            <div className="p-4 rounded-xl border bg-card text-center">
              <ShieldCheck className="h-6 w-6 text-primary mx-auto mb-2" />
              <span className="text-xs text-muted-foreground block">Drive System</span>
              <span className="text-base font-bold text-foreground">{specs?.is4WD ? 'Full 4x4 Off-Road' : '2WD High-Clearance'}</span>
            </div>

            <div className="p-4 rounded-xl border bg-card text-center">
              <Wind className="h-6 w-6 text-primary mx-auto mb-2" />
              <span className="text-xs text-muted-foreground block">Climate Control</span>
              <span className="text-base font-bold text-foreground">{specs?.hasAircon ? 'Dual A/C System' : 'Standard Ventilation'}</span>
            </div>

            {specs?.hasPopUpRoof && (
              <div className="p-4 rounded-xl border bg-card text-center">
                <Sparkles className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-xs text-muted-foreground block">Roof System</span>
                <span className="text-base font-bold text-foreground">Pop-Up Safari Hatch</span>
              </div>
            )}

            {specs?.hasWifi && (
              <div className="p-4 rounded-xl border bg-card text-center">
                <Wifi className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-xs text-muted-foreground block">Connectivity</span>
                <span className="text-base font-bold text-foreground">Onboard Wi-Fi</span>
              </div>
            )}

            {specs?.hasChargingPorts && (
              <div className="p-4 rounded-xl border bg-card text-center">
                <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-xs text-muted-foreground block">Power</span>
                <span className="text-base font-bold text-foreground">USB / Inverter Charging</span>
              </div>
            )}

            {specs?.hasCoolerBox && (
              <div className="p-4 rounded-xl border bg-card text-center">
                <Refrigerator className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-xs text-muted-foreground block">Beverages</span>
                <span className="text-base font-bold text-foreground">Built-in Cooler Box</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features & Ideal Use Cases */}
      {(featuresList.length > 0 || idealFor.length > 0) && (
        <section className="py-14 bg-muted/20 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuresList.length > 0 && (
                <div className="p-6 rounded-2xl border bg-card shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Vehicle Highlights & Customization</h3>
                  <ul className="space-y-3">
                    {featuresList.map((f: any, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{f.feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {idealFor.length > 0 && (
                <div className="p-6 rounded-2xl border bg-card shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Recommended For</h3>
                  <div className="flex flex-wrap gap-2">
                    {idealFor.map((tag: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="px-3 py-1.5 text-xs font-medium">
                        {tag.replace(/-/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      {vehicle.content && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl prose dark:prose-invert">
            <RichText data={vehicle.content} enableGutter={false} />
          </div>
        </section>
      )}

      {/* Dynamic Vehicle Pricing */}
      <PricingBlockComponent
        blockType="pricingBlock"
        fleet={vehicle.id}
        title={`${vehicle.title} Hire Rates & Route Packages`}
        subTitle="Transparent Vehicle Rates"
      />

      {/* Fleet-Specific FAQs */}
      <FAQsBlockComponent
        blockType="faqsBlock"
        fleet={vehicle.id}
        title={`Frequently Asked Questions: ${vehicle.title}`}
        subTitle="Fleet Vehicle FAQs"
      />
    </main>
  )
}
