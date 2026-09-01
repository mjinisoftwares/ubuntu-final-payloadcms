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

const mockFacebookReviews: ReviewItem[] = [
  {
    id: '1',
    name: 'David Mwangi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 weeks ago',
    comment:
      'Mjini Digital delivered an outstanding custom web platform for our company. The SEO optimization and performance are second to none!',
  },
  {
    id: '2',
    name: 'Sarah Ochieng',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: '1 month ago',
    comment:
      'Incredible attention to detail, flawless responsive design, and exceptional technical support throughout the development process.',
  },
  {
    id: '3',
    name: 'Brian Kiprop',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 months ago',
    comment:
      'Transformed our online presence and significantly boosted our organic search leads within the first 60 days.',
  },
]

export const FacebookReviews: React.FC = () => {
  return (
    <div className="my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-sm">
          f
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Facebook Reviews</h3>
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
            <span className="text-xs font-medium text-muted-foreground ml-1.5">5.0 Rating</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockFacebookReviews.map((rev) => (
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

export default FacebookReviews
