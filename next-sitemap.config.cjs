let siteUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://ubuntulogistics.co.ke'

if (siteUrl && !siteUrl.startsWith('http://') && !siteUrl.startsWith('https://')) {
  siteUrl = `https://${siteUrl}`
}
siteUrl = siteUrl.replace(/\/$/, '')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/*-sitemap.xml', '/*', '/posts/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/pages-sitemap.xml`,
      `${siteUrl}/posts-sitemap.xml`,
      `${siteUrl}/destinations-sitemap.xml`,
      `${siteUrl}/fleet-sitemap.xml`,
      `${siteUrl}/services-sitemap.xml`,
      `${siteUrl}/hire-sitemap.xml`,
    ],
  },
}
