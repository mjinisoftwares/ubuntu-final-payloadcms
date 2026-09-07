import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import {
  FileCheck2,
  ShieldCheck,
  Clock,
  Car,
  PlaneTakeoff,
  Compass,
  AlertTriangle,
  CreditCard,
  Ban,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Scale,
  RefreshCw,
} from 'lucide-react'
import { OrganizationSchema, BreadcrumbSchema } from '@/components/Schemas'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Terms of Service | Ubuntu Logistics Kenya - Car Hire & Transport Agreement',
    description:
      'Official Terms and Conditions of Service for Ubuntu Logistics Ltd. Clear policies on car rental, safari transport, airport transfers, cancellations, insurance, and payment terms in Kenya.',
    openGraph: {
      title: 'Terms of Service | Ubuntu Logistics Kenya',
      description:
        'Read the Terms and Conditions of Service for Ubuntu Logistics Ltd. Comprehensive car hire, airport transfer, and safari booking terms.',
      url: 'https://www.ubuntulogistics.co.ke/terms-of-service',
    },
    alternates: {
      canonical: '/terms-of-service',
    },
  }
}

const SECTIONS = [
  { id: 'agreement-scope', label: '1. Agreement & Scope of Services' },
  { id: 'booking-reservations', label: '2. Bookings & Confirmations' },
  { id: 'rates-payments', label: '3. Pricing, Invoicing & Payments' },
  { id: 'car-hire-rules', label: '4. Car Hire & Rental Conditions' },
  { id: 'safari-transport', label: '5. Safari & Long-Distance Tours' },
  { id: 'airport-transfers', label: '6. Airport & Chauffeur Transfers' },
  { id: 'cancellations-refunds', label: '7. Cancellations & Refund Policy' },
  { id: 'passenger-conduct', label: '8. Passenger Conduct & Safety' },
  { id: 'insurance-liability', label: '9. Insurance, Excess & Liability' },
  { id: 'force-majeure', label: '10. Force Majeure' },
  { id: 'governing-law', label: '11. Governing Law & Dispute Resolution' },
  { id: 'contact-info', label: '12. Contact & Customer Desk' },
]

