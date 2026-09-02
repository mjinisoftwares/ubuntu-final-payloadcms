import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Fleet } from '../../../payload-types'

export const revalidateFleet: CollectionAfterChangeHook<Fleet> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/fleet/${doc.slug}`

      payload.logger.info(`Revalidating fleet at path: ${path}`)

      revalidatePath(path)
      revalidateTag('fleet-sitemap', 'max')
      revalidateTag('hire-sitemap', 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/fleet/${previousDoc.slug}`

      payload.logger.info(`Revalidating old fleet at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('fleet-sitemap', 'max')
      revalidateTag('hire-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Fleet> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/fleet/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('fleet-sitemap', 'max')
    revalidateTag('hire-sitemap', 'max')
  }

  return doc
}
