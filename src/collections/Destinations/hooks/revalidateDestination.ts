import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Destination } from '../../../payload-types'

export const revalidateDestination: CollectionAfterChangeHook<Destination> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/destinations/${doc.slug}`

      payload.logger.info(`Revalidating destination at path: ${path}`)

      try {
        revalidatePath(path)
        revalidateTag('destinations-sitemap', 'max')
        revalidateTag('hire-sitemap', 'max')
      } catch (err) {
        payload.logger.warn(`Could not revalidate path ${path}: ${err}`)
      }
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/destinations/${previousDoc.slug}`

      payload.logger.info(`Revalidating old destination at path: ${oldPath}`)

      try {
        revalidatePath(oldPath)
        revalidateTag('destinations-sitemap', 'max')
        revalidateTag('hire-sitemap', 'max')
      } catch (err) {
        payload.logger.warn(`Could not revalidate old path ${oldPath}: ${err}`)
      }
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Destination> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/destinations/${doc?.slug}`
    try {
      revalidatePath(path)
      revalidateTag('destinations-sitemap', 'max')
      revalidateTag('hire-sitemap', 'max')
    } catch (_) {}
  }

  return doc
}
