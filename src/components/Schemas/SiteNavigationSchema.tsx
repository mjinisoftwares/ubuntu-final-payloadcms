import { getServerSideURL } from '@/utilities/getURL'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export interface NavigationItem {
  name: string
  url: string
}

export interface SiteNavigationSchemaProps {
  items?: NavigationItem[]
  name?: string
  agencySettings?: any
  [key: string]: any
}

export const siteNavigationSchema = (props: SiteNavigationSchemaProps = {}) => {
  const baseUrl = getServerSideURL() || 'https://www.ubuntulogistics.co.ke'
  const orgName = props.agencySettings?.identity?.name || 'Ubuntu Logistics'

  const defaultItems: NavigationItem[] = [
    { name: 'Home', url: baseUrl },
    { name: 'Services', url: `${baseUrl}/services` },
    { name: 'Fleet', url: `${baseUrl}/fleet` },
    { name: 'Destinations', url: `${baseUrl}/destinations` },
    { name: 'Hire', url: `${baseUrl}/hire` },
    { name: 'Insights & Blog', url: `${baseUrl}/posts` },
  ]

  const items = props.items && props.items.length > 0 ? props.items : defaultItems

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: props.name || `${orgName} Main Navigation`,
    itemListElement: items.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url.startsWith('/') ? '' : '/'}${item.url}`,
    })),
  }
}

export const getSiteNavigationSchema = async (props: SiteNavigationSchemaProps = {}) => {
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
      console.error('[SiteNavigationSchema] Error fetching agency-settings:', err)
    }
  }
  return siteNavigationSchema({ ...props, agencySettings })
}

export async function SiteNavigationSchema(props: SiteNavigationSchemaProps = {}) {
  const schemaObj = await getSiteNavigationSchema(props)

  if (!schemaObj) return null

  return (
    <script
      id="site-navigation-schema-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaObj),
      }}
    />
  )
}

export default SiteNavigationSchema

