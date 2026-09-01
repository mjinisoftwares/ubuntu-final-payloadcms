import React from 'react'
import { Star } from 'lucide-react'

interface ReviewItem {
  id: string
  name: string
  avatar: string
  rating: number
  date: string
  comment: string
}

const mockGoogleReviews: ReviewItem[] = [
  {
    id: '1',
    name: 'Catherine Njeri',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: '3 weeks ago',
    comment:
      'Top-tier digital agency in Nairobi. Their team is extremely professional and built our e-commerce platform with seamless M-Pesa integration.',
  },
  {
    id: '2',
    name: 'Kevin Mutua',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: '1 month ago',
    comment:
      'The speed and SEO score of our website went through the roof after Mjini Digital redesigned it. Highly recommended!',
  },
  {
    id: '3',
    name: 'Grace Wambui',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: '3 months ago',
    comment:
      'Outstanding strategic advice, high UX/UI standards, and on-time project delivery. A pleasure to collaborate with.',
  },
]

export const GoogleReviews: React.FC = () => {
  return (
    <div className="my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-white border border-border shadow-sm flex items-center justify-center font-bold text-sm">
          <span className="text-[#4285F4]">G</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Google Reviews</h3>
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
            <span className="text-xs font-medium text-muted-foreground ml-1.5">5.0 (48 reviews)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockGoogleReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm shadow-sm space-y-4 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-10 h-10 rounded-full object-cover border border-border"
              />
              <div>
                <h4 className="font-semibold text-sm text-foreground">{rev.name}</h4>
                <span className="text-xs text-muted-foreground">{rev.date}</span>
              </div>
            </div>
            <div className="flex text-amber-500">
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GoogleReviews
