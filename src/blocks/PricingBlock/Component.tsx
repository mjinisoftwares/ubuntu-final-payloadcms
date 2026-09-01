import React from 'react'
import { Box, CircleCheck, Gem, Shield, Star, Users, Zap, Car, MapPin, Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Title from '@/components/Title'
import Link from 'next/link'

interface PricingBlockProps {
  blockType: 'pricingBlock'
  title?: string | null
  subTitle?: string | null
  description?: string | null
  populateBy?: 'dynamic' | 'selection' | null
  service?: { id?: string | number | null; title?: string | null; name?: string | null } | string | number | null
  fleet?: { id?: string | number | null; title?: string | null } | string | number | null
  destination?: { id?: string | number | null; title?: string | null } | string | number | null
  limit?: number | null
  selectedDocs?: any[] | null
  plans?: any[] | null
}

const billingUnitLabels: Record<string, string> = {
  per_day: 'Per Day (with Driver-Guide)',
  per_trip_one_way: 'One-Way Transfer / Drop-off',
  round_trip: 'Round-Trip Safari Package',
  per_person: 'Per Person / Seat',
  per_month: 'Per Month (Contract)',
  per_hour: 'Per Hour (Disposal)',
}

export const PricingBlockComponent: React.FC<PricingBlockProps> = async ({
  title,
  subTitle,
  description,
  populateBy,
  service,
  fleet,
  destination,
  limit,
  selectedDocs,
  plans,
}) => {
  const payload = await getPayload({ config: configPromise })

  let pricingDocs: any[] = []

  if (plans && Array.isArray(plans) && plans.length > 0) {
    pricingDocs = plans
  } else if (populateBy === 'selection') {
    const ids = (selectedDocs ?? [])
      .map((doc) => (typeof doc === 'object' && doc ? doc.id : doc))
      .filter((id): id is string | number => Boolean(id))

    if (ids.length > 0) {
      const result = await payload.find({
        collection: 'pricing',
        depth: 1,
        limit: ids.length,
        where: { id: { in: ids } },
      })
      pricingDocs = ids
        .map((id) => result.docs.find((doc) => doc.id === id))
        .filter((doc): doc is any => Boolean(doc))
    }
  } else {
    const serviceId = typeof service === 'object' && service ? service.id : service
    const fleetId = typeof fleet === 'object' && fleet ? fleet.id : fleet
    const destId = typeof destination === 'object' && destination ? destination.id : destination

    const andConditions: any[] = []

    if (serviceId) andConditions.push({ service: { equals: serviceId } })
    if (fleetId) andConditions.push({ fleet: { equals: fleetId } })
    if (destId) andConditions.push({ destination: { equals: destId } })

    const where = andConditions.length > 0 ? { and: andConditions } : undefined

    const result = await payload.find({
      collection: 'pricing',
      depth: 1,
      limit: limit || 6,
      sort: 'priceKES',
      where,
    })

    pricingDocs = result.docs
  }

  if (!pricingDocs || pricingDocs.length === 0) {
    return null
  }

  return (
    <section className="border-b relative overflow-hidden py-14 sm:py-16 lg:py-24 bg-muted/40">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <Title
          title={title || 'Transparent Transport & Safari Rates'}
          subTitle={subTitle || 'Competitive Pricing'}
          description={description || 'All rates include professional vetted driver-guides, comprehensive insurance, and standard allowances.'}
          className="mx-auto mb-12 max-w-3xl"
        />

        {/* Pricing Grid */}
        <div
          className={[
            'mx-auto grid max-w-6xl items-stretch gap-6',
            pricingDocs.length === 1
              ? 'max-w-md'
              : pricingDocs.length === 2
                ? 'max-w-3xl sm:grid-cols-2'
                : 'sm:grid-cols-2 lg:grid-cols-3',
          ].join(' ')}
        >
          {pricingDocs.map((plan, index) => {
            const isPopular = plan.isPopular ?? false
            const priceKES = plan.priceKES ?? plan.price ?? 0
            const priceUSD = plan.priceUSD
            const billingUnit = plan.billingUnit ? billingUnitLabels[plan.billingUnit] || plan.billingUnit : 'Per Day'
            const inclusions = plan.inclusions || []
            const features = plan.features || []
            const allItems = [
              ...inclusions.map((i: any) => (typeof i === 'string' ? i : i.inclusion)),
              ...features.map((f: any) => (typeof f === 'string' ? f : f.feature)),
            ].filter(Boolean)

            return (
              <article
                key={plan.id ?? index}
                className={[
                  'group relative flex h-full flex-col rounded-2xl border bg-card p-6 transition-all duration-300 sm:p-8',
                  isPopular
                    ? 'border-primary/60 shadow-xl shadow-primary/10 ring-1 ring-primary/40'
                    : 'border-border/80 shadow-sm hover:-translate-y-1 hover:border-primary/30 hover:shadow-md',
                ].join(' ')}
              >
                {isPopular && (
                  <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
                    <Badge className="rounded-full px-4 py-1 text-xs font-semibold tracking-wide bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Plan Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {plan.title || 'Standard Rate'}
                    </h3>
                    {plan.pricingType && (
                      <span className="mt-1 inline-block text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {plan.pricingType.replace(/_/g, ' ')}
                      </span>
                    )}
                  </div>
                  {isPopular && <Star className="h-5 w-5 fill-primary text-primary shrink-0" />}
                </div>

                {/* Related destination / fleet badge */}
                {(plan.destination || plan.fleet) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {plan.fleet && typeof plan.fleet === 'object' && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-secondary/80 px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                        <Car className="h-3 w-3" />
                        {plan.fleet.title}
                      </span>
                    )}
                    {plan.destination && typeof plan.destination === 'object' && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        <MapPin className="h-3 w-3" />
                        {plan.destination.title}
                      </span>
                    )}
                  </div>
                )}

                {/* Price Display */}
                <div className="mt-6 border-y border-border/70 py-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-semibold text-muted-foreground">KES</span>
                    <span className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                      {priceKES.toLocaleString('en-KE')}
                    </span>
                    {priceUSD && (
                      <span className="ml-2 text-xs font-medium text-muted-foreground">
                        (~${priceUSD.toLocaleString('en-US')})
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground font-medium">
                    {billingUnit}
                  </p>
                </div>

                {/* Inclusions List */}
                {allItems.length > 0 && (
                  <div className="mt-6 flex-1">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
                      Rate Inclusions
                    </p>
                    <ul className="space-y-2.5">
                      {allItems.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.2} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Booking Button */}
                <div className="mt-8">
                  <Button asChild size="lg" className="w-full font-semibold rounded-xl" variant={isPopular ? 'default' : 'outline'}>
                    <Link href={`/search?q=${encodeURIComponent(plan.title || '')}`}>
                      Book This Rate
                    </Link>
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PricingBlockComponent
