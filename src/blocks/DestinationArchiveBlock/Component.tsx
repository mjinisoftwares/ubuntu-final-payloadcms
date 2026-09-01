import type { Destination, DestinationArchiveBlock } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { DestinationCollectionArchive } from '@/components/DestinationCollectionArchive'
import Title from '@/components/Title'

export const DestinationArchiveBlockComponent: React.FC<DestinationArchiveBlock> = async (props) => {
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

  let destinations: Destination[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const fetchedDestinations = await payload.find({
      collection: (relationTo as any) ?? 'destinations',
      depth: 1,
      limit,
    })

    destinations = fetchedDestinations.docs as Destination[]
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedDestinations = selectedDocs
        .map((destination: any) => {
          if (typeof destination === 'object' && destination !== null) {
            return destination.value && typeof destination.value === 'object' ? destination.value : destination
          }
          return null
        })
        .filter((doc): doc is Destination => Boolean(doc && typeof doc === 'object' && doc.id))

      destinations = filteredSelectedDestinations
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
      <DestinationCollectionArchive destinations={destinations} relationTo={'destinations'} />
    </div>
  )
}
