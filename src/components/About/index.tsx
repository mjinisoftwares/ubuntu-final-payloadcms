import React from 'react'
import {
  CheckCircle,
  Clock,
  Code,
  Globe,
  Handshake,
  Search,
  Shield,
  Smartphone,
  User,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import type { Media as MediaType } from '@/payload-types'

const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  search: Search,
  code: Code,
  responsive: Smartphone,
  user: User,
  'hands-shake': Handshake,
  shield: Shield,
  clock: Clock,
  'check-circle': CheckCircle,
}

export interface AboutProps {
  heading?: string | null
  subheading?: string | null
  content?: any
  ourValues?: Array<{
    value?: string | null
    icon?: string | null
    id?: string | null
  }> | null
  image?: MediaType | string | number | null
  links?: any[] | null
}

export const About: React.FC<AboutProps> = ({
  content,
  ourValues,
  image,
  links,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-10">
      {/* Media column */}
      {image && typeof image === 'object' && (
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl border border-border/60">
          <Media
            resource={image}
            className="w-full h-full aspect-[4/3] object-cover"
            imgClassName="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content column */}
      <div className={image ? 'lg:col-span-6 space-y-6' : 'lg:col-span-12 space-y-6'}>
        {content && (
          <div className="prose dark:prose-invert max-w-none">
            <RichText data={content} enableGutter={false} />
          </div>
        )}

        {/* Values list */}
        {ourValues && Array.isArray(ourValues) && ourValues.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {ourValues.map((val, idx) => {
              const Icon = (val.icon && iconMap[val.icon]) || Zap
              return (
                <div
                  key={val.id || idx}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm text-foreground">{val.value}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* CTA Links */}
        {links && Array.isArray(links) && links.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-4">
            {links.map((linkItem, idx) => (
              <CMSLink key={idx} {...linkItem.link} size="lg" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default About
