import { Media, User } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { personSchema } from './PersonSchema'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export interface ArticleSchemaProps {
  title?: string
  excerpt?: string
  meta?: {
    title?: string
    description?: string
    image?: any
  }
  authors?: (User | any)[]
  content?: any
  createdAt?: string | Date
  updatedAt?: string | Date
  slug?: string
  path?: string
  socialLinks?: string[]
  agencySettings?: any
  post?: any
  [key: string]: any
}

export const articleSchema = (props: ArticleSchemaProps = {}) => {
  const postDoc = props.post || props
  const title = postDoc.title || props.title || ''
  const excerpt = postDoc.excerpt || props.excerpt || postDoc.meta?.description || props.meta?.description || ''
  const image = (postDoc.meta?.image || props.meta?.image) as Media
  const authors = (postDoc.authors || props.authors) as (User | any)[]
  const url = getServerSideURL() || 'https://www.ubuntulogistics.co.ke'

  const settings = props.agencySettings
  const commerceSettings = settings?.commerce
  const orgName = settings?.identity?.name || 'Ubuntu Logistics'

  // Safely format ISO strings to prevent application crashes
  const formatDate = (dateString: any) => {
    if (!dateString) return undefined
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? undefined : date.toISOString()
  }

  // Construct absolute image URL safely
  let imageUrl = ''
  if (image?.url) {
    imageUrl = image.url.startsWith('http') ? image.url : `${url}${image.url.startsWith('/') ? '' : '/'}${image.url}`
  } else if (image?.filename && process.env.S3_ENDPOINT && process.env.S3_BUCKET) {
    try {
      imageUrl = new URL(`${process.env.S3_BUCKET}/${image.filename}`, process.env.S3_ENDPOINT).href
    } catch {
      imageUrl = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${image.filename}`
    }
  }

  const slug = postDoc.slug || props.slug
  const cleanPath = props.path ? (props.path.endsWith('/') ? props.path.slice(0, -1) : props.path) : 'posts'
  const pageUrl = slug ? `${url}/${cleanPath}/${slug}` : url

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title.substring(0, 110),
    description: excerpt,
    image: imageUrl ? [imageUrl] : [],
    articleBody: typeof postDoc.content === 'string' ? postDoc.content : undefined,
    sameAs: props.socialLinks || [],

    datePublished: formatDate(postDoc.createdAt || props.createdAt),
    dateModified: formatDate(postDoc.updatedAt || props.updatedAt),

    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },

    author: Array.isArray(authors) && authors.length > 0
      ? authors.map((author: any) => {
          if (author && typeof author === 'object' && ('name' in author || 'title' in author)) {
            return personSchema(author)
          }
          return {
            '@type': 'Person',
            name: String(author || 'Ubuntu Logistics Specialist'),
          }
        })
      : [
          {
            '@type': 'Organization',
            name: orgName,
            url: url,
          },
        ],

    publisher: {
      '@type': 'Organization',
      name: orgName,
      url: url,
      logo: {
        '@type': 'ImageObject',
        url: `${url}/logo.png`,
      },
    },

    keywords: [
      ...new Set([
        ...(commerceSettings?.defaultKeywords || []).map((k: any) => String(k?.keyword || k)),
        orgName,
        'Logistics Kenya',
        'Freight Forwarding Nairobi',
        'Transport Logistics East Africa',
      ]),
    ]
      .filter(Boolean)
      .join(', '),
  }
}

export const getArticleSchema = async (props: ArticleSchemaProps = {}) => {
  let agencySettings = props.agencySettings ?? null
  if (!agencySettings) {
    try {
      const payload = await getPayload({ config: configPromise })
      agencySettings = await payload.findGlobal({
        slug: 'agency-settings',
        depth: 1,
        overrideAccess: true,
      })
    } catch (err) {
      console.error('[ArticleSchema] Error fetching agency-settings:', err)
    }
  }
  return articleSchema({ ...props, agencySettings })
}

export async function ArticleSchema(props: ArticleSchemaProps) {
  const schemaObj = await getArticleSchema(props)

  if (!schemaObj) return null

  return (
    <script
      id="article-schema-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaObj),
      }}
    />
  )
}

export default ArticleSchema

