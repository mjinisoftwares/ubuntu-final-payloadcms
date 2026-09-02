import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Users,
  Luggage,
  ShieldCheck,
  PhoneCall,
  Sparkles,
} from 'lucide-react'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { FAQsBlockComponent } from '@/blocks/FAQBlock/Component'
import { PricingBlockComponent } from '@/blocks/PricingBlock/Component'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProfessionalServiceSchema, BreadcrumbSchema, FAQSchema } from '@/components/Schemas'
import ContentNavigation from '@/components/ContentNavigation'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const services = await payload.find({
    collection: 'services',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return services.docs
    .map((doc) => {
      const slug = typeof doc.slug === 'string' ? doc.slug : (doc.slug as any)?.slug
      return typeof slug === 'string' && slug.length > 0 ? { slug } : null
    })
    .filter(Boolean) as { slug: string }[]
}

type Props = {
  params: Promise<{ slug: string }>
}

const queryServiceBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'services',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
    depth: 2,
  })
  return result.docs?.[0] || null
})

export async function generateMetadata({ params: paramsPromise }: Props): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const service = await queryServiceBySlug({ slug: decodedSlug })
  if (!service) return {}

  const title =
    service.meta?.title || `${service.title} | Premier Kenya Transport & Safari Services`
  const description =
    service.meta?.description ||
    service.summary ||
    `Professional ${service.title} across Kenya. Dedicated corporate shuttles, luxury safari transport, and customized tour packages.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    alternates: {
      canonical: `/services/${decodedSlug}`,
    },
  }
}

export default async function ServicePage({ params: paramsPromise }: Props) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = `/services/${decodedSlug}`
  const service = await queryServiceBySlug({ slug: decodedSlug })

  if (!service) {
    return <PayloadRedirects url={url} />
  }

  const category =
    service.category && typeof service.category === 'object' ? service.category : null
  const recommendedFleet = Array.isArray(service.recommendedFleet) ? service.recommendedFleet : []
  const popularDestinations = Array.isArray(service.popularDestinations)
    ? service.popularDestinations
    : []
  const serviceHighlights = Array.isArray(service.serviceHighlights)
    ? service.serviceHighlights
    : []

  const breadcrumbItems = [
    { name: 'Services', url: '/services' },
    ...(category
      ? [{ name: category.title, url: `/services#${category.slug || category.id}` }]
      : []),
    { name: service.title, url },
  ]

  return (
    <main className="min-h-screen pb-24">
      {/* Allows redirects for valid services too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <ProfessionalServiceSchema service={service} slug={decodedSlug} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema service={service} />

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative mt-20 bg-background">
        <div className="container mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 py-4 text-xs text-muted-foreground sm:text-sm">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>

            <span>/</span>

            <Link href="/services" className="transition-colors hover:text-primary">
              Services
            </Link>

            {category && (
              <>
                <span>/</span>
                <span className="text-foreground/70">{category.title}</span>
              </>
            )}

            <span>/</span>

            <span className="truncate text-foreground/70">{service.title}</span>
          </nav>

          {/* 50 / 50 Hero */}
          <div className="grid min-h-[460px] grid-cols-1 items-center lg:grid-cols-2">
            {/* ================= CONTENT — 50% ================= */}
            <div className="flex h-full items-center py-12 lg:pr-12">
              <div className="w-full max-w-xl">
                {/* Category */}
                {category && (
                  <Badge
                    variant="secondary"
                    className="mb-4 px-3 py-1 text-xs font-semibold tracking-wider"
                  >
                    {category.title}
                  </Badge>
                )}

                {/* Title */}
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground ">
                  {service.title}
                </h1>

                {/* Subtitle */}
                {service.subTitle && (
                  <h2 className="mt-2 max-w-xl text-base font-medium leading-relaxed text-primary sm:text-lg">
                    {service.subTitle}
                  </h2>
                )}

                {/* Summary */}
                {service.summary && (
                  <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {service.summary}
                  </p>
                )}

                {/* CTA */}
                <div className="mt-4">
                  <Button asChild size="default" className="rounded-xl px-6 font-semibold">
                    <Link href={`/search?q=${encodeURIComponent(service.title)}`}>
                      Book This Service
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* ================= IMAGE — 50% ================= */}
            {service.heroImage && typeof service.heroImage === 'object' && (
              <div className="flex h-full min-h-[320px] items-center justify-center lg:min-h-[460px]">
                <Media
                  resource={service.heroImage}
                  className="h-auto max-h-[420px] w-full max-w-[500px] object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area with Sticky ContentNavigation on MD+ Screens */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Service Column */}
          <div className="lg:col-span-8 space-y-14 min-w-0">
            {/* Highlights / Why Choose This Service */}
            {serviceHighlights.length > 0 && (
              <div className="p-6 sm:p-7 rounded-2xl border bg-card shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 mb-4 text-foreground">
                  <Sparkles className="h-5 w-5 text-primary" /> Key Service Inclusions & Highlights
                </h2>
                <ul className="space-y-3">
                  {serviceHighlights.map((item: any, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{item.highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Main RichText Content / Service Overview */}
            {service.content && (
              <section className="prose dark:prose-invert max-w-none">
                <RichText data={service.content} enableGutter={false} />
              </section>
            )}

            {/* Dynamic Layout Blocks if defined */}
            {service.layout && service.layout.length > 0 && (
              <RenderBlocks blocks={service.layout} />
            )}

            {/* Recommended Fleet Grid */}
            {recommendedFleet.length > 0 && (
              <section className="rounded-2xl border bg-muted/20 p-6 sm:p-8">
                <div className="mb-8">
                  <Badge variant="outline" className="mb-2">
                    Vehicle Recommendations
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Recommended Fleet for {service.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    All vehicles come with verified PSV licensing, comprehensive passenger
                    insurance, and experienced chauffeurs.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {recommendedFleet.map((vehicle: any) => {
                    if (typeof vehicle !== 'object') return null
                    return (
                      <div
                        key={vehicle.id}
                        className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          {vehicle.featuredImage && typeof vehicle.featuredImage === 'object' && (
                            <div className="rounded-xl overflow-hidden mb-4 h-44 bg-muted">
                              <Media
                                resource={vehicle.featuredImage}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <h3 className="text-base font-bold">{vehicle.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {vehicle.summary}
                          </p>

                          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground border-y py-2.5">
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5 text-primary" />{' '}
                              {vehicle.passengerCapacity} Seats
                            </span>
                            <span className="flex items-center gap-1">
                              <Luggage className="h-3.5 w-3.5 text-primary" />{' '}
                              {vehicle.luggageCapacity} Bags
                            </span>
                            {vehicle.specifications?.is4WD && (
                              <span className="flex items-center gap-1 text-primary font-medium">
                                <ShieldCheck className="h-3.5 w-3.5" /> 4x4
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-2">
                          {vehicle.baseDayRateKES && (
                            <div>
                              <span className="text-[11px] text-muted-foreground">From</span>
                              <p className="text-sm font-bold text-foreground">
                                KES {vehicle.baseDayRateKES.toLocaleString('en-KE')}
                                <span className="text-[10px] font-normal text-muted-foreground">
                                  /day
                                </span>
                              </p>
                            </div>
                          )}
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="rounded-lg ml-auto font-semibold"
                          >
                            <Link href={`/fleet/${vehicle.slug}`}>View Vehicle</Link>
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Popular Destinations Grid */}
            {popularDestinations.length > 0 && (
              <section className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm">
                <div className="mb-8">
                  <Badge variant="outline" className="mb-2">
                    Routes & Destinations
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Popular Destinations for {service.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {popularDestinations.map((dest: any) => {
                    if (typeof dest !== 'object') return null
                    return (
                      <Link
                        key={dest.id}
                        href={`/destinations/${dest.slug}`}
                        className="group rounded-2xl border bg-muted/30 p-4 shadow-sm hover:border-primary/50 hover:bg-card hover:shadow-md transition-all flex flex-col"
                      >
                        {dest.featuredImage && typeof dest.featuredImage === 'object' && (
                          <div className="rounded-xl overflow-hidden mb-3 h-36 bg-muted">
                            <Media
                              resource={dest.featuredImage}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <h3 className="text-base font-bold group-hover:text-primary transition-colors">
                          {dest.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                          <span>{dest.distanceFromNairobiKm} km from Nairobi</span>
                          {dest.estimatedTravelTime && (
                            <>
                              <span>•</span>
                              <span>{dest.estimatedTravelTime}</span>
                            </>
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Dynamic Service Pricing */}
            <PricingBlockComponent
              blockType="pricingBlock"
              service={service.id}
              title={`${service.title} Rates & Packages`}
              subTitle="Transparent Pricing"
            />

            {/* Dynamic Service FAQs */}
            <FAQsBlockComponent
              blockType="faqsBlock"
              service={service.id}
              title={`Frequently Asked Questions: ${service.title}`}
              subTitle="Service FAQs"
            />
          </div>

          {/* Sticky Sidebar Column for MD & Above */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <ContentNavigation title="Service Guide" />

            {/* Quick Service Inquiry Card */}
            <div className="p-5 rounded-2xl border border-border bg-card/95 backdrop-blur shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <PhoneCall className="h-4 w-4" />
                <h3 className="font-bold text-foreground text-sm">Need a Custom Itinerary?</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Contact our safari and transport concierge for customized corporate packages,
                multi-day routes, and private hire across Kenya.
              </p>
              {category && (
                <div className="flex justify-between py-1.5 border-t border-b border-border/60 text-xs text-muted-foreground">
                  <span>Category:</span>
                  <span className="font-semibold text-foreground">{category.title}</span>
                </div>
              )}
              <Button asChild size="default" className="w-full rounded-xl font-semibold">
                <Link href={`/search?q=${encodeURIComponent(service.title)}`}>
                  Book {service.title} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </article>
    </main>
  )
}
