import { getServerSideSitemapIndex } from 'next-sitemap'
import { getServerSideURL } from '@/utilities/getURL'

export async function GET() {
  const SITE_URL = getServerSideURL()

  return getServerSideSitemapIndex([
    `${SITE_URL}/pages-sitemap.xml`,
    `${SITE_URL}/posts-sitemap.xml`,
    `${SITE_URL}/destinations-sitemap.xml`,
    `${SITE_URL}/fleet-sitemap.xml`,
    `${SITE_URL}/services-sitemap.xml`,
    `${SITE_URL}/hire-sitemap.xml`,
  ])
}
