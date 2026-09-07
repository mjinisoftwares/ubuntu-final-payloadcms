import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  ArrowRight,
} from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'

const QUICK_LINKS = [
  { label: 'Airport & Hotel Transfers', href: '/services/airport-hotel-transfers' },
  { label: '4x4 Safari Transport', href: '/services/tours-and-safari-transport' },
  { label: 'Car Hire & Chauffeur', href: '/services/car-hire-and-rental-services' },
  { label: 'Corporate Shuttles', href: '/services/corporate-and-staff-transport' },
  { label: 'VIP Executive Transport', href: '/services/vip-and-executive-transport' },
  { label: 'Event Transport', href: '/services/event-and-special-occasion-transport' },
]

const COMPANY_LINKS = [
  { label: 'About Ubuntu Logistics', href: '/about' },
  { label: 'Our Fleet', href: '/fleet' },
  { label: 'Destinations We Serve', href: '/destinations' },
  { label: 'Pricing & Packages', href: '/pricing' },
  { label: 'Blog & News', href: '/posts' },
  { label: 'Contact Us', href: '/contact' },
]

const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/ubuntu254',
    label: 'Follow Ubuntu Logistics on Facebook',
    Icon: Facebook,
  },
  {
    href: 'https://www.facebook.com/ubuntu254',
    label: 'Follow Ubuntu Logistics on X',
    Icon: Twitter,
  },
  {
    href: 'https://www.instagram.com/ubuntu_logistics/',
    label: 'Follow Ubuntu Logistics on Instagram',
    Icon: Instagram,
  },
  {
    href: 'https://www.facebook.com/ubuntu254',
    label: 'Ubuntu Logistics on LinkedIn',
    Icon: Linkedin,
  },
  {
    href: 'https://youtube.com/@ubuntulogistics',
    label: 'Ubuntu Logistics YouTube Channel',
    Icon: Youtube,
  },
]

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-zinc-950 text-white border-t border-zinc-800">
      {/* Main Footer Grid */}
      <div className="container py-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Brand & Description */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          <div className="">
            {' '}
            <Link href="/" aria-label="Go to homepage">
              <img src="/ubuntu-logo.jpg" alt="Logo" className="h-20 w-auto" />
            </Link>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
            Kenya's trusted partner for premium transport logistics — safari 4x4 rentals, airport
            transfers, corporate fleets, and VIP executive travel across East Africa.
          </p>
          {/* Social Links */}
          <div
            className="flex items-center gap-3 flex-wrap"
            role="list"
            aria-label="Social media links"
          >
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                role="listitem"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:bg-emerald-600 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <Icon className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Column 2: Services */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">Our Services</h3>
          <ul className="flex flex-col gap-2.5">
            {QUICK_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-150"
                >
                  <ArrowRight className="w-3 h-3 text-white opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Company Links + CMS Nav Items */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">Company</h3>
          <ul className="flex flex-col gap-2.5">
            {COMPANY_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-150"
                >
                  <ArrowRight className="w-3 h-3 text-white opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
            {/* CMS-managed nav items (Admin panel additions) */}
            {navItems.length > 0 &&
              navItems.map(({ link }: any, i: number) => (
                <li key={`cms-${i}`}>
                  <Link
                    href={
                      link?.url ||
                      (link?.reference?.value?.slug && `/${link.reference.value.slug}`) ||
                      '#'
                    }
                    className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-150"
                  >
                    <ArrowRight className="w-3 h-3 text-white opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                    <span>{link?.label}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        {/* Column 4: Contact Details */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">Get In Touch</h3>
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="tel:+254728798580"
                className="flex items-start gap-3 text-sm text-zinc-400 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>
                  <span className="block font-medium text-zinc-200 group-hover:text-white">
                    +254 728 798 580
                  </span>
                  <span className="text-xs text-zinc-500">24/7 Operations Hotline</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href="tel:+25472879858"
                className="flex items-start gap-3 text-sm text-zinc-400 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>
                  <span className="block font-medium text-zinc-200 group-hover:text-white">
                    +254 728 798580
                  </span>
                  <span className="text-xs text-zinc-500">Secondary Line</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href="mailto:info@ubuntulogistics.co.ke"
                className="flex items-start gap-3 text-sm text-zinc-400 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>
                  <span className="block font-medium text-zinc-200 group-hover:text-white break-all">
                    info@ubuntulogistics.co.ke
                  </span>
                  <span className="text-xs text-zinc-500">Response within 30 min</span>
                </span>
              </a>
            </li>
            <li>
              <div className="flex items-start gap-3 text-sm text-zinc-400">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>
                  <span className="block font-medium text-zinc-200">
                    North Airport Road 18114-00200
                  </span>
                  <span className="text-xs text-zinc-500">Embakasi, Nairobi, Kenya</span>
                </span>
              </div>
            </li>
          </ul>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 transition-colors duration-200 w-full sm:w-auto"
          >
            Book a Transfer Now
          </Link>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>
            © {currentYear}{' '}
            <Link href="/" className="text-zinc-300 hover:text-white transition-colors font-medium">
              Ubuntu Logistics Ltd
            </Link>
            . All rights reserved. Nairobi, Kenya.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="w-px h-3 bg-zinc-700" />
            <Link href="/terms-of-service" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
            <span className="w-px h-3 bg-zinc-700" />
            <Link href="/sitemap.xml" className="hover:text-zinc-300 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
