import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Header as HeaderType } from '@/payload-types'
import { HeaderClient } from './Component.client'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function Header() {
  try {
    const getHeader = getCachedGlobal('header', 1)
    const headerData = await getHeader() as HeaderType

    const payload = await getPayload({ config: configPromise })

    if (headerData.navItems) {
      for (const item of headerData.navItems) {
        if (item.label.toLowerCase() === 'destinations') {
          const destinationsReq = await payload.find({
            collection: 'destinations',
            limit: 50,
            depth: 0,
          })

          const mappedDestinations = destinationsReq.docs.map((doc) => ({
            label: doc.title,
            description: doc.subTitle || doc.summary || `Explore ${doc.title}`,
            linkType: 'custom' as const,
            externalUrl: `/destinations/${doc.slug}`,
            newTab: false,
          }))

          item.children = [
            ...(item.children || []),
            ...mappedDestinations,
          ]
        }

        if (item.label.toLowerCase() === 'services') {
          const servicesReq = await payload.find({
            collection: 'services',
            limit: 50,
            depth: 0,
          })

          const mappedServices = servicesReq.docs.map((doc) => ({
            label: doc.title,
            description: doc.subTitle || doc.summary || `View our ${doc.title} service`,
            linkType: 'custom' as const,
            externalUrl: `/services/${doc.slug}`,
            newTab: false,
          }))

          item.children = [
            ...(item.children || []),
            ...mappedServices,
          ]
        }
      }
    }

    return <HeaderClient data={headerData} />
  } catch (error) {
    console.error('Failed to fetch header data:', error)

    // Return empty header with fallback data
    const fallbackData: HeaderType = {
      id: 0,
      navItems: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return <HeaderClient data={fallbackData} />
  }
}
