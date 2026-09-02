import { Pricing, Service } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export interface OfferCatalogSchemaProps {
  agencySettings?: any
  service?: Partial<Service> | null
  pricings?: Partial<Pricing>[] | null
  plans?: Partial<Pricing>[] | null
  catalogName?: string
  slug?: string
  title?: string
  [key: string]: any
}

export const offerCatalogSchema = (props: any) => {
  const baseUrl = getServerSideURL() || 'https://www.ubuntulogistics.co.ke'
  const settings = props?.agencySettings
  const identity = settings?.identity
  const commerceSettings = settings?.commerce

  const orgName = identity?.name || 'Ubuntu Logistics'

  // Dynamic global target regions
  let globalTargetAreas: any[] = []
  if (Array.isArray(commerceSettings?.areaServed) && commerceSettings.areaServed.length > 0) {
    globalTargetAreas = commerceSettings.areaServed.map((a: any) =>
      typeof a === 'string'
        ? { '@type': 'Country', name: a }
        : { '@type': a.type || 'Country', name: a.name, ...(a.sameAs ? { sameAs: a.sameAs } : {}) },
    )
  } else if (Array.isArray(identity?.areaServed) && identity.areaServed.length > 0) {
    globalTargetAreas = identity.areaServed.map((a: any) =>
      typeof a === 'string'
        ? { '@type': 'Country', name: a }
        : { '@type': a.type || 'Country', name: a.name, ...(a.sameAs ? { sameAs: a.sameAs } : {}) },
    )
  } else {
    globalTargetAreas = [
      { '@type': 'Country', name: 'Kenya' },
      { '@type': 'City', name: 'Nairobi' },
      { '@type': 'AdministrativeArea', name: 'East Africa' },
    ]
  }

  let serviceDoc: Partial<Service> | null = null
  let pricingList: Partial<Pricing>[] = []

  if (props && typeof props === 'object') {
    if (props.service) {
      serviceDoc = props.service
    } else if (props.slug || props.title) {
      serviceDoc = props
    }

    if (Array.isArray(props.pricings)) {
      pricingList = props.pricings
    } else if (Array.isArray(props.plans)) {
      pricingList = props.plans
    }
  } else if (Array.isArray(props)) {
    pricingList = props
  }

  const serviceSlug = serviceDoc?.slug || ''
  const serviceUrl = serviceSlug ? `${baseUrl}/services/${serviceSlug}` : `${baseUrl}/services`
  const serviceTitle = serviceDoc?.title || 'Logistics & Transport Services'
  const serviceDescription =
    serviceDoc?.summary ||
    serviceDoc?.meta?.description ||
    `Professional transport logistics, cargo management, and freight services by ${orgName}.`

  let itemListElement: any[] = []

  if (pricingList.length > 0) {
    itemListElement = pricingList.map((plan: any) => {
      const typeLabel = plan.pricingType || plan.billingUnit || plan.planType
      const planTitle = plan.title || (typeLabel ? `${String(typeLabel).replace(/_/g, ' ').toUpperCase()} Plan` : serviceTitle)
      const rawPrice = plan.priceKES ?? plan.priceUSD ?? plan.price
      const currency = plan.currency || (plan.priceKES ? 'KES' : plan.priceUSD ? 'USD' : 'KES')
      const formattedPrice =
        rawPrice !== undefined && rawPrice !== null
          ? typeof rawPrice === 'number'
            ? rawPrice.toFixed(2)
            : String(rawPrice)
          : undefined

      const planTypeLabel = typeLabel ? `${String(typeLabel).replace(/_/g, ' ')} rate` : serviceTitle

      return {
        '@type': 'Offer',
        name: planTitle,
        url: serviceUrl,
        ...(formattedPrice ? { price: formattedPrice, priceCurrency: currency } : {}),
        itemOffered: {
          '@type': 'Service',
          '@id': `${serviceUrl}#service-${plan.id || typeLabel || 'plan'}`,
          name: `${serviceTitle} - ${planTitle}`,
          serviceType: planTypeLabel,
          description: serviceDescription,
          url: serviceUrl,
          provider: {
            '@type': 'Organization',
            '@id': `${baseUrl}/#organization`,
            name: orgName,
            url: baseUrl,
          },
          areaServed: globalTargetAreas,
        },
      }
    })
  } else {
    itemListElement = [
      {
        '@type': 'Offer',
        name: serviceTitle,
        url: serviceUrl,
        itemOffered: {
          '@type': 'Service',
          '@id': `${serviceUrl}#service`,
          name: serviceTitle,
          serviceType: serviceDoc?.subTitle || serviceTitle,
          description: serviceDescription,
          url: serviceUrl,
          provider: {
            '@type': 'Organization',
            '@id': `${baseUrl}/#organization`,
            name: orgName,
            url: baseUrl,
          },
          areaServed: globalTargetAreas,
        },
      },
    ]
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${baseUrl}/#primary-services`,
    name: props?.catalogName || `Service Plans & Offers for ${serviceTitle}`,
    itemListElement,
  }
}

export const getOfferCatalogSchema = async (props: OfferCatalogSchemaProps = {}) => {
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
      console.error('[OfferCatalogSchema] Error fetching agency-settings:', err)
    }
  }
  return offerCatalogSchema({ ...props, agencySettings })
}

export async function OfferCatalogSchema(props: OfferCatalogSchemaProps = {}) {
  const schemaObj = await getOfferCatalogSchema(props)

  if (!schemaObj) return null

  return (
    <script
      id="offer-catalog-schema-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaObj),
      }}
    />
  )
}

export default OfferCatalogSchema



