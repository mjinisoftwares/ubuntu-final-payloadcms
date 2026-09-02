import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getHireSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const [fleetResult, destResult] = await Promise.all([
      payload.find({
        collection: 'fleet',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 1000,
        pagination: false,
        where: {
          _status: {
            equals: 'published',
          },
        },
        select: {
          slug: true,
          updatedAt: true,
        },
      }),
      payload.find({
        collection: 'destinations',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 1000,
        pagination: false,
        where: {
          _status: {
            equals: 'published',
          },
        },
        select: {
          slug: true,
          updatedAt: true,
        },
      }),
    ])

    const dateFallback = new Date().toISOString()
    const sitemap: { loc: string; lastmod: string }[] = []

    const fleetDocs = fleetResult.docs || []
    const destDocs = destResult.docs || []

    for (const f of fleetDocs) {
      if (!f?.slug) continue
      for (const d of destDocs) {
        if (!d?.slug) continue

        const fDate = f.updatedAt ? new Date(f.updatedAt).getTime() : 0
        const dDate = d.updatedAt ? new Date(d.updatedAt).getTime() : 0
        const latestMod = fDate > dDate ? f.updatedAt : d.updatedAt

        sitemap.push({
          loc: `${SITE_URL}/hire/${f.slug}/to/${d.slug}`,
          lastmod: latestMod || dateFallback,
        })
      }
    }

    return sitemap
  },
  ['hire-sitemap'],
  {
    tags: ['hire-sitemap', 'fleet-sitemap', 'destinations-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getHireSitemap()

  return getServerSideSitemap(sitemap)
}
