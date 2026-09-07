import type { Metadata } from 'next'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  MessageCircle, 
  Send, 
  Car, 
  Compass, 
  PlaneTakeoff,
  CheckCircle2
} from 'lucide-react'
import { FormBlock } from '@/blocks/Form/Component'
import { OrganizationSchema, BreadcrumbSchema } from '@/components/Schemas'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import GoogleMap from '@/components/Maps'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact Us | Ubuntu Logistics Kenya - 24/7 Car Hire & Safari Inquiries',
    description:
      'Contact Ubuntu Logistics in Nairobi, Kenya. Call +254 728 798 580 or email info@ubuntulogistics.co.ke. Available 24/7 for airport transfers, 4x4 safari transport, corporate shuttles, and car hire.',
    openGraph: {
      title: 'Contact Ubuntu Logistics Kenya',
      description: 'Get in touch for 24/7 airport transfers, custom safari transport, corporate car hire, or fleet logistics.',
      url: 'https://www.ubuntulogistics.co.ke/contact',
    },
  }
}

export default async function ContactPage() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  // 1. Fetch Contact Page from Payload CMS
  let contactPageDoc: any = null
  try {
    const pageResult = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      overrideAccess: draft,
      where: {
        slug: {
          equals: 'contact',
        },
      },
    })
    contactPageDoc = pageResult.docs?.[0] || null
  } catch (e) {
    console.error('Error fetching contact page from Payload CMS:', e)
  }

  // 2. Fetch Contact Form from Payload CMS if not in page layout
  let formDoc: any = null
  const formBlockInPage = contactPageDoc?.layout?.find((b: any) => b.blockType === 'formBlock')

  if (formBlockInPage?.form && typeof formBlockInPage.form === 'object') {
    formDoc = formBlockInPage.form
  } else {
    try {
      const formsResult = await payload.find({
        collection: 'forms',
        limit: 1,
        where: {
          title: {
            contains: 'Contact',
          },
        },
      })
      formDoc = formsResult.docs?.[0] || null
    } catch (e) {
      console.error('Error fetching contact form from Payload CMS:', e)
    }
  }

  const breadcrumbItems = [{ name: 'Contact Us', url: '/contact' }]

  return (
    <article className="pt-24 pb-20 bg-background min-h-screen">
      {draft && <LivePreviewListener />}
      <OrganizationSchema pageUrl="/contact" pageName="Contact Ubuntu Logistics" />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Header Banner */}
      <section className="relative overflow-hidden bg-zinc-950 text-white py-16 lg:py-20 mb-12 border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-zinc-900/60 to-black/80 pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-4">
              <Clock className="w-3.5 h-3.5" /> 24/7 Operations & Dispatch Desk
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              Contact Ubuntu Logistics
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              East Africa’s premier transport, luxury safari, and car hire partner. We are ready to assist you with airport pick-ups, overland 4x4 safaris, corporate shuttles, or personalized travel itineraries across Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Info on Left, Payload CMS Form on Right */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contact Details & Trust */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2.5">
                <span>Direct Inquiries</span>
              </h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Call / Hotline (24/7)
                    </p>
                    <a 
                      href="tel:+254728798580" 
                      className="text-base font-semibold text-foreground hover:text-primary transition-colors block"
                    >
                      +254 728 798 580
                    </a>
                    <a 
                      href="tel:+25472879858" 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                    >
                      +254 728 79858
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Email Inquiries
                    </p>
                    <a 
                      href="mailto:info@ubuntulogistics.co.ke" 
                      className="text-base font-semibold text-foreground hover:text-primary transition-colors block"
                    >
                      info@ubuntulogistics.co.ke
                    </a>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Fast response guarantee within 30 minutes
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Instant WhatsApp Chat
                    </p>
                    <a 
                      href="https://wa.me/254728798580?text=Hello%20Ubuntu%20Logistics%2C%20I%20would%20like%20to%20inquire%20about%20your%20services." 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
                    >
                      <span>Chat on WhatsApp (+254 728 798 580)</span>
                    </a>
                  </div>
                </div>

                {/* Office Location */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Head Office
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      North Airport Road 18114-00200
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Embakasi, Nairobi, Kenya
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Operating Hours
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      Monday – Sunday: Open 24 Hours
                    </p>
                    <p className="text-xs text-emerald-600 font-medium mt-0.5">
                      • Live Fleet Dispatch Active
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Services We Cover */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Key Transport Solutions
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-foreground/80">
                  <span className="flex items-center gap-1.5">
                    <PlaneTakeoff className="w-3.5 h-3.5 text-primary" /> Airport Pickups
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-primary" /> 4x4 Safari Drives
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-primary" /> Chauffeur Rentals
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" /> VIP Delegations
                  </span>
                </div>
              </div>
            </div>

            {/* Why Choose Ubuntu Logistics */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-2xl p-6 border border-zinc-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Why Travel With Ubuntu Logistics
              </h3>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Licensed & compliant KATO tour operator with insured commercial passenger fleet.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Professional, vetted, English-speaking driver-guides with vast safari knowledge.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>24/7 real-time GPS tracking and emergency roadside assistance across East Africa.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Payload CMS Form */}
          <div className="lg:col-span-7">
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Online Booking & Inquiry
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-1 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below and our logistics coordinator will get back to you with a tailored quote within 30 minutes.
                </p>
              </div>

              {formDoc ? (
                <FormBlock 
                  enableIntro={false} 
                  form={formDoc} 
                />
              ) : (
                /* Fallback Form in case Payload seed is pending or warming up */
                <form 
                  action="mailto:info@ubuntulogistics.co.ke" 
                  method="post" 
                  encType="text/plain"
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        required 
                        name="full-name" 
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        required 
                        name="email" 
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">
                        Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        required 
                        name="phone" 
                        placeholder="+254 700 000 000"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">
                        Service of Interest
                      </label>
                      <select 
                        name="service"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="airport-transfer">Airport & Hotel Transfers</option>
                        <option value="safari-transport">Tours & Safari Transport (4x4)</option>
                        <option value="car-hire">Car Hire & Chauffeur Rental</option>
                        <option value="corporate-transport">Corporate & Staff Transport</option>
                        <option value="vip-transport">VIP & Executive Transport</option>
                        <option value="other">Other Inquiry / Freight</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      Trip Details / Message *
                    </label>
                    <textarea 
                      required 
                      rows={5}
                      name="message" 
                      placeholder="Please share pickup date, destination, group size, and any specific preferences..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 transition-opacity"
                  >
                    <Send className="w-4 h-4" /> Send Inquiry to Ubuntu Logistics
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Office Location Map Section */}
        <section className="mt-16 pt-12 border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Our Location in Nairobi
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-1 mb-2">
              Visit Our Operations Hub
            </h2>
            <p className="text-sm text-muted-foreground">
              Conveniently positioned along North Airport Road for rapid dispatch to Jomo Kenyatta International Airport (JKIA), Wilson Airport, and the Nairobi Central Business District.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
            <GoogleMap />
          </div>
        </section>
      </div>
    </article>
  )
}
