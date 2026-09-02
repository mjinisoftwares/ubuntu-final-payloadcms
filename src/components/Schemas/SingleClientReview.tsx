import { personSchema } from './PersonSchema'
import { getServerSideURL } from '@/utilities/getURL'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export interface ClientReviewSchemaProps {
  caseStudyUrl?: string
  serviceRendered?: string
  rating?: string | number
  reviewTitle?: string
  clientName?: string
  clientTitle?: string
  reviewText?: string
  publisherName?: string
  agencySettings?: any
  [key: string]: any
}

export const clientReviewSchema = (props: ClientReviewSchemaProps = {}) => {
  const baseUrl = getServerSideURL() || 'https://www.ubuntulogistics.co.ke'
  const orgName = props.agencySettings?.identity?.name || props.publisherName || 'Ubuntu Logistics'

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `${props.caseStudyUrl || baseUrl}#client-review`,
    itemReviewed: {
      '@type': 'Service',
      name: props.serviceRendered || 'Cargo & Logistics Services',
      provider: {
        '@id': `${baseUrl}/#organization`,
      },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(props.rating || '5'),
      bestRating: '5',
    },
    name: props.reviewTitle || 'Exceptional Cargo & Freight Logistics Service',
    author: personSchema({
      name: props.clientName || 'Satisfied Client',
      jobTitle: props.clientTitle || 'Client',
    }),

    reviewBody:
      props.reviewText ||
      'Ubuntu Logistics handled our cargo forwarding and customs clearance with extreme professionalism and speed across East Africa.',
    publisher: {
      '@type': 'Organization',
      name: orgName,
    },
  }
}

export const getClientReviewSchema = async (props: ClientReviewSchemaProps = {}) => {
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
      console.error('[SingleClientReview] Error fetching agency-settings:', err)
    }
  }
  return clientReviewSchema({ ...props, agencySettings })
}

export async function SingleClientReview(props: ClientReviewSchemaProps = {}) {
  const schemaObj = await getClientReviewSchema(props)

  if (!schemaObj) return null

  return (
    <script
      id="client-review-schema-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaObj),
      }}
    />
  )
}

export const ClientReviewSchema = SingleClientReview

export default SingleClientReview

