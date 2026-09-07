import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  Lock,
  FileText,
  Clock,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Eye,
  Database,
  UserCheck,
  Globe2,
  HelpCircle,
  AlertCircle,
} from 'lucide-react'
import { OrganizationSchema, BreadcrumbSchema } from '@/components/Schemas'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Privacy Policy | Ubuntu Logistics Kenya - Data Protection & Privacy Notice',
    description:
      'Read Ubuntu Logistics Ltd’s Privacy Policy. Learn how we collect, use, process, and protect your personal data in accordance with the Kenya Data Protection Act 2019.',
    openGraph: {
      title: 'Privacy Policy | Ubuntu Logistics Kenya',
      description:
        'Official Data Protection and Privacy Policy for Ubuntu Logistics Ltd. Compliant with the Kenya Data Protection Act 2019.',
      url: 'https://www.ubuntulogistics.co.ke/privacy-policy',
    },
    alternates: {
      canonical: '/privacy-policy',
    },
  }
}

const SECTIONS = [
  { id: 'introduction', label: '1. Introduction & Overview' },
  { id: 'data-controller', label: '2. Data Controller Details' },
  { id: 'information-collected', label: '3. Information We Collect' },
  { id: 'how-we-use-data', label: '4. How We Use Your Data' },
  { id: 'legal-basis', label: '5. Legal Basis for Processing' },
  { id: 'data-sharing', label: '6. Third-Party Disclosures' },
  { id: 'cross-border', label: '7. Regional & Cross-Border Data' },
  { id: 'data-security', label: '8. Data Security & Storage' },
  { id: 'data-retention', label: '9. Retention Periods' },
  { id: 'your-rights', label: '10. Your Rights (DPA 2019)' },
  { id: 'cookies', label: '11. Cookies & Analytics' },
  { id: 'contact-dpo', label: '12. Contact & Data Officer' },
]

