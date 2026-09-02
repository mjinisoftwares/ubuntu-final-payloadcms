import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Luggage,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
  Wind,
  Zap,
  Refrigerator,
  Car,
} from 'lucide-react'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { FAQsBlockComponent } from '@/blocks/FAQBlock/Component'
import { PricingBlockComponent } from '@/blocks/PricingBlock/Component'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProductSchema, BreadcrumbSchema } from '@/components/Schemas'
import ContentNavigation from '@/components/ContentNavigation'

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

  const breadcrumbItems = [
    { name: 'Fleet', url: '/fleet' },
    { name: vehicle.title, url: `/fleet/${slug}` },
  ]

  return (
    <main className="min-h-screen pb-24">
      <ProductSchema
        name={vehicle.title}
        description={vehicle.summary || vehicle.subTitle}
        price={vehicle.baseDayRateKES}
        currency="KES"
        category="Vehicle Hire"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/60 to-background border-b pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span>Fleet</span>
            <span>/</span>
            <span className="text-foreground/80">{vehicle.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
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

      {/* Main Content Area with Sticky ContentNavigation on MD+ Screens */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Vehicle Column */}
          <div className="lg:col-span-8 space-y-14 min-w-0">
            {/* Specifications & Amenities */}
            <section className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Vehicle Specifications & Amenities</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border bg-muted/30 text-center">
                  <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                  <span className="text-xs text-muted-foreground block">Passenger Capacity</span>
                  <span className="text-sm font-bold text-foreground">{vehicle.passengerCapacity} Window Seats</span>
                </div>

                <div className="p-4 rounded-xl border bg-muted/30 text-center">
                  <Luggage className="h-6 w-6 text-primary mx-auto mb-2" />
                  <span className="text-xs text-muted-foreground block">Luggage Space</span>
                  <span className="text-sm font-bold text-foreground">{vehicle.luggageCapacity} Large Bags</span>
                </div>

                <div className="p-4 rounded-xl border bg-muted/30 text-center">
                  <ShieldCheck className="h-6 w-6 text-primary mx-auto mb-2" />
                  <span className="text-xs text-muted-foreground block">Drive System</span>
                  <span className="text-sm font-bold text-foreground">{specs?.is4WD ? 'Full 4x4 Off-Road' : '2WD High-Clearance'}</span>
                </div>

                <div className="p-4 rounded-xl border bg-muted/30 text-center">
                  <Wind className="h-6 w-6 text-primary mx-auto mb-2" />
                  <span className="text-xs text-muted-foreground block">Climate Control</span>
                  <span className="text-sm font-bold text-foreground">{specs?.hasAircon ? 'Dual A/C System' : 'Standard Ventilation'}</span>
                </div>

                {specs?.hasPopUpRoof && (
                  <div className="p-4 rounded-xl border bg-muted/30 text-center">
                    <Sparkles className="h-6 w-6 text-primary mx-auto mb-2" />
                    <span className="text-xs text-muted-foreground block">Roof System</span>
                    <span className="text-sm font-bold text-foreground">Pop-Up Safari Hatch</span>
                  </div>
                )}

                {specs?.hasWifi && (
                  <div className="p-4 rounded-xl border bg-muted/30 text-center">
                    <Wifi className="h-6 w-6 text-primary mx-auto mb-2" />
                    <span className="text-xs text-muted-foreground block">Connectivity</span>
                    <span className="text-sm font-bold text-foreground">Onboard Wi-Fi</span>
                  </div>
                )}

                {specs?.hasChargingPorts && (
                  <div className="p-4 rounded-xl border bg-muted/30 text-center">
                    <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
                    <span className="text-xs text-muted-foreground block">Power</span>
                    <span className="text-sm font-bold text-foreground">USB / Inverter Charging</span>
                  </div>
                )}

                {specs?.hasCoolerBox && (
                  <div className="p-4 rounded-xl border bg-muted/30 text-center">
                    <Refrigerator className="h-6 w-6 text-primary mx-auto mb-2" />
                    <span className="text-xs text-muted-foreground block">Beverages</span>
                    <span className="text-sm font-bold text-foreground">Built-in Cooler Box</span>
                  </div>
                )}
              </div>
            </section>

            {/* Features & Ideal Use Cases */}
            {(featuresList.length > 0 || idealFor.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuresList.length > 0 && (
                  <div className="p-6 rounded-2xl border bg-card shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Vehicle Highlights & Features</h3>
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
            )}

            {/* Main RichText Content */}
            {vehicle.content && (
              <section className="prose dark:prose-invert max-w-none">
                <RichText data={vehicle.content} enableGutter={false} />
              </section>
            )}

            {/* Dynamic Layout Blocks if defined */}
            {vehicle.layout && vehicle.layout.length > 0 && (
              <RenderBlocks blocks={vehicle.layout} />
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
          </div>

          {/* Sticky Sidebar Column for MD & Above */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <ContentNavigation title="Vehicle Specifications" />

            {/* Quick Vehicle Booking Card */}
            <div className="p-5 rounded-2xl border border-border bg-card/95 backdrop-blur shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Car className="h-4 w-4" />
                <h3 className="font-bold text-foreground text-sm">Hire {vehicle.title}</h3>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span>Day Rate:</span>
                  <span className="font-semibold text-foreground">KES {vehicle.baseDayRateKES?.toLocaleString('en-KE')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span>Capacity:</span>
                  <span className="font-semibold text-foreground">{vehicle.passengerCapacity} Seats</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span>Luggage:</span>
                  <span className="font-semibold text-foreground">{vehicle.luggageCapacity} Bags</span>
                </div>
              </div>
              <Button asChild size="default" className="w-full rounded-xl font-semibold">
                <Link href={`/search?q=${encodeURIComponent(vehicle.title)}`}>
                  Book Vehicle <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </article>
    </main>
  )
}
