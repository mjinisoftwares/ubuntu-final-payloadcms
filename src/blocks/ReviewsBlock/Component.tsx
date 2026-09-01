import Title from '@/components/Title'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import FacebookReviews from '@/components/FacebookReviews'
import GoogleReviews from '@/components/GoogleReviews'

interface ReviewsBlockProps {
  title?: string | null
  subTitle?: string | null
  description?: string | null
}

export const ReviewsBlockComponent: React.FC<ReviewsBlockProps> = () => {
  return (
    <section className="my-10">
      <div className="container mx-auto max-w-7xl">
        <GoogleReviews />
      </div>
    </section>
  )
}

export default ReviewsBlockComponent
