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
import type { Service } from '@/payload-types'

const serviceIconMap: Record<string, LucideIcon> = {
  Icon1: Zap,
  Laptop: Laptop,
  Globe: Globe,
  Shield: Shield,
  Sparkles: Sparkles,
  Smartphone: Smartphone,
  Settings: Settings,
  Rocket: Rocket,
}

export interface ServiceCollectionArchiveProps {
  services: Service[]
  relationTo?: string
}

export const ServiceCollectionArchive: React.FC<ServiceCollectionArchiveProps> = ({
  services,
  relationTo = 'services',
}) => {
  if (!services || !services.length) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {services.map((service) => {
        const Icon = (service.icon && serviceIconMap[service.icon]) || Sparkles
        const href = `/${relationTo}/${service.slug}`

        return (
          <Link
            key={service.id}
            href={href}
            className="group relative flex flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40 overflow-hidden"
          >
            {/* Hero image preview if present */}
            {service.heroImage && typeof service.heroImage === 'object' && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-muted">
                <Media
                  resource={service.heroImage}
                  fill
                  className="h-full w-full object-cover"
                  imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}

            {/* Icon */}
            {!service.heroImage && (
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Icon className="w-6 h-6" />
              </div>
            )}

            {/* Title & summary */}
            <div className="flex-1 space-y-2">
              <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              {service.subTitle && (
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {service.subTitle}
                </p>
              )}
              {service.summary && (
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {service.summary}
                </p>
              )}
            </div>

            {/* Read more footer */}
            <div className="mt-6 pt-4 border-t border-border/50 flex items-center text-sm font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explore Service</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default ServiceCollectionArchive
