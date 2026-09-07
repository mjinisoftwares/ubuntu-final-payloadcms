import type { GlobalAfterChangeHook } from 'payload'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    try {
      const { revalidateTag } = require('next/cache')

      payload.logger.info(`Revalidating header`)

      revalidateTag('global_header')
    } catch (err) {
      payload.logger.warn(`Could not revalidate header: ${err}`)
    }
  }

  return doc
}
