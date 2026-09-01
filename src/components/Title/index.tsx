import React from 'react'
import { cn } from '@/utilities/ui'

export interface TitleProps {
  title?: string | null
  subTitle?: string | null
  description?: string | null
  className?: string
  align?: 'left' | 'center' | 'right'
}

export const Title: React.FC<TitleProps> = ({
  title,
  subTitle,
  description,
  className,
  align = 'center',
}) => {
  if (!title && !subTitle && !description) return null

  return (
    <div
      className={cn(
        'space-y-3',
        align === 'center' && 'text-center mx-auto',
        align === 'right' && 'text-right',
        align === 'left' && 'text-left',
        className,
      )}
    >
      {subTitle && (
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">{subTitle}</p>
      )}
      <hr className="bg-secondary w-1/4 h-1 rounded-full mt-4 mx-auto" />

      {title && (
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl leading-[1.1]">
          {title}
        </h2>
      )}

      {description && (
        <p className="max-w-3xl text-base text-muted-foreground sm:text-lg leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </div>
  )
}

export default Title
