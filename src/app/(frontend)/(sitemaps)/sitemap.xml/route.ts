import { getServerSideSitemapIndex } from 'next-sitemap'

export async function GET() {
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'

  return getServerSideSitemapIndex([
    `${SITE_URL}/pages-sitemap.xml`,
    `${SITE_URL}/posts-sitemap.xml`,
    `${SITE_URL}/destinations-sitemap.xml`,
    `${SITE_URL}/fleet-sitemap.xml`,
    `${SITE_URL}/services-sitemap.xml`,
    `${SITE_URL}/hire-sitemap.xml`,
  ])
}