export default function TermsOfServicePage() {
  const breadcrumbItems = [{ name: 'Terms of Service', url: '/terms-of-service' }]
  const lastUpdated = 'September 7, 2026'

  return (
    <article className="pt-24 pb-20 bg-background min-h-screen text-foreground">
      <OrganizationSchema pageUrl="/terms-of-service" pageName="Ubuntu Logistics Terms of Service" />
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
            <span className="text-zinc-200">Terms of Service</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-4">
              <FileCheck2 className="w-3.5 h-3.5" /> Official Transport & Rental Agreement
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Terms & Conditions of Service
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
              These terms govern all car hire, safari tours, airport transfers, and corporate fleet
              services provided by Ubuntu Logistics Ltd across Kenya and East Africa.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" /> Last Revised: {lastUpdated}
              </span>
              <span className="hidden sm:inline text-zinc-600">•</span>
              <span className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-400" /> Laws of the Republic of Kenya
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
                  <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Navigation
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

              {/* Fast Booking Assistance */}
              <div className="p-4 rounded-xl bg-muted/60 border text-sm space-y-3">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" /> Need Immediate Clarification?
                </div>
                <p className="text-xs text-muted-foreground">
                  Our 24/7 reservations team is ready to assist with custom corporate terms or special
                  safari itinerary requirements.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
                >
                  Contact Support Desk
                </Link>
              </div>
            </div>
          </aside>

          {/* Legal Text & Sections */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-12 leading-relaxed text-foreground/90">
            {/* Quick Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-card border">
                <div className="flex items-center gap-2 font-semibold text-foreground text-sm mb-1">
                  <Car className="w-4 h-4 text-emerald-600" /> Transparent Pricing
                </div>
                <p className="text-xs text-muted-foreground">
                  All quotes clearly state inclusions (driver allowance, mileage, comprehensive
                  insurance) and exclusions.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-card border">
                <div className="flex items-center gap-2 font-semibold text-foreground text-sm mb-1">
                  <PlaneTakeoff className="w-4 h-4 text-emerald-600" /> Flight Delay Guarantee
                </div>
                <p className="text-xs text-muted-foreground">
                  Complimentary 60-minute waiting time on international arrivals at JKIA / Moi Airport.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-card border">
                <div className="flex items-center gap-2 font-semibold text-foreground text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Comprehensive Cover
                </div>
                <p className="text-xs text-muted-foreground">
                  All fleet vehicles are comprehensively insured with 24/7 nationwide roadside assistance.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-card border">
                <div className="flex items-center gap-2 font-semibold text-foreground text-sm mb-1">
                  <RefreshCw className="w-4 h-4 text-emerald-600" /> Flexible Rescheduling
                </div>
                <p className="text-xs text-muted-foreground">
                  Free date adjustments made up to 24 hours before scheduled departure.
                </p>
              </div>
            </div>

            {/* 1. Agreement & Scope */}
            <section id="agreement-scope" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                1. Agreement & Scope of Services
              </h2>
              <p>
                By requesting a quote, confirming a booking, paying a deposit, or boarding any vehicle
                operated by Ubuntu Logistics Ltd (&quot;Ubuntu Logistics&quot;, &quot;we&quot;, &quot;us&quot;), the customer
                (&quot;Client&quot;, &quot;Hirer&quot;, &quot;Passenger&quot;) agrees to be bound by these Terms and Conditions.
              </p>
              <p>
                Our services include, but are not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Self-drive and chauffeur-driven car rentals (saloon cars, SUVs, luxury VIP sedans).</li>
                <li>Custom 4x4 safari transport (Land Cruiser 79 Series, Safari Tour Vans with pop-up roofs).</li>
                <li>Airport and inter-hotel transfers (JKIA, Wilson, Moi International Mombasa, Kisumu).</li>
                <li>Corporate staff shuttles, executive transport, conference and event logistics.</li>
                <li>Cross-border East Africa transport tours (Uganda, Tanzania, Rwanda).</li>
              </ul>
            </section>

            {/* 2. Bookings & Reservations */}
            <section id="booking-reservations" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                2. Bookings & Confirmations
              </h2>
              <p>
                <strong>2.1 Inquiries & Quotes:</strong> Written quotations are valid for fourteen (14) days from
                the date of issuance, subject to vehicle availability at the time of final confirmation.
              </p>
              <p>
                <strong>2.2 Booking Deposit:</strong> A standard deposit of <strong>30% to 50%</strong> of the
                total booking fee is required to secure the reservation. The balance must be cleared on or
                before vehicle handover or trip departure.
              </p>
              <p>
                <strong>2.3 Corporate Bookings:</strong> Registered corporate accounts with pre-approved credit
                facilities may operate on standard thirty (30) day invoicing terms against an official Local
                Purchase Order (LPO).
              </p>
            </section>

            {/* 3. Rates & Payments */}
            <section id="rates-payments" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                3. Pricing, Invoicing & Payments
              </h2>
              <p>
                <strong>3.1 Currency & Taxes:</strong> All rates are quoted in Kenya Shillings (KES) or US
                Dollars (USD). Invoices include statutory Value Added Tax (VAT) where applicable under Kenyan law.
              </p>
              <p>
                <strong>3.2 Accepted Payment Methods:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Safaricom M-Pesa (Official Paybill / Till Number verified at booking).</li>
                <li>Direct Bank Wire Transfer (EFT / RTGS / Swift) to Ubuntu Logistics Ltd bank accounts.</li>
                <li>Credit & Debit Cards (Visa, Mastercard, American Express) via secure payment links.</li>
              </ul>
              <p>
                <strong>3.3 Fuel Policy:</strong> Unless explicitly packaged as &quot;wet lease&quot; (fuel inclusive),
                car rentals operate on a <em>same-to-same fuel policy</em> (vehicles are handed over with a
                specific fuel level and must be returned with the equivalent level).
              </p>
            </section>

            {/* 4. Car Hire & Rental Conditions */}
            <section id="car-hire-rules" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                4. Car Hire & Rental Conditions (Self-Drive & Chauffeur)
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="p-4 rounded-xl bg-card border">
                  <h3 className="font-semibold text-foreground mb-1">A. Driver Age & Licensing</h3>
                  <p>
                    For self-drive rentals, the Hirer and any authorized additional drivers must be at least
                    <strong> 23 years of age</strong> (25 years for specialized 4x4s and luxury fleet) and have held
                    a clean, valid driving license for a minimum of two (2) continuous years. International
                    travelers must present a valid International Driving Permit (IDP) or national license with
                    English translation.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card border">
                  <h3 className="font-semibold text-foreground mb-1">B. Security Deposit & Handover Inspection</h3>
                  <p>
                    A refundable security deposit is required for self-drive rentals to cover potential fuel
                    shortages, minor damages, or traffic penalties. A joint vehicle inspection sheet is executed
                    at pickup and dropoff documenting mileage, spare tire, toolkit, and exterior condition.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card border">
                  <h3 className="font-semibold text-foreground mb-1">C. Territorial & Route Limitations</h3>
                  <p>
                    Vehicles must remain on gazetted national roads, designated safari tracks, or verified routes.
                    Unauthorized off-road driving in restricted terrains or cross-border travel without prior
                    written COMESA clearance is strictly prohibited and invalidates insurance coverage.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card border">
                  <h3 className="font-semibold text-foreground mb-1">D. Breakdown & Replacement Guarantee</h3>
                  <p>
                    In the rare event of mechanical failure not caused by hirer negligence, Ubuntu Logistics
                    provides 24/7 technical roadside support and will dispatch a replacement vehicle of
                    equivalent category within the shortest possible logistical window.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Safari & Long-Distance */}
            <section id="safari-transport" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                5. Safari & Long-Distance Tours
              </h2>
              <p>
                <strong>5.1 Professional Driver-Guides:</strong> Ubuntu Logistics safari vehicles are operated by
                certified, English-speaking professional tour driver-guides licensed by the Tourism Regulatory
                Authority (TRA).
              </p>
              <p>
                <strong>5.2 Driver Hours & Park Rules:</strong> To ensure safety and comply with KWS regulations,
                game drives inside national parks must conclude by <strong>6:30 PM</strong>. Chauffeurs are
                restricted from driving exceeding 9 continuous hours in a single calendar day.
              </p>
              <p>
                <strong>5.3 Park & Conservancy Fees:</strong> Unless explicitly booked as a complete safari package,
                national park entry fees (KWS, Maasai Mara County Government, private conservancies) are payable
                directly by the customer.
              </p>
            </section>

            {/* 6. Airport Transfers */}
            <section id="airport-transfers" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                6. Airport & Chauffeur Transfers
              </h2>
              <p>
                <strong>6.1 Flight Tracking:</strong> We track flight arrivals in real-time. Chauffeurs are
                dispatched according to actual flight touchdown times.
              </p>
              <p>
                <strong>6.2 Complimentary Waiting Time:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li><strong>International Arrivals:</strong> Up to 60 minutes free waiting time from touchdown.</li>
                <li><strong>Domestic Arrivals:</strong> Up to 30 minutes free waiting time.</li>
                <li><strong>Hotel / Point-to-Point Pickups:</strong> 15 minutes complimentary waiting time.</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Excess waiting time beyond complimentary periods may incur an hourly surcharge of KES 1,000 / $10/hr.
              </p>
            </section>

            {/* 7. Cancellations & Refunds */}
            <section id="cancellations-refunds" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                7. Cancellations & Refund Policy
              </h2>
              <p>
                We understand travel schedules can change. Cancellations must be notified in writing via email
                or registered WhatsApp:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border text-left">
                  <thead className="bg-muted text-foreground">
                    <tr>
                      <th className="p-3 border">Cancellation Timeline</th>
                      <th className="p-3 border">Refund Policy</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr>
                      <td className="p-3 border font-medium text-foreground">More than 72 hours before departure</td>
                      <td className="p-3 border text-emerald-600 dark:text-emerald-400 font-semibold">
                        100% refund (less 5% bank/M-Pesa processing charges)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border font-medium text-foreground">Between 24 to 72 hours before departure</td>
                      <td className="p-3 border">50% refund or 100% credit toward future booking (valid 12 months)</td>
                    </tr>
                    <tr>
                      <td className="p-3 border font-medium text-foreground">Less than 24 hours / No-Show</td>
                      <td className="p-3 border text-red-500">Non-refundable (deposit forfeited to cover vehicle allocation)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 8. Passenger Conduct */}
            <section id="passenger-conduct" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                8. Passenger Conduct & Safety Regulations
              </h2>
              <p>
                The safety of passengers, chauffeurs, and other road users is non-negotiable:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li><strong>Seatbelt Law:</strong> All passengers must wear safety belts at all times as mandated by Kenyan traffic laws.</li>
                <li><strong>Non-Smoking Policy:</strong> Smoking, vaping, and consumption of illicit substances are strictly prohibited inside all fleet vehicles. A professional sanitization fee of KES 10,000 applies to violations.</li>
                <li><strong>Luggage Limitations:</strong> Passengers must adhere to luggage volume limits for the booked vehicle class. Dangerous goods, firearms, and flammable materials are strictly prohibited.</li>
                <li><strong>Chauffeur Authority:</strong> In the interest of passenger safety, the assigned driver reserves the right to decline travel on impassable flooded roads or in situations threatening life or vehicle integrity.</li>
              </ul>
            </section>

            {/* 9. Insurance & Liability */}
            <section id="insurance-liability" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                9. Insurance, Excess & Liability
              </h2>
              <p>
                <strong>9.1 Comprehensive Insurance:</strong> All Ubuntu Logistics vehicles are comprehensively
                insured for commercial passenger transport and self-drive rental.
              </p>
              <p>
                <strong>9.2 Excess Liability:</strong> In the event of an accident during a self-drive rental,
                the hirer&apos;s liability is capped at the agreed insurance excess deductible, provided the hirer was
                not in breach of traffic laws (e.g. driving under the influence of alcohol, unauthorized drivers,
                gross negligence).
              </p>
              <p>
                <strong>9.3 Personal Property:</strong> Ubuntu Logistics is not liable for loss or damage to
                passengers&apos; personal luggage, electronics, or valuables left unattended in vehicles.
              </p>
            </section>

            {/* 10. Force Majeure */}
            <section id="force-majeure" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                10. Force Majeure
              </h2>
              <p>
                Neither party shall be held liable for failure or delay in performance resulting from events
                beyond reasonable control, including acts of God, severe flooding, landslides, border closures,
                national security lockdowns, or airline strikes. In such events, bookings will be rescheduled
                without penalty.
              </p>
            </section>

            {/* 11. Governing Law */}
            <section id="governing-law" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                11. Governing Law & Dispute Resolution
              </h2>
              <p>
                These Terms and Conditions are governed by and construed in accordance with the{' '}
                <strong>Laws of the Republic of Kenya</strong>. Any dispute arising under this agreement shall
                first be submitted to amicable negotiation. If unresolved within twenty-one (21) days, the matter
                shall be submitted to the exclusive jurisdiction of the competent courts in Nairobi, Kenya.
              </p>
            </section>

            {/* 12. Contact Info */}
            <section id="contact-info" className="scroll-mt-32 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">
                12. Contact & Customer Support Desk
              </h2>
              <p>
                For questions concerning these Terms, corporate agreements, or specific rental bookings:
              </p>
              <div className="p-6 rounded-2xl bg-zinc-950 text-white border border-zinc-800 space-y-3">
                <h3 className="font-bold text-lg text-emerald-400">Ubuntu Logistics Ltd - Operations Desk</h3>
                <p className="text-sm text-zinc-300">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:info@ubuntulogistics.co.ke" className="text-emerald-400 underline">
                    info@ubuntulogistics.co.ke
                  </a>
                </p>
                <p className="text-sm text-zinc-300">
                  <strong>Primary Hotline:</strong> +254 728 798 580
                </p>
                <p className="text-sm text-zinc-300">
                  <strong>Secondary Line:</strong> +254 728 798580
                </p>
                <p className="text-sm text-zinc-300">
                  <strong>Head Office:</strong> North Airport Road 18114-00200, Embakasi, Nairobi, Kenya
                </p>
                <div className="pt-3 border-t border-zinc-800 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                  >
                    Send Inquiries Online
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
                  >
                    View Privacy Policy
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  )
}
