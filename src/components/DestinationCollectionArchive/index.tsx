import React from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, Compass, Clock, CheckCircle } from 'lucide-react'
import { Media } from '@/components/Media'
import type { Destination } from '@/payload-types'
import { Badge } from '@/components/ui/badge'

export interface DestinationCollectionArchiveProps {
  destinations: Destination[]
  relationTo?: string
}

export const DestinationCollectionArchive: React.FC<DestinationCollectionArchiveProps> = ({
  destinations,
  relationTo = 'destinations',
}) => {
  if (!destinations || !destinations.length) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {destinations.map((destination) => {
        const href = `/${relationTo}/${destination.slug}`

        return (
          <Link
            key={destination.id}
            href={href}
            className="group relative flex flex-col rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40 overflow-hidden"
          >
            {/* Hero image preview */}
            {destination.featuredImage && typeof destination.featuredImage === 'object' && (
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                <Media
                  resource={destination.featuredImage}
                  fill
                  className="h-full w-full object-cover"
                  imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay Badge */}
                {destination.region && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-foreground shadow-sm">
                      {destination.region.replace(/-/g, ' ')}
                    </Badge>
                  </div>
                )}
              </div>
            )}

            <div className="p-6 flex flex-col flex-1">
              {/* Title & summary */}
              <div className="flex-1 space-y-3">
                <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                  {destination.title}
                </h3>
                
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <MapPin className="w-3.5 h-3.5" />
                  {destination.distanceFromNairobiKm} KM from Nairobi
                </div>

                {destination.summary && (
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mt-2">
                    {destination.summary}
                  </p>
                )}
              </div>

              {/* Stats / Info Row */}
              <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-border/50 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span className="truncate">{destination.estimatedTravelTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-primary" />
                  <span className="truncate capitalize">{destination.roadCondition?.replace(/-/g, ' ')}</span>
                </div>
              </div>

              {/* Read more footer */}
              <div className="mt-5 flex items-center justify-between text-sm font-semibold text-primary">
                <span>View Route Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default DestinationCollectionArchive
