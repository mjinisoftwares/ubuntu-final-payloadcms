import { createLocalReq, getPayload } from 'payload'
import { seedAllData } from '@/endpoints/seed/seed-all-data'
import config from '@payload-config'

export const maxDuration = 120 // Allow up to 2 minutes for complete seeding

export async function GET(): Promise<Response> {
  try {
    const payload = await getPayload({ config })
    const payloadReq = await createLocalReq({}, payload)

    const summary = await seedAllData({ payload, req: payloadReq })

    return Response.json({
      success: true,
      message: 'All collections seeded successfully into Payload CMS!',
      summary,
    })
  } catch (error: any) {
    console.error('Seed API error:', error)
    return Response.json(
      {
        success: false,
        error: error?.message || 'Error seeding database',
      },
      { status: 500 },
    )
  }
}

export async function POST(): Promise<Response> {
  return GET()
}
