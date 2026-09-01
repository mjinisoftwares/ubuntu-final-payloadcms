'use client'

import React, { useState, useEffect } from 'react'
import { Media } from '@/components/Media'

export const Slider: React.FC<{ media: any[] }> = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!media || media.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % media.length)
    }, 5000) // 5 seconds per slide

    return () => clearInterval(interval)
  }, [media])

  if (!media || !Array.isArray(media) || media.length === 0) return null

  return (
    <>
      {media.map((item, index) => (
        <div
          key={item?.id || index}
          className={`absolute inset-0 -z-30 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Media fill priority={index === 0} resource={item} imgClassName="object-cover object-center" />
        </div>
      ))}
    </>
  )
}
