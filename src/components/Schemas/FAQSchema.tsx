import type { Faq, Service } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

function lexicalToPlainText(richText: Faq['answer'] | null | undefined): string {
  if (!richText) return ''
  if (typeof richText === 'string') return richText
  if (!richText?.root?.children) return ''

  const walkNodes = (nodes: any[]): string =>
    nodes
      .map((node: any) => {
        if (node.text !== undefined) return node.text as string
        if (Array.isArray(node.children)) return walkNodes(node.children)
        return ''
      })
      .join('')

  return walkNodes(richText.root.children).replace(/\s+/g, ' ').trim()
}

export interface FAQItem {
  question: string
  answer: any
}

export interface FAQSchemaProps {
  /** The current service page document */
  service?: Partial<Service> | null
  /** FAQs already fetched for this page */
  faqs?: Faq[] | FAQItem[] | null
  /** Override the canonical page URL */
  url?: string
  /** Override the FAQPage display name */
  name?: string
  agencySettings?: any
  [key: string]: any
}

export const faqSchema = (props: FAQSchemaProps = {}) => {
  const baseUrl = getServerSideURL() || 'https://www.ubuntulogistics.co.ke'
  const serviceSlug = props.service?.slug || ''
  const pageUrl = props.url || (serviceSlug ? `${baseUrl}/services/${serviceSlug}` : baseUrl)

  const faqItems = props.faqs ?? []

  if (!faqItems || faqItems.length === 0) return null

  const orgName = props.agencySettings?.identity?.name || 'Ubuntu Logistics'

  const mainEntity = faqItems.map((faq: any) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: typeof faq.answer === 'string' ? faq.answer : lexicalToPlainText(faq.answer),
    },
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    url: pageUrl,
    name:
      props.name ||
      `${props.service?.title ?? 'Service'} — Frequently Asked Questions | ${orgName}`,

    provider: {
      '@id': `${baseUrl}/#organization`,
    },

    mainEntity,
  }
}

export const getFAQSchema = async (props: FAQSchemaProps = {}) => {
  let faqs = props.faqs || []
  let agencySettings = props.agencySettings ?? null

  try {
    const payload = await getPayload({ config: configPromise })
    if (!agencySettings) {
      agencySettings = await payload.findGlobal({
        slug: 'agency-settings',
        depth: 1,
        overrideAccess: true,
      })
    }

    if (faqs.length === 0 && props.service?.id) {
      const faqRes = await payload.find({
        collection: 'faqs',
        where: { service: { equals: props.service.id } },
        limit: 20,
      })
      faqs = faqRes.docs || []
    }
  } catch (err) {
    console.error('[FAQSchema] Error fetching data:', err)
  }

  return faqSchema({ ...props, faqs, agencySettings })
}

export async function FAQSchema(props: FAQSchemaProps) {
  const schemaObj = await getFAQSchema(props)

  if (!schemaObj) return null

  return (
    <script
      id="faq-schema-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaObj),
      }}
    />
  )
}

export default FAQSchema

