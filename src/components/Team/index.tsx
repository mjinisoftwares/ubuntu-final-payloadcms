import React from 'react'
import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import Title from '@/components/Title'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Team as TeamType } from '@/payload-types'

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  github: Github,
  youtube: Youtube,
}

export interface TeamProps {
  badge?: string | null
  title?: string | null
  subTitle?: string | null
  description?: string | null
  limit?: number | null
  members?: TeamType[] | null
}

export const Team: React.FC<TeamProps> = async ({
  badge,
  title,
  subTitle,
  description,
  limit = 12,
  members: passedMembers,
}) => {
  let members: TeamType[] = []

  if (passedMembers && Array.isArray(passedMembers) && passedMembers.length > 0) {
    members = passedMembers
  } else {
    try {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection: 'team',
        depth: 1,
        limit: limit || 12,
      })
      members = result.docs
    } catch (e) {
      console.error('Error fetching team in Team component:', e)
    }
  }

  if (!members.length) return null

  return (
    <section className="py-16 md:py-24 bg-muted/40">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          {badge && (
            <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold">
              {badge}
            </Badge>
          )}
          <Title title={title} subTitle={subTitle} description={description} />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {members.map((member) => {
            const profilePic = member.profilePicture
            return (
              <div
                key={member.id}
                className="group relative flex flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
              >
                {/* Profile Picture */}
                <div className="relative w-full aspect-square mb-5 rounded-xl overflow-hidden bg-muted">
                  {profilePic && typeof profilePic === 'object' ? (
                    <Media
                      resource={profilePic}
                      fill
                      className="h-full w-full object-cover"
                      imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-muted-foreground bg-primary/10">
                      {member.name ? member.name.charAt(0) : 'T'}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">{member.title}</p>
                  </div>

                  {/* Skills */}
                  {member.skills && Array.isArray(member.skills) && member.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {member.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-0.5 text-[11px] font-medium rounded-md bg-secondary text-secondary-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Contact / Social Links */}
                  <div className="flex items-center gap-3 pt-2 border-t border-border/50 text-muted-foreground">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="hover:text-primary transition-colors"
                        aria-label="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="hover:text-primary transition-colors"
                        aria-label="Phone"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                    {member.socialMediaLinks?.map((s, idx) => {
                      const Icon = (s.platform && socialIconMap[s.platform]) || Globe
                      return (
                        s.url && (
                          <a
                            key={idx}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                            aria-label={s.platform || 'Social Link'}
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        )
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Team
