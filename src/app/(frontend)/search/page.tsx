import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import {
  Car,
  Compass,
  FileText,
  HelpCircle,
  Luggage,
  MapPin,
  Search as SearchIcon,
  ShieldCheck,
  Tag,
  Users,
} from 'lucide-react'

import { Search } from '@/search/Component'
import PageClient from './page.client'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type Args = {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function SearchPage({ searchParams: searchParamsPromise }: Args) {
  const { q: query = '' } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const cleanQuery = query.trim()

  // Parallel query across Services, Fleet, Destinations, Pricing
  const [servicesRes, fleetRes, destsRes, pricingRes, postsRes] = await Promise.all([
    payload.find({
      collection: 'services',
      depth: 1,
      limit: 6,
      ...(cleanQuery
        ? {
            where: {
              or: [
                { title: { like: cleanQuery } },
                { subTitle: { like: cleanQuery } },
                { summary: { like: cleanQuery } },
              ],
            },
          }
        : {}),
    }),
    payload.find({
      collection: 'fleet',
      depth: 1,
      limit: 6,
      ...(cleanQuery
        ? {
            where: {
              or: [
                { title: { like: cleanQuery } },
                { subTitle: { like: cleanQuery } },
                { summary: { like: cleanQuery } },
                { vehicleType: { like: cleanQuery } },
              ],
            },
          }
        : {}),
    }),
    payload.find({
      collection: 'destinations',
      depth: 1,
      limit: 6,
      ...(cleanQuery
        ? {
            where: {
              or: [
                { title: { like: cleanQuery } },
                { subTitle: { like: cleanQuery } },
                { summary: { like: cleanQuery } },
                { region: { like: cleanQuery } },
              ],
            },
          }
        : {}),
    }),
    payload.find({
      collection: 'pricing',
      depth: 1,
      limit: 6,
      ...(cleanQuery
        ? {
            where: {
              or: [
                { title: { like: cleanQuery } },
                { pricingType: { like: cleanQuery } },
              ],
            },
          }
        : {}),
    }),
    payload.find({
      collection: 'posts',
      depth: 1,
      limit: 6,
      ...(cleanQuery
        ? {
            where: {
              or: [
                { title: { like: cleanQuery } },
                { 'meta.description': { like: cleanQuery } },
              ],
            },
          }
        : {}),
    }),
  ])

  const matchedServices = servicesRes.docs
  const matchedFleet = fleetRes.docs
  const matchedDestinations = destsRes.docs
  const matchedPricing = pricingRes.docs
  const matchedPosts = postsRes.docs

  const totalResults =
    matchedServices.length +
    matchedFleet.length +
    matchedDestinations.length +
    matchedPricing.length +
    matchedPosts.length

  // Dynamically resolve FAQs linked to matched services, fleet, destinations, or query text
  const faqOrConditions: any[] = []

  if (cleanQuery) {
    faqOrConditions.push({ question: { like: cleanQuery } })
  }

  matchedServices.forEach((s) => {
    faqOrConditions.push({ service: { equals: s.id } })
  })

  matchedFleet.forEach((f) => {
    faqOrConditions.push({ fleet: { equals: f.id } })
  })

  matchedDestinations.forEach((d) => {
    faqOrConditions.push({ destination: { equals: d.id } })
  })

  // If no specific matches, query universal/general FAQs
  if (faqOrConditions.length === 0) {
    faqOrConditions.push({ faqType: { equals: 'general' } })
  }

  const faqsRes = await payload.find({
    collection: 'faqs',
    depth: 1,
    limit: 12,
    where: {
      or: faqOrConditions,
    },
  })

  const matchedFaqs = faqsRes.docs

  return (
    <div className="pt-28 pb-24 min-h-screen bg-background">
      <PageClient />
      
      {/* Search Header */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
          Transport & Safari Search
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-8">
          Search for vehicles, tour packages, safari parks, inter-county transfers, or corporate transport.
        </p>

        <div className="max-w-xl mx-auto">
          <Search />
        </div>

        {cleanQuery && (
          <p className="mt-4 text-xs sm:text-sm text-muted-foreground">
            Showing results for: <span className="font-semibold text-foreground">&quot;{cleanQuery}&quot;</span> ({totalResults} matches)
          </p>
        )}
      </div>

      <div className="container mx-auto px-4 max-w-6xl space-y-16">
        {totalResults === 0 && cleanQuery && (
          <div className="text-center py-12 rounded-2xl border bg-card">
            <SearchIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold">No direct matches found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Try searching for &quot;Land Cruiser&quot;, &quot;Maasai Mara&quot;, &quot;Corporate&quot;, or &quot;Naivasha&quot;.
            </p>
          </div>
        )}

        {/* 1. Matched Services */}
        {matchedServices.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Compass className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">Services ({matchedServices.length})</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedServices.map((service) => (
                <div key={service.id} className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    {service.heroImage && typeof service.heroImage === 'object' && (
                      <div className="rounded-xl overflow-hidden mb-4 h-40 bg-muted">
                        <Media resource={service.heroImage} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{service.summary || service.subTitle}</p>
                  </div>
                  <Button asChild size="sm" className="mt-5 w-full rounded-xl" variant="outline">
                    <Link href={`/services/${service.slug}`}>View Service Details</Link>
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2. Matched Fleet Vehicles */}
        {matchedFleet.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Car className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">Fleet & Vehicles ({matchedFleet.length})</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedFleet.map((vehicle) => (
                <div key={vehicle.id} className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    {vehicle.featuredImage && typeof vehicle.featuredImage === 'object' && (
                      <div className="rounded-xl overflow-hidden mb-4 h-40 bg-muted">
                        <Media resource={vehicle.featuredImage} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-foreground">{vehicle.title}</h3>
                      {vehicle.specifications?.is4WD && (
                        <Badge variant="secondary" className="text-[10px]">4x4</Badge>
                      )}
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3 text-primary" /> {vehicle.passengerCapacity} Seats</span>
                      <span className="flex items-center gap-1"><Luggage className="h-3 w-3 text-primary" /> {vehicle.luggageCapacity} Bags</span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t pt-3">
                    {vehicle.baseDayRateKES && (
                      <span className="text-sm font-bold text-foreground">
                        KES {vehicle.baseDayRateKES.toLocaleString('en-KE')}<span className="text-xs font-normal text-muted-foreground">/day</span>
                      </span>
                    )}
                    <Button asChild size="sm" className="rounded-xl">
                      <Link href={`/fleet/${vehicle.slug}`}>Hire Vehicle</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. Matched Destinations */}
        {matchedDestinations.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">Destinations & Routes ({matchedDestinations.length})</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedDestinations.map((dest) => (
                <div key={dest.id} className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    {dest.featuredImage && typeof dest.featuredImage === 'object' && (
                      <div className="rounded-xl overflow-hidden mb-4 h-40 bg-muted">
                        <Media resource={dest.featuredImage} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-foreground">{dest.title}</h3>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 text-primary" />
                      <span>{dest.distanceFromNairobiKm} KM</span>
                      <span>•</span>
                      <span>{dest.estimatedTravelTime}</span>
                    </div>
                  </div>
                  <Button asChild size="sm" className="mt-5 w-full rounded-xl" variant="outline">
                    <Link href={`/destinations/${dest.slug}`}>View Destination Guide</Link>
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Matched Pricing Packages */}
        {matchedPricing.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Tag className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">Pricing & Route Packages ({matchedPricing.length})</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedPricing.map((price) => (
                <div key={price.id} className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{price.title}</h3>
                    <div className="mt-3 border-y py-2.5">
                      <span className="text-2xl font-extrabold text-foreground">
                        KES {price.priceKES?.toLocaleString('en-KE')}
                      </span>
                      {price.priceUSD && (
                        <span className="ml-2 text-xs text-muted-foreground">(~${price.priceUSD})</span>
                      )}
                      <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                        {price.billingUnit?.replace(/_/g, ' ') || 'Per Day'}
                      </p>
                    </div>
                  </div>
                  <Button asChild size="sm" className="mt-5 w-full rounded-xl">
                    <Link href={`/search?q=${encodeURIComponent(price.title || '')}`}>Book Package</Link>
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. DYNAMIC ENTITY-MATCHED FAQs */}
        {matchedFaqs.length > 0 && (
          <section className="mt-16 pt-12 border-t">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                <HelpCircle className="h-3.5 w-3.5" />
                Matched Contextual Answers
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Frequently Asked Questions for Your Search
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Relevant questions related to matched services, fleet vehicles, and destinations.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4 max-w-4xl mx-auto">
              {matchedFaqs.map((faq, index) => {
                let entityBadge = null
                if (faq.service && typeof faq.service === 'object') {
                  entityBadge = <Badge variant="secondary" className="text-[10px] mr-2">Service: {faq.service.title}</Badge>
                } else if (faq.fleet && typeof faq.fleet === 'object') {
                  entityBadge = <Badge variant="secondary" className="text-[10px] mr-2">Fleet: {faq.fleet.title}</Badge>
                } else if (faq.destination && typeof faq.destination === 'object') {
                  entityBadge = <Badge variant="secondary" className="text-[10px] mr-2">Destination: {faq.destination.title}</Badge>
                }

                return (
                  <AccordionItem
                    key={faq.id ?? index}
                    value={`faq-${faq.id ?? index}`}
                    className="rounded-xl border bg-card px-5 py-1"
                  >
                    <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                      <div className="flex items-center flex-wrap gap-1">
                        {entityBadge}
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pt-1 pb-4">
                      {faq.answer ? <RichText data={faq.answer} enableGutter={false} /> : null}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </section>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Search Transport, Safari Fleet & Destinations | Rates & Booking`,
    description: `Search for Kenya safari vehicles, corporate transport shuttles, destination route transfers, and instant pricing packages.`,
  }
}