export default function PrivacyPolicyPage() {
  const breadcrumbItems = [{ name: 'Privacy Policy', url: '/privacy-policy' }]
  const lastUpdated = 'September 7, 2026'

  return (
    <article className="pt-24 pb-20 bg-background min-h-screen text-foreground">
      <OrganizationSchema pageUrl="/privacy-policy" pageName="Ubuntu Logistics Privacy Policy" />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-zinc-950 text-white py-14 lg:py-20 mb-10 border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-zinc-900/60 to-black/80 pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-200">Privacy Policy</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> Kenya Data Protection Act (DPA 2019) Compliant
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Privacy & Data Protection Policy
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
              At Ubuntu Logistics Ltd, your privacy, confidentiality, and data security are core to
              how we deliver seamless car hire, safari expeditions, and executive transport across
              Kenya and East Africa.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" /> Last Updated: {lastUpdated}
              </span>
              <span className="hidden sm:inline text-zinc-600">•</span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" /> 256-Bit SSL Encrypted
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Table of Contents Sticky Sidebar */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-28 p-6 rounded-2xl bg-card border shadow-sm space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Table of Contents
                </h3>
                <nav className="flex flex-col space-y-1.5 text-sm">
                  {SECTIONS.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="py-1 px-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {sec.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Data Inquiries Box */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-950 dark:text-emerald-200">
                <div className="flex items-center gap-2 font-semibold text-sm mb-1 text-emerald-700 dark:text-emerald-300">
                  <Lock className="w-4 h-4" /> Data Protection Officer
                </div>
                <p className="text-xs text-muted-foreground dark:text-emerald-200/80 mb-3">
                  Have questions regarding your personal information or want to exercise your data
                  rights?
                </p>
                <a
                  href="mailto:dpo@ubuntulogistics.co.ke"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" /> dpo@ubuntulogistics.co.ke
                </a>
              </div>
            </div>
          </aside>

          {/* Legal Text & Sections */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-12 leading-relaxed text-foreground/90">
            {/* Quick Summary Notice */}
            <div className="p-6 rounded-2xl bg-muted/50 border border-border">
              <h2 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <Eye className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Key Principles of Our Privacy Policy
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>We never sell or rent your personal data to third parties.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>Strict adherence to Kenya Data Protection Act 2019.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>Secure processing of M-Pesa, card, and corporate payments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>Full control to access, rectify, or request deletion of data.</span>
                </li>
              </ul>
            </div>

            {/* 1. Introduction */}
            <section id="introduction" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                1. Introduction & Overview
              </h2>
              <p>
                Ubuntu Logistics Ltd (&quot;Ubuntu Logistics&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the
                transport, car hire, safari tours, and corporate shuttle logistics platform accessible
                via{' '}
                <Link href="/" className="text-emerald-600 dark:text-emerald-400 underline font-medium">
                  ubuntulogistics.co.ke
                </Link>
                , as well as our direct booking desks and mobile customer communication channels.
              </p>
              <p>
                This Privacy Policy explains how we collect, store, utilize, share, and safeguard
                your personal data when you use our website, book car rentals, request airport
                transfers, contract corporate transport, or communicate with our operations dispatch team.
                This document is formulated in strict accordance with the <strong>Kenya Data Protection Act, 2019</strong> and
                international data protection best practices.
              </p>
            </section>

            {/* 2. Data Controller */}
            <section id="data-controller" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                2. Data Controller Details
              </h2>
              <p>
                Ubuntu Logistics Ltd is the designated Data Controller responsible for your personal
                data collected through our services.
              </p>
              <div className="p-5 rounded-xl bg-card border space-y-2 text-sm">
                <p className="font-semibold text-foreground">Ubuntu Logistics Ltd</p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" /> North Airport Road 18114-00200, Embakasi, Nairobi, Kenya
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" /> +254 728 798 580 / +254 728 798580
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" /> info@ubuntulogistics.co.ke / dpo@ubuntulogistics.co.ke
                </p>
              </div>
            </section>

            {/* 3. Information We Collect */}
            <section id="information-collected" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                3. Information We Collect
              </h2>
              <p>
                Depending on the service you book (e.g. self-drive car hire vs. chauffeur-driven
                safari transfer), we may collect the following categories of information:
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-card border">
                  <h3 className="font-semibold text-base text-foreground mb-1">
                    A. Identity & Contact Information
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Full name, email address, telephone/WhatsApp contact number, nationality, residential
                    address, and for vehicle rentals: national ID card copy or passport copy, and a valid
                    driver&apos;s license copy.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card border">
                  <h3 className="font-semibold text-base text-foreground mb-1">
                    B. Travel, Booking & Itinerary Data
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Pick-up and drop-off locations, dates and times of travel, flight numbers (for
                    airport transfers), selected vehicle category, passenger count, safari destination
                    itineraries, and special accessibility requirements.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card border">
                  <h3 className="font-semibold text-base text-foreground mb-1">
                    C. Payment & Transaction Records
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    M-Pesa transaction reference codes, bank transfer slips, corporate purchase orders, and
                    billing addresses. <em>Note: Credit/debit card numbers are processed directly through
                    PCI-DSS Level 1 certified payment gateways and are never stored on our servers.</em>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card border">
                  <h3 className="font-semibold text-base text-foreground mb-1">
                    D. Technical, Usage & Location Data
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    IP address, device type, browser settings, operating system, and telemetry generated
                    during active trips (such as GPS route tracking on Ubuntu Logistics fleet vehicles for
                    passenger safety and fleet security).
                  </p>
                </div>
              </div>
            </section>

            {/* 4. How We Use Data */}
            <section id="how-we-use-data" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                4. How We Use Your Personal Data
              </h2>
              <p>We process your personal information strictly for legitimate business purposes:</p>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>
                  <strong>Booking Execution:</strong> Confirming reservations, assigning professional
                  chauffeurs, coordinating airport pick-ups, and dispatching rental vehicles.
                </li>
                <li>
                  <strong>24/7 Operations Support:</strong> Sending SMS/WhatsApp booking reminders, driver
                  details, vehicle plate numbers, and real-time flight delay tracking.
                </li>
                <li>
                  <strong>Passenger Safety & Fleet Security:</strong> Monitoring fleet telematics, emergency
                  roadside assistance, and verifying authorized driver credentials.
                </li>
                <li>
                  <strong>Billing & Compliance:</strong> Issuing official tax invoices, processing M-Pesa/bank
                  receipts, and complying with statutory record-keeping under the Kenya Revenue Authority (KRA).
                </li>
                <li>
                  <strong>Customer Service & Feedback:</strong> Addressing inquiries, managing itinerary
                  changes, and improving our transport fleet services.
                </li>
              </ul>
            </section>

            {/* 5. Legal Basis */}
            <section id="legal-basis" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                5. Legal Basis for Processing
              </h2>
              <p>
                Under Section 30 of the Kenya Data Protection Act 2019, our legal bases for processing
                your data include:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-card border">
                  <span className="font-semibold text-foreground block mb-1">Contractual Necessity</span>
                  <span className="text-muted-foreground">
                    To execute and deliver the transport, car rental, or safari booking agreement entered with you.
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-card border">
                  <span className="font-semibold text-foreground block mb-1">Legal Obligation</span>
                  <span className="text-muted-foreground">
                    To comply with traffic regulations (NTSA), commercial transport licensing, tax laws, and police reports.
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-card border">
                  <span className="font-semibold text-foreground block mb-1">Legitimate Interests</span>
                  <span className="text-muted-foreground">
                    To ensure fleet safety, prevent fraud, optimize travel routes, and maintain high service standards.
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-card border">
                  <span className="font-semibold text-foreground block mb-1">Consent</span>
                  <span className="text-muted-foreground">
                    Where you have voluntarily opted in to receive promotional safari packages or seasonal offers.
                  </span>
                </div>
              </div>
            </section>

            {/* 6. Data Sharing */}
            <section id="data-sharing" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                6. Third-Party Disclosures
              </h2>
              <p>
                Ubuntu Logistics Ltd does not sell, rent, or trade your personal data. We only disclose
                information to trusted third parties under strict confidentiality agreements:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>
                  <strong>Assigned Drivers & Chauffeurs:</strong> Provided with passenger name, pick-up
                  location, and contact phone number to fulfill the journey.
                </li>
                <li>
                  <strong>National Park & Conservancy Authorities:</strong> (e.g. Kenya Wildlife Service -
                  KWS) for park entry permits, passenger manifest clearances, and safari booking validation.
                </li>
                <li>
                  <strong>Payment Processors & Banks:</strong> Safaricom M-Pesa, commercial banks, and
                  card acquiring partners to authorize and clear payments.
                </li>
                <li>
                  <strong>Law Enforcement & Regulators:</strong> When required by Kenyan court orders,
                  the National Transport and Safety Authority (NTSA), or statutory investigations.
                </li>
              </ul>
            </section>

            {/* 7. Cross-Border Transfers */}
            <section id="cross-border" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                7. Regional & Cross-Border Data Transfers
              </h2>
              <p>
                For cross-border safari itineraries spanning Tanzania, Uganda, or Rwanda, passenger
                manifest data (names, passport numbers, visa status) may be shared with customs, border
                control authorities, and licensed regional partner operators to ensure lawful border crossing
                and COMESA vehicle insurance clearance.
              </p>
            </section>

            {/* 8. Data Security */}
            <section id="data-security" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                8. Data Security & Storage
              </h2>
              <p>
                We implement robust technical and organizational measures to safeguard your personal data:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-card border text-center">
                  <Lock className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <span className="font-semibold block mb-1">TLS/SSL Encryption</span>
                  <span className="text-xs text-muted-foreground">All website and booking data is encrypted in transit.</span>
                </div>
                <div className="p-4 rounded-xl bg-card border text-center">
                  <Database className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <span className="font-semibold block mb-1">Encrypted Storage</span>
                  <span className="text-xs text-muted-foreground">Databases are secured with role-based access control.</span>
                </div>
                <div className="p-4 rounded-xl bg-card border text-center">
                  <UserCheck className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <span className="font-semibold block mb-1">Staff Confidentiality</span>
                  <span className="text-xs text-muted-foreground">Employees undergo data protection and privacy training.</span>
                </div>
              </div>
            </section>

            {/* 9. Retention */}
            <section id="data-retention" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                9. Retention Periods
              </h2>
              <p>
                We retain personal information only for as long as necessary to fulfill the purposes
                outlined in this policy, unless a longer retention period is mandated by Kenyan commercial,
                insurance, or tax regulations (e.g. 7 years for financial and invoice records under KRA rules).
                Rental agreements and driver license copies are archived securely and purged according to our
                data lifecycle schedules.
              </p>
            </section>

            {/* 10. Your Rights */}
            <section id="your-rights" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                10. Your Rights Under the Kenya Data Protection Act 2019
              </h2>
              <p>
                As a data subject, you hold fundamental statutory rights under Kenyan law:
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>• Right to be Informed:</strong> To know what personal data is collected and why.</p>
                <p><strong>• Right of Access:</strong> To request a copy of the personal data we hold about you.</p>
                <p><strong>• Right to Rectification:</strong> To request immediate correction of inaccurate or incomplete data.</p>
                <p><strong>• Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> To request deletion of your personal data where retention is no longer legally justified.</p>
                <p><strong>• Right to Object / Restrict Processing:</strong> To object to direct marketing or certain forms of processing.</p>
                <p><strong>• Right to Lodge a Complaint:</strong> You have the right to lodge a complaint with the <em>Office of the Data Protection Commissioner (ODPC) Kenya</em> (www.odpc.go.ke).</p>
              </div>
            </section>

            {/* 11. Cookies */}
            <section id="cookies" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                11. Cookies & Analytics
              </h2>
              <p>
                Our website utilizes essential cookies to maintain your session preferences, support security
                tokens, and analyze aggregate site traffic. You can adjust your browser settings to refuse cookies,
                though some parts of the booking workflow may require functional cookies to operate properly.
              </p>
            </section>

            {/* 12. Contact DPO */}
            <section id="contact-dpo" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                12. Contact & Data Protection Officer
              </h2>
              <p>
                If you have inquiries, complaints, or wish to exercise any of your statutory data rights,
                please contact our Data Protection Officer:
              </p>
              <div className="p-6 rounded-2xl bg-zinc-950 text-white border border-zinc-800 space-y-3">
                <h3 className="font-bold text-lg text-emerald-400">Ubuntu Logistics Ltd - DPO Office</h3>
                <p className="text-sm text-zinc-300">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:dpo@ubuntulogistics.co.ke" className="text-emerald-400 underline">
                    dpo@ubuntulogistics.co.ke
                  </a>{' '}
                  or{' '}
                  <a href="mailto:info@ubuntulogistics.co.ke" className="text-emerald-400 underline">
                    info@ubuntulogistics.co.ke
                  </a>
                </p>
                <p className="text-sm text-zinc-300">
                  <strong>Telephone:</strong> +254 728 798 580 / +254 728 798580
                </p>
                <p className="text-sm text-zinc-300">
                  <strong>Physical Address:</strong> North Airport Road 18114-00200, Embakasi, Nairobi, Kenya
                </p>
                <p className="text-xs text-zinc-500 pt-2 border-t border-zinc-800">
                  We respond to all formal data protection requests within thirty (30) calendar days as required by law.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  )
}
