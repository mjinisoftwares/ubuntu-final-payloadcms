'use client'

import React, { useEffect, useState } from 'react'
import { ChevronUp, MessageCircle, Phone, X } from 'lucide-react'

const WHATSAPP_NUMBER = '254728798580'
const CALL_NUMBER = '+254728798580'

const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hello Ubuntu Logistics! I would like to inquire about your transport services.',
)

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

export function FloatingWhatsApp() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Initial attention animation
  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsExpanded(true)

      const closeTimer = setTimeout(() => {
        setIsExpanded(false)
        setHasAnimated(true)
      }, 3500)

      return () => clearTimeout(closeTimer)
    }, 2000)

    return () => clearTimeout(openTimer)
  }, [])

  // Scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50"
      aria-label="Quick contact options"
    >
      <div className="flex flex-col items-end gap-3">
        {/* Scroll to top */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className={`
            flex h-10 w-10 items-center justify-center
            rounded-full
            border border-zinc-700
            bg-zinc-900/90
            text-white
            shadow-lg
            backdrop-blur-sm
            transition-all duration-300
            hover:bg-zinc-800
            ${
              showScrollTop
                ? 'translate-y-0 opacity-100 pointer-events-auto'
                : 'translate-y-4 opacity-0 pointer-events-none'
            }
          `}
        >
          <ChevronUp className="h-4 w-4" />
        </button>

        {/* Contact area */}
        <div className="relative flex flex-col items-end">
          {/* Expanded panel */}
          <div
            className={`
              absolute bottom-full right-0 mb-3
              w-[calc(100vw-2.5rem)] max-w-72
              overflow-hidden
              rounded-2xl
              border border-zinc-200
              bg-white
              shadow-2xl
              transition-all duration-300
              origin-bottom-right
              ${
                isExpanded
                  ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto'
                  : 'translate-y-3 scale-95 opacity-0 pointer-events-none'
              }
            `}
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-[#25D366] px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-none text-white">Ubuntu Logistics</p>

                <p className="mt-1 text-xs text-white/80">Typically replies instantly</p>
              </div>

              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                aria-label="Close WhatsApp chat"
                className="text-white/70 transition-colors hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message preview */}
            <div className="bg-[#e5ddd5] px-4 py-4">
              <div className="max-w-[90%] rounded-lg bg-white px-3 py-2 text-xs leading-relaxed text-zinc-700 shadow-sm">
                Hi there 👋 Need a safari, airport transfer, or car hire? We&apos;re here 24/7 —
                drop us a message!
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 border-t border-zinc-100 bg-white p-3">
              <a
                href={`tel:${CALL_NUMBER}`}
                aria-label="Call Ubuntu Logistics"
                className="
                  flex flex-1 items-center justify-center gap-2
                  rounded-lg
                  border border-zinc-200
                  px-3 py-2.5
                  text-xs font-semibold text-zinc-700
                  transition-colors
                  hover:bg-zinc-50
                "
              >
                <Phone className="h-4 w-4 text-emerald-500" />
                Call
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open WhatsApp chat with Ubuntu Logistics"
                className="
                  flex flex-[1.5] items-center justify-center gap-2
                  rounded-lg
                  bg-[#25D366]
                  px-3 py-2.5
                  text-xs font-semibold text-white
                  transition-colors
                  hover:bg-[#20c55e]
                "
              >
                <MessageCircle className="h-4 w-4" />
                Start Chat
              </a>
            </div>
          </div>

          {/* Tooltip */}
          {!isExpanded && hasAnimated && (
            <div
              className="
                pointer-events-none
                absolute right-full top-1/2 mr-3
                -translate-y-1/2
                whitespace-nowrap
              "
            >
              <div className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                Chat on WhatsApp
              </div>
            </div>
          )}

          {/* WhatsApp button */}
          <button
            type="button"
            onClick={() => setIsExpanded((value) => !value)}
            aria-label={
              isExpanded ? 'Close WhatsApp quick contact' : 'Contact Ubuntu Logistics on WhatsApp'
            }
            aria-expanded={isExpanded}
            className="
              relative
              flex h-14 w-14
              items-center justify-center
              rounded-full
              bg-[#25D366]
              shadow-[0_8px_30px_rgba(37,211,102,0.35)]
              transition-all duration-200
              hover:scale-105
              hover:bg-[#20c55e]
              active:scale-95
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#25D366]
              focus-visible:ring-offset-2
              sm:h-15 sm:w-15
            "
          >
            {/* Pulse */}
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />

            <span className="absolute inset-1 rounded-full bg-[#25D366]" />

            {isExpanded ? (
              <X className="relative z-10 h-6 w-6 text-white" />
            ) : (
              <svg
                className="relative z-10 h-7 w-7 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
