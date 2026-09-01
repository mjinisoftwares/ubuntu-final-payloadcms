import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Globe,
  Laptop,
  Rocket,
  Settings,
  Shield,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Media } from '@/components/Media'
import type { Fleet } from '@/payload-types'

const fleetIconMap: Record<string, LucideIcon> = {
  Icon1: Zap,
  Laptop: Laptop,
  Globe: Globe,
  Shield: Shield,
  Sparkles: Sparkles,
  Smartphone: Smartphone,
  Settings: Settings,
  Rocket: Rocket,
}

export interface FleetCollectionArchiveProps {
  fleets: Fleet[]
  relationTo?: string
}

export const FleetCollectionArchive: React.FC<FleetCollectionArchiveProps> = ({
  fleets,
  relationTo = 'fleet',
}) => {
  if (!fleets || !fleets.length) return null

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-7xl mx-auto">
      {fleets.map((fleet) => {
        const fleetAny = fleet as any
        const Icon = (fleetAny.icon && fleetIconMap[fleetAny.icon]) || Sparkles
        const href = `/${relationTo}/${fleet.slug}`
        const img = fleetAny.heroImage || fleet.featuredImage

        return (
          <Link
            key={fleet.id}
            href={href}
            className="group relative flex flex-col rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/30 overflow-hidden"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Hero Image Container */}
            {img && typeof img === 'object' ? (
              <div className="relative w-full aspect-video overflow-hidden bg-muted border-b border-border/40">
                <Media
                  resource={img}
                  fill
                  className="h-full w-full object-cover"
                  imgClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            ) : (
              /* Fallback Icon Container when no image exists */
              <div className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-inner">
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>
            )}

            {/* Content Area */}
            <div className="flex-1 flex flex-col p-6 space-y-3">
              {fleet.subTitle && (
                <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground/80">
                  {fleet.subTitle}
                </span>
              )}

              <h3 className="font-semibold text-xl tracking-tight text-foreground transition-colors group-hover:text-primary">
                {fleet.title}
              </h3>

              {fleet.summary && (
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed pt-1">
                  {fleet.summary}
                </p>
              )}
            </div>

            {/* Interactive Clean Footer */}
            <div className="px-6 pb-6 pt-2 flex items-center justify-between text-sm font-medium text-foreground/80 border-t border-border/40 bg-muted/20 group-hover:bg-muted/40 transition-colors">
              <span className="group-hover:text-primary transition-colors">Explore Fleet</span>
              <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center border border-border/50 group-hover:border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        )
      })}
    </section>
  )
}

export default FleetCollectionArchive
