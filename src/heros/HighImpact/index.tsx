import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Slider } from './Slider'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <section className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#262559] text-white">
      {/* Background Slider Media */}
      <Slider media={Array.isArray(media) ? media : media ? [media] : []} />

      {/* Professional Depth Layers */}
      <div className="absolute inset-0 -z-30 bg-[#262559]/40" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/15 mix-blend-plus-lighter" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#262559]/10 via-[#262559]/40 to-[#262559]/90" />

      {/* Subtle Ambient Brand Glows */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 -z-10 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]" />

      {/* Centered Content Area */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-6 py-32 text-center max-md:pt-40">
        {/* Subtle Glassmorphism Card */}
        <div className="mt-20 relative w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03]  shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md mix-blend-lighten sm:px-12 py-12">
          {/* Top Decorative Micro-Accent */}
          <div className="absolute top-0 left-1/2 h-[2px] w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent" />

          {/* Typography Body */}
          {richText && (
            <RichText
              data={richText}
              enableGutter={false}
              className="mb-10
                [&_h1]:mx-auto [&_h1]:mb-6 [&_h1]:max-w-5xl [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:leading-[1.1] [&_h1]:tracking-tight [&_h1]:text-white sm:[&_h1]:text-5xl 
                [&_h2]:mx-auto [&_h2]:mb-6 [&_h2]:max-w-5xl [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-white sm:[&_h2]:text-4xl
                [&_p]:mx-auto [&_p]:max-w-5xl [&_p]:text-base [&_p]:font-medium [&_p]:leading-relaxed [&_p]:text-zinc-200/90 
                [&_strong]:text-secondary [&_strong]:font-semibold"
            />
          )}

          {/* Call To Actions */}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex items-center justify-center gap-4 flex-row">
              {links.map(({ link }, i) => {
                // Pro tip: Style your CMSLink globally or target them using child selectors here
                return (
                  <li
                    key={i}
                    className="transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Pro SVG Wave Pattern Bottom Transition */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20 translate-y-[1px]">
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          className="w-full h-auto drop-shadow-[0_-10px_15px_rgba(38,37,89,0.3)]"
          xmlns="http://w3.org"
        >
          {/* Secondary background wave layer */}
          <path
            d="M0,96L60,112C120,128,240,160,360,165.3C480,171,600,149,720,128C840,107,960,85,1080,85.3C1200,85,1320,107,1380,117.3L1440,128L1440,200L1380,200C1320,200,1200,200,1080,200C960,200,840,200,720,200C600,200,480,200,360,200C240,200,120,200,60,200L0,200Z"
            className="fill-[#262559]/40"
          />
          {/* Main solid bottom wave layer matching layout color */}
          <path
            d="M0,128L60,133.3C120,139,240,149,360,144C480,139,600,117,720,112C840,107,960,117,1080,128C1200,139,1320,149,1380,154.7L1440,160L1440,200L1380,200C1320,200,1200,200,1080,200C960,200,840,200,720,200C600,200,480,200,360,200C240,200,120,200,60,200L0,200Z"
            className="fill-[#262559]" // Changes this to match your next section's background color
          />
        </svg>
      </div>
    </section>
  )
}
