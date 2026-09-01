'use client'

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'
import Link from 'next/link'

interface TopBarProps {
  hidden: boolean
}

const SOCIAL_LINKS = [
  {
    href: 'https://facebook.com/mjinidigital',
    label: 'Follow us on Facebook',
    Icon: Facebook,
  },
  {
    href: 'https://x.com/mjinidigital',
    label: 'Follow us on X (Twitter)',
    Icon: Twitter,
  },
  {
    href: 'https://www.instagram.com/mjinidigital/',
    label: 'Follow us on Instagram',
    Icon: Instagram,
  },
]

export function TopBar({ hidden }: TopBarProps) {
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-brand-primary transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="container h-7 flex items-center justify-between text-xs text-white">
        {/* ── LEFT: contact info ── */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Mail className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">info@ubuntulogistics.co.ke</span>

          <Phone className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">+254 728 79858</span>
        </div>

        {/* ── RIGHT: location + socials ── */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex items-center gap-1.5" aria-label="Our location">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>North airport road 18114-00200 , Nairobi Kenya</span>
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block w-px h-3.5 bg-white/30" aria-hidden="true" />

          {/* Social icons */}
          <div className="flex items-center gap-3" role="list" aria-label="Social media links">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                role="listitem"
                className="text-white hover:text-white/80 transition-colors duration-200"
              >
                <Icon className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
