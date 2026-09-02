import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Compass } from 'lucide-react'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schemas'
import ContentNavigation from '@/components/ContentNavigation'
import { Button } from '@/components/ui/button'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-24">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <ArticleSchema post={post} slug={decodedSlug} />
      <BreadcrumbSchema items={[{ name: 'Blog', url: '/posts' }, { name: post.title || decodedSlug, url }]} />

      <PostHero post={post} />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Article Content Column */}
          <div className="lg:col-span-8 min-w-0 space-y-12">
            <div className="prose dark:prose-invert max-w-none">
              <RichText data={post.content} enableGutter={false} />
            </div>

            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div className="pt-8 border-t border-border">
                <h2 className="text-2xl font-bold tracking-tight mb-6">Related Articles</h2>
                <RelatedPosts
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  docs={post.relatedPosts.filter((post) => typeof post === 'object')}
                />
              </div>
            )}
          </div>

          {/* Sticky Sidebar Column on MD+ Screens */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <ContentNavigation title="Table of Contents" />

            {/* Explore Safari Transport Card */}
            <div className="p-5 rounded-2xl border border-border bg-card/95 backdrop-blur shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Compass className="h-4 w-4" />
                <h3 className="font-bold text-foreground text-sm">Plan Your Kenya Safari</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Looking for reliable 4x4 Land Cruisers, customized safari transfers, or chauffeured vehicle rentals across Kenya?
              </p>
              <Button asChild size="default" className="w-full rounded-xl font-semibold">
                <Link href="/services">
                  Explore Services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
