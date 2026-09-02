import { getServerSideURL } from '@/utilities/getURL'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export interface VideoExplainerSchemaProps {
  name?: string
  description?: string
  videoUrl?: string
  embedUrl?: string
  thumbnailUrl?: string
  uploadDate?: string
  agencySettings?: any
  [key: string]: any
}

export const videoExplainerSchema = (props: VideoExplainerSchemaProps = {}) => {
  const baseUrl = getServerSideURL() || 'https://www.ubuntulogistics.co.ke'
  const orgName = props.agencySettings?.identity?.name || 'Ubuntu Logistics'

  const videoUrl = props.videoUrl || baseUrl
  const embedUrl = props.embedUrl || 'https://youtube.com'
  const thumbnail = props.thumbnailUrl || `${baseUrl}/assets/video-thumbnail.jpg`

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${baseUrl}/#explainer-video`,
    name: props.name || `Our Logistics & Transport Operations | ${orgName} Nairobi`,
    description:
      props.description ||
      `A detailed look into how ${orgName} manages freight forwarding, cargo handling, and transport operations across Kenya and East Africa.`,
    thumbnailUrl: [thumbnail],
    uploadDate: props.uploadDate || '2026-01-15T08:00:00+03:00',
    contentUrl: videoUrl,
    embedUrl: embedUrl,
    publisher: {
      '@type': 'ProfessionalService',
      '@id': `${baseUrl}/#organization`,
    },
  }
}

export const getVideoExplainerSchema = async (props: VideoExplainerSchemaProps = {}) => {
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
      console.error('[VideoExplainerSchema] Error fetching agency-settings:', err)
    }
  }
  return videoExplainerSchema({ ...props, agencySettings })
}

export async function VideoExplainerSchema(props: VideoExplainerSchemaProps = {}) {
  const schemaObj = await getVideoExplainerSchema(props)

  if (!schemaObj) return null

  return (
    <script
      id="video-explainer-schema-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaObj),
      }}
    />
  )
}

export default VideoExplainerSchema

