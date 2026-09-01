import type { Pricing, PricingArchiveBlock } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { PricingCollectionArchive } from '@/components/PricingCollectionArchive'
import Title from '@/components/Title'

export const PricingArchiveBlockComponent: React.FC<PricingArchiveBlock> = async (props) => {
  const {
    id,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    relationTo,
    title,
    subTitle,
    description,
  } = props

  const limit = limitFromProps || 3

  let pricings: Pricing[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const fetchedPricings = await payload.find({
      collection: (relationTo as any) ?? 'pricing',
      depth: 1,
      limit,
    })

    pricings = fetchedPricings.docs as Pricing[]
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPricings = selectedDocs
        .map((pricing: any) => {
          if (typeof pricing === 'object' && pricing !== null) {
            return pricing.value && typeof pricing.value === 'object' ? pricing.value : pricing
          }
          return null
        })
        .filter((doc): doc is Pricing => Boolean(doc && typeof doc === 'object' && doc.id))

      pricings = filteredSelectedPricings
    }
  }

  return (
    <div id={`block-${id}`} className="container border py-20 bg-accent/5">
      <div className="max-w-6xl mx-auto md:mt-8">
        <Title
          title={title as string}
          subTitle={subTitle as string}
          description={description as string}
        />
      </div>
      <PricingCollectionArchive pricings={pricings} relationTo={'pricings'} />
    </div>
  )
}
