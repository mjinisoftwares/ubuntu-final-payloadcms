import type { Fleet, FleetArchiveBlock } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { FleetCollectionArchive } from '@/components/FleetCollectionArchive'
import Title from '@/components/Title'

export const FleetArchiveBlockComponent: React.FC<FleetArchiveBlock> = async (props) => {
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

  let fleets: Fleet[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const fetchedFleets = await payload.find({
      collection: (relationTo as any) ?? 'fleet',
      depth: 1,
      limit,
    })

    fleets = fetchedFleets.docs as Fleet[]
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedFleets = selectedDocs
        .map((fleet: any) => {
          if (typeof fleet === 'object' && fleet !== null) {
            return fleet.value && typeof fleet.value === 'object' ? fleet.value : fleet
          }
          return null
        })
        .filter((doc): doc is Fleet => Boolean(doc && typeof doc === 'object' && doc.id))

      fleets = filteredSelectedFleets
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
      <FleetCollectionArchive fleets={fleets} relationTo={'fleets'} />
    </div>
  )
}
