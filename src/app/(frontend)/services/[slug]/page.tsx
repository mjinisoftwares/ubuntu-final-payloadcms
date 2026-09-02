import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, MapPin, Users, Luggage, ShieldCheck } from 'lucide-react'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { FAQsBlockComponent } from '@/blocks/FAQBlock/Component'
import { PricingBlockComponent } from '@/blocks/PricingBlock/Component'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProfessionalServiceSchema, BreadcrumbSchema, FAQSchema } from '@/components/Schemas'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const services = await payload.find({
    collection: 'services',
    draft: false,
    limit: 1000,
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

const queryServiceBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'services',
    limit: 1,
    where: { slug: { equals: slug } },
    depth: 2,
  })
  return result.docs?.[0] || null
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await queryServiceBySlug(slug)
  if (!service) return {}

  const title = service.meta?.title || `${service.title} | Premier Kenya Transport & Safari Services`
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
      canonical: `/services/${slug}`,
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = await queryServiceBySlug(slug)

  if (!service) {
    return notFound()
  }

  const category = service.category && typeof service.category === 'object' ? service.category : null
  const recommendedFleet = Array.isArray(service.recommendedFleet) ? service.recommendedFleet : []
  const popularDestinations = Array.isArray(service.popularDestinations) ? service.popularDestinations : []
  const serviceHighlights = Array.isArray(service.serviceHighlights) ? service.serviceHighlights : []

  const breadcrumbItems = [
    { name: 'Services', url: '/services' },
    { name: service.title, url: `/services/${slug}` },
  ]

  return (
    <main className="min-h-screen pb-24">
      <ProfessionalServiceSchema service={service} slug={slug} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema service={service} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/60 to-background border-b pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span>Services</span>
            {category && (
              <>
                <span>/</span>
                <span className="text-foreground/80">{category.title}</span>
              </>
            )}
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              {category && (
                <Badge variant="secondary" className="mb-4 font-semibold px-3 py-1">
                  {category.title}
                </Badge>
              )}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                {service.title}
              </h1>
              {service.subTitle && (
                <p className="mt-4 text-lg sm:text-xl text-primary font-medium">
                  {service.subTitle}
                </p>
              )}
              {service.summary && (
                <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {service.summary}
                </p>
              )}

              {/* Service Highlights */}
              {serviceHighlights.length > 0 && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceHighlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-foreground">{item.highlight}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-xl px-6 font-semibold">
                  <Link href={`/search?q=${encodeURIComponent(service.title)}`}>
                    Inquire / Book Service <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {service.heroImage && typeof service.heroImage === 'object' && (
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
                  <Media resource={service.heroImage} className="w-full h-80 lg:h-96 object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      {service.content && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl prose dark:prose-invert">
            <RichText data={service.content} enableGutter={false} />
          </div>
        </section>
      )}

      {/* Dynamic Layout Blocks if defined */}
      {service.layout && service.layout.length > 0 && (
        <RenderBlocks blocks={service.layout} />
      )}

      {/* Recommended Fleet Grid */}
      {recommendedFleet.length > 0 && (
        <section className="py-16 bg-muted/30 border-y">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="mb-2">Vehicles</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Recommended Fleet for {service.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                All vehicles come with verified PSV licensing, comprehensive passenger insurance, and experienced chauffeurs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {recommendedFleet.map((vehicle: any) => {
                if (typeof vehicle !== 'object') return null
                return (
                  <div key={vehicle.id} className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all">
                    {vehicle.featuredImage && typeof vehicle.featuredImage === 'object' && (
                      <div className="rounded-xl overflow-hidden mb-4 h-48 bg-muted">
                        <Media resource={vehicle.featuredImage} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <h3 className="text-lg font-bold">{vehicle.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{vehicle.summary}</p>
                    
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground border-y py-2.5">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-primary" /> {vehicle.passengerCapacity} Seats
                      </span>
                      <span className="flex items-center gap-1">
                        <Luggage className="h-3.5 w-3.5 text-primary" /> {vehicle.luggageCapacity} Bags
                      </span>
                      {vehicle.specifications?.is4WD && (
                        <span className="flex items-center gap-1 text-primary font-medium">
                          <ShieldCheck className="h-3.5 w-3.5" /> 4x4
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {vehicle.baseDayRateKES && (
                        <div>
                          <span className="text-xs text-muted-foreground">From</span>
                          <p className="text-base font-bold text-foreground">
                            KES {vehicle.baseDayRateKES.toLocaleString('en-KE')}<span className="text-xs font-normal text-muted-foreground">/day</span>
                          </p>
                        </div>
                      )}
                      <Button asChild size="sm" variant="outline" className="rounded-lg">
                        <Link href={`/fleet/${vehicle.slug}`}>View Vehicle</Link>
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Popular Destinations Grid */}
      {popularDestinations.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="mb-2">Routes & Destinations</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Popular Destinations for this Service
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {popularDestinations.map((dest: any) => {
                if (typeof dest !== 'object') return null
                return (
                  <Link
                    key={dest.id}
                    href={`/destinations/${dest.slug}`}
                    className="group rounded-2xl border bg-card p-5 shadow-sm hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    {dest.featuredImage && typeof dest.featuredImage === 'object' && (
                      <div className="rounded-xl overflow-hidden mb-4 h-40 bg-muted">
                        <Media resource={dest.featuredImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    <h3 className="text-base font-bold group-hover:text-primary transition-colors">{dest.title}</h3>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span>{dest.distanceFromNairobiKm} km from Nairobi</span>
                      <span>•</span>
                      <span>{dest.estimatedTravelTime}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
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
    </main>
  )
}
