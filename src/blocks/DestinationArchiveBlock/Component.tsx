import type { Destination, DestinationArchiveBlock as DestinationArchiveBlockProps } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { DestinationCollectionArchive } from '@/components/DestinationCollectionArchive'

export const DestinationArchiveBlockComponent: React.FC<
  DestinationArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, introContent, limit: limitFromProps, populateBy, selectedDocs, relationTo } = props

  const limit = limitFromProps || 3

  let destinations: Destination[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedDestinations = await payload.find({
      collection: 'destinations',
      depth: 1,
      limit,
      ...(relationTo ? { where: { _status: { equals: 'published' } } } : {}),
    })

    destinations = flattenedDestinations.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedDestinations = selectedDocs.map((doc) => {
        if (typeof doc.value === 'object') return doc.value
        return null
      }) as Destination[]

      destinations = filteredSelectedDestinations.filter(Boolean)
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-8">
          <RichText className="ml-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <div className="container">
        <DestinationCollectionArchive destinations={destinations} relationTo="destinations" />
      </div>
    </div>
  )
}
