import { cn } from '@/utilities/ui'
import { RollerCoasterIcon } from 'lucide-react'
import React from 'react'

export type AboutBlockProps = {
  heading?: string
  subheading?: string
  content?: any
  ourValues?: { value: string; label: string; icon?: React.ReactNode }[]
  image?: any
  links?: any[]
  className?: string
}

const defaultData = {
  heading: 'About Us – Ubuntu Logistics',
  description1:
    'Ubuntu Logistics is a leading transport logistics company in Kenya, providing reliable & efficient transport services in Nairobi and across East Africa. Our services include van hire, airport and hotel transfers, professional driver hire, wedding transport, and staff transfers — all tailored to meet your travel and logistics needs.',
  description2:
    'At Ubuntu Logistics, we take pride in offering premium transport and logistics services across Kenya and East Africa. Our modern fleet is equipped with advanced tracking technology to ensure every journey is efficient, safe, and reliable. Whether you need wedding transport, corporate shuttles, hotel and airport transfers, or large-scale logistics solutions, we deliver with professionalism and a strong customer-first approach.',
  link: 'https://www.ubuntulogistics.co.ke/',
  fallbackValues: [
    { value: '100%', label: 'Reliability Rate' },
    { value: '24/7', label: 'Fleet Dispatch & Support' },
    { value: 'E.A.', label: 'Full Regional Coverage' },
  ],
}

export const AboutBlock: React.FC<AboutBlockProps> = (props) => {
  const { heading, subheading, ourValues, image, className } = props

  const displayHeading = heading || defaultData.heading
  const displaySubheading = subheading || defaultData.description1
  const displayValues = ourValues || defaultData.fallbackValues

  return (
    <section className={cn('relative isolate overflow-hidden bg-background py-20', className)}>
      {/* Structural Minimal Background Accents inspired by the image */}
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute left-1/2 top-0 -z-10 h-full w-px -translate-x-1/2 bg-border/20 [mask-image:linear-gradient(to_bottom,white,transparent)] hidden lg:block" />

      <div className="container max-w-7xl mx-auto `">
        <div className="flex flex-col gap-20 lg:gap-28">
          {/* Top Intro Section - Clean Left Aligned Architecture */}
          <div className="grid gap-8 lg:grid-cols-12 items-start border-b border-primary/30 pb-8">
            <div className="lg:col-span-5">
              <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary block mb-2">
                Corporate Profile
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-primary max-w-md balance leading-[1.1]">
                {displayHeading}
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-7">
              <p className="text-lg text-muted-foreground leading-relaxed font-light max-w-3xl">
                {displaySubheading}
              </p>
            </div>
          </div>

          {/* Main Content Layout Block */}
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-24 items-center -mt-12">
            {/* Left Column: Descriptive Text & Value Grid */}
            <div className="flex flex-col gap-10 lg:col-span-6 order-2 lg:order-1">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                  Our Commitment
                </h3>
                <hr className="bg-secondary w-1/4 h-1 rounded-full" />
                <p className="text-base text-muted-foreground leading-relaxed font-light">
                  {defaultData.description2}
                </p>
              </div>

              {/* Dynamic Value/Stat Grid */}
              <div className="grid grid-cols-3 gap-6 border-y border-border">
                {displayValues.map((item, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <span className="text-2xl sm:text-3xl font-light tracking-tight text-foreground">
                      {item.value}
                    </span>
                    <span className="text-xs tracking-wider text-muted-foreground uppercase font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Architectural Framed Image Layout */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="group relative overflow-hidden rounded-xl bg-muted border-4 border-primary aspect-[4/3] sm:aspect-video lg:aspect-[5/4] shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
                {/* Micro Ambient Overlay Tint matching the architectural reference */}
                <div className="absolute inset-0 bg-[#c0e0e5]/5 mix-blend-multiply opacity-60 pointer-events-none z-10 transition-opacity group-hover:opacity-20" />

                <img
                  src={
                    image?.url ||
                    'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/about/photo-1-16x9.jpg'
                  }
                  alt={image?.alt || 'Ubuntu Logistics Corporate Fleet'}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
