import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, Compass, MapPin, Sparkles, Users, Luggage, ShieldCheck, PhoneCall } from 'lucide-react'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { FAQsBlockComponent } from '@/blocks/FAQBlock/Component'
import { PricingBlockComponent } from '@/blocks/PricingBlock/Component'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { OrganizationSchema, BreadcrumbSchema } from '@/components/Schemas'
import ContentNavigation from '@/components/ContentNavigation'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const destinations = await payload.find({
    collection: 'destinations',
    draft: false,
    limit: 1000,
    select: { slug: true },
  })

  return destinations.docs
    .map((doc) => {
      const slug = typeof doc.slug === 'string' ? doc.slug : (doc.slug as any)?.slug
      return typeof slug === 'string' && slug.length > 0 ? { slug } : null
    })
    .filter(Boolean) as { slug: string }[]
}

type Props = {
  params: Promise<{ slug: string }>
}

const queryDestinationBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'destinations',
    limit: 1,
    where: { slug: { equals: slug } },
    depth: 2,
  })
  return result.docs?.[0] || null
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const destination = await queryDestinationBySlug(slug)
  if (!destination) return {}

  const title = destination.meta?.title || `Transport & Safari to ${destination.title} | Nairobi Car Hire & Transfer Rates`
  const description =
    destination.meta?.description ||
    destination.summary ||
    `Book reliable transport, 4x4 safari car hire, and corporate transfers from Nairobi to ${destination.title}. Distance: ${destination.distanceFromNairobiKm}km (${destination.estimatedTravelTime}). Professional drivers & verified fleet.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    alternates: {
      canonical: `/destinations/${slug}`,
    },
  }
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params
  const destination = await queryDestinationBySlug(slug)

  if (!destination) {
    return notFound()
  }

  const recommendedFleet = Array.isArray(destination.recommendedFleet) ? destination.recommendedFleet : []
  const highlights = Array.isArray(destination.highlights) ? destination.highlights : []
  const routeInfo = destination.routeInfo

  const breadcrumbItems = [
    { name: 'Destinations', url: '/destinations' },
    { name: destination.title, url: `/destinations/${slug}` },
  ]

  return (
    <main className="min-h-screen pb-24">
      <OrganizationSchema pageUrl={`/destinations/${slug}`} pageName={destination.title} />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/60 to-background border-b pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span>Destinations</span>
            <span>/</span>
            <span className="text-foreground/80">{destination.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2 mb-4">
                {destination.region && (
                  <Badge variant="secondary" className="font-semibold px-3 py-1 uppercase tracking-wider text-xs">
                    {destination.region.replace(/-/g, ' ')}
                  </Badge>
                )}
                <Badge variant="outline" className="px-3 py-1 text-xs">
                  {destination.distanceFromNairobiKm} KM from Nairobi
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                {destination.title} Transport & Safari Guide
              </h1>
              {destination.subTitle && (
                <p className="mt-4 text-lg sm:text-xl text-primary font-medium">
                  {destination.subTitle}
                </p>
              )}
              {destination.summary && (
                <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {destination.summary}
                </p>
              )}

              {/* Quick Route Stats Bar */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-card border">
                <div>
                  <span className="text-xs text-muted-foreground block flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> Distance
                  </span>
                  <span className="font-bold text-foreground text-sm sm:text-base">
                    {destination.distanceFromNairobiKm} KM
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" /> Travel Time
                  </span>
                  <span className="font-bold text-foreground text-sm sm:text-base">
                    {destination.estimatedTravelTime}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-xs text-muted-foreground block flex items-center gap-1">
                    <Compass className="h-3.5 w-3.5 text-primary" /> Terrain
                  </span>
                  <span className="font-bold text-foreground text-xs sm:text-sm capitalize">
                    {destination.roadCondition ? destination.roadCondition.replace(/-/g, ' ') : 'All-Weather'}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-xl px-6 font-semibold">
                  <Link href={`/search?q=${encodeURIComponent(destination.title)}`}>
                    Get Route Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {destination.featuredImage && typeof destination.featuredImage === 'object' && (
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
                  <Media resource={destination.featuredImage} className="w-full h-80 lg:h-96 object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area with Sticky ContentNavigation on MD+ Screens */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Destination Column */}
          <div className="lg:col-span-8 space-y-14 min-w-0">
            {/* Route & Highlights Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Highlights Card */}
              {highlights.length > 0 && (
                <div className="p-6 rounded-2xl border bg-card shadow-sm">
                  <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 mb-4 text-foreground">
                    <Sparkles className="h-5 w-5 text-primary" /> Key Highlights & Attractions
                  </h2>
                  <ul className="space-y-3">
                    {highlights.map((h: any, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{h.highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Logistics & Route Guide Card */}
              <div className="p-6 rounded-2xl border bg-card shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 mb-4 text-foreground">
                  <Compass className="h-5 w-5 text-primary" /> Route Logistics Guide
                </h2>
                <div className="space-y-3.5 text-sm">
                  <div>
                    <span className="font-semibold text-foreground block">Pickup & Starting Point:</span>
                    <span className="text-muted-foreground">{routeInfo?.startingPoint || 'Nairobi CBD, JKIA, Wilson Airport, or Hotel'}</span>
                  </div>
                  {routeInfo?.recommendedStops && (
                    <div>
                      <span className="font-semibold text-foreground block">Recommended En-Route Stops:</span>
                      <span className="text-muted-foreground">{routeInfo.recommendedStops}</span>
                    </div>
                  )}
                  {destination.bestTimeToVisit && (
                    <div>
                      <span className="font-semibold text-foreground block">Best Time to Visit:</span>
                      <span className="text-muted-foreground">{destination.bestTimeToVisit}</span>
                    </div>
                  )}
                  {routeInfo?.entryFeesNotes && (
                    <div className="p-3 rounded-xl bg-muted/60 text-xs text-muted-foreground border">
                      <span className="font-semibold text-foreground block mb-1">Park Fees & Access Notes:</span>
                      {routeInfo.entryFeesNotes}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main RichText Content */}
            {destination.content && (
              <section className="prose dark:prose-invert max-w-none">
                <RichText data={destination.content} enableGutter={false} />
              </section>
            )}

            {/* Dynamic Layout Blocks if defined */}
            {destination.layout && destination.layout.length > 0 && (
              <RenderBlocks blocks={destination.layout} />
            )}

            {/* Recommended Fleet for this Destination */}
            {recommendedFleet.length > 0 && (
              <section className="rounded-2xl border bg-muted/20 p-6 sm:p-8">
                <div className="mb-8">
                  <Badge variant="outline" className="mb-2">Vehicle Recommendations</Badge>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Recommended Fleet for {destination.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Specially selected based on the road terrain ({destination.roadCondition?.replace(/-/g, ' ')}), passenger comfort, and luggage space.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {recommendedFleet.map((vehicle: any) => {
                    if (typeof vehicle !== 'object') return null
                    return (
                      <div key={vehicle.id} className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                          {vehicle.featuredImage && typeof vehicle.featuredImage === 'object' && (
                            <div className="rounded-xl overflow-hidden mb-4 h-44 bg-muted">
                              <Media resource={vehicle.featuredImage} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <h3 className="text-base font-bold">{vehicle.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{vehicle.summary}</p>
                          
                          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground border-y py-2.5">
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5 text-primary" /> {vehicle.passengerCapacity} Seats
                            </span>
                            <span className="flex items-center gap-1">
                              <Luggage className="h-3.5 w-3.5 text-primary" /> {vehicle.luggageCapacity} Bags
                            </span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <Button asChild size="sm" variant="default" className="rounded-lg w-full font-semibold">
                            <Link href={`/hire/${vehicle.slug}/to/${destination.slug}`}>
                              Book {vehicle.title} to {destination.title}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Dynamic Route Pricing */}
            <PricingBlockComponent
              blockType="pricingBlock"
              destination={destination.id}
              title={`Transport & Transfer Rates to ${destination.title}`}
              subTitle="Transparent Route Pricing"
            />

            {/* Destination-Specific FAQs */}
            <FAQsBlockComponent
              blockType="faqsBlock"
              destination={destination.id}
              title={`Frequently Asked Questions: Travelling to ${destination.title}`}
              subTitle="Destination FAQs"
            />
          </div>

          {/* Sticky Sidebar Column for MD & Above */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <ContentNavigation title="Destination Guide" />

            {/* Quick Route Summary Card */}
            <div className="p-5 rounded-2xl border border-border bg-card/95 backdrop-blur shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Compass className="h-4 w-4" />
                <h3 className="font-bold text-foreground text-sm">Trip to {destination.title}</h3>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span>Distance:</span>
                  <span className="font-semibold text-foreground">{destination.distanceFromNairobiKm} KM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span>Travel Time:</span>
                  <span className="font-semibold text-foreground">{destination.estimatedTravelTime}</span>
                </div>
                {destination.bestTimeToVisit && (
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span>Best Time:</span>
                    <span className="font-semibold text-foreground">{destination.bestTimeToVisit}</span>
                  </div>
                )}
              </div>
              <Button asChild size="default" className="w-full rounded-xl font-semibold">
                <Link href={`/search?q=${encodeURIComponent(destination.title)}`}>
                  Book Transport <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </article>
    </main>
  )
}
