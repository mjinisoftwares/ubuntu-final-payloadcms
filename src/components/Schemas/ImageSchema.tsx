import { Media } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

export type ImageSchemaProps = Media | string | { media?: Media | string; image?: Media | string; [key: string]: any } | null | undefined

export const imageSchema = (props: ImageSchemaProps) => {
  if (!props) return null

  const targetMedia = (typeof props === 'object' && props !== null && ('media' in props || 'image' in props))
    ? (props as any).media || (props as any).image
    : props

  if (!targetMedia) return null

  // If targetMedia is a string (ID or URL string)
  if (typeof targetMedia === 'string') {
    const isFullUrl = targetMedia.startsWith('http://') || targetMedia.startsWith('https://')
    const imageUrl = isFullUrl
      ? targetMedia
      : `${getServerSideURL() || 'https://www.ubuntulogistics.co.ke'}${targetMedia.startsWith('/') ? '' : '/'}${targetMedia}`
    return {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      contentUrl: imageUrl,
      url: imageUrl,
    }
  }

  const mediaObj = targetMedia as Media
  let imageUrl = mediaObj.url || ''

  if (!imageUrl && mediaObj.filename) {
    if (process.env.S3_ENDPOINT && process.env.S3_BUCKET) {
      imageUrl = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${mediaObj.filename}`
    } else {
      imageUrl = `/media/${mediaObj.filename}`
    }
  }

  if (!imageUrl) return null

  // Ensure absolute URL for JSON-LD compliance
  if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
    const baseUrl = getServerSideURL() || 'https://www.ubuntulogistics.co.ke'
    imageUrl = `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
  }

  const creditText = (mediaObj as any).creditext || (mediaObj as any).creditText || undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: imageUrl,
    url: imageUrl,
    creditText,
    creator: creditText
      ? {
          '@type': 'Person',
          name: creditText,
        }
      : undefined,
    thumbnailUrl: imageUrl,
    copyrightNotice: (mediaObj as any).creditText,
    width: (mediaObj as any).width,
    height: (mediaObj as any).height,
    caption: (mediaObj as any).caption,
    alt: (mediaObj as any).alt,
    abstract: (mediaObj as any).description,
    dateCreated: (mediaObj as any).createdAt,
    dateModified: (mediaObj as any).updatedAt,
  }
}

export const getImageSchema = async (props: ImageSchemaProps) => {
  return imageSchema(props)
}

export function ImageSchema(props: { media?: Media | string; image?: Media | string; [key: string]: any } | Media | string) {
  const schemaObj = imageSchema(props)

  if (!schemaObj) return null

  return (
    <script
      id="image-schema-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaObj),
      }}
    />
  )
}

export default ImageSchema

