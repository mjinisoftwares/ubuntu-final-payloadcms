'use client'

import * as React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'

type CarouselProps = {
  opts?: {
    align?: 'start' | 'center' | 'end'
    loop?: boolean
  }
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: any) => void
} & React.HTMLAttributes<HTMLDivElement>

type CarouselContextProps = {
  carouselRef: React.RefObject<HTMLDivElement | null>
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  orientation: 'horizontal' | 'vertical'
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

export function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }
  return context
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ orientation = 'horizontal', opts, className, children, ...props }, ref) => {
    const carouselRef = React.useRef<HTMLDivElement | null>(null)
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(true)

    const updateScrollState = React.useCallback(() => {
      if (!carouselRef.current) return
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollPrev(scrollLeft > 10)
      setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 10)
    }, [])

    React.useEffect(() => {
      const el = carouselRef.current
      if (!el) return
      updateScrollState()
      el.addEventListener('scroll', updateScrollState, { passive: true })
      window.addEventListener('resize', updateScrollState)
      return () => {
        el.removeEventListener('scroll', updateScrollState)
        window.removeEventListener('resize', updateScrollState)
      }
    }, [updateScrollState])

    const scrollPrev = React.useCallback(() => {
      if (!carouselRef.current) return
      const el = carouselRef.current
      const amount = el.clientWidth * 0.8
      el.scrollBy({ left: -amount, behavior: 'smooth' })
    }, [])

    const scrollNext = React.useCallback(() => {
      if (!carouselRef.current) return
      const el = carouselRef.current
      const amount = el.clientWidth * 0.8
      el.scrollBy({ left: amount, behavior: 'smooth' })
    }, [])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          orientation,
        }}
      >
        <div
          ref={ref}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  },
)
Carousel.displayName = 'Carousel'

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-x-auto scroll-smooth no-scrollbar flex"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div
        ref={ref}
        className={cn('flex -ml-4 w-full', className)}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = 'CarouselContent'

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn('min-w-0 shrink-0 grow-0 pl-4', className)}
      {...props}
    />
  )
})
CarouselItem.displayName = 'CarouselItem'

export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn('h-8 w-8 rounded-full', className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = 'CarouselPrevious'

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn('h-8 w-8 rounded-full', className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = 'CarouselNext'
