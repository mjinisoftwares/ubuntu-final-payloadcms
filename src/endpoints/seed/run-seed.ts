import { resolve } from 'path'
import { createLocalReq, getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { seedAllData } from './seed-all-data'

async function run() {
  // Load .env before Payload initializes — works in Node 20.12+ (Node 24 included)
  const envPath = resolve(process.cwd(), '.env')
  try {
    // @ts-ignore
    process.loadEnvFile(envPath)
    console.log('✅ .env loaded from:', envPath)
  } catch (e: any) {
    // Fallback to dotenv if loadEnvFile unavailable
    const { config } = await import('dotenv')
    config({ path: envPath })
    console.log('✅ .env loaded via dotenv fallback')
  }

  console.log('🚀 Running Ubuntu Logistics seed script from CLI...')
  console.log('📦 PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? '✅ set' : '❌ missing')
  console.log('🗄️  DATABASE_URI:', process.env.DATABASE_URI ? '✅ set' : '❌ missing')

  try {
    const payload = await getPayload({ config: payloadConfig })
    const req = await createLocalReq({}, payload)
    const summary = await seedAllData({ payload, req })
    console.log('🎉 Seeding complete!')
    console.log('Summary:', summary)
    process.exit(0)
  } catch (err: any) {
    console.error('❌ Seeding error:', err.message || err)
    process.exit(1)
  }
}

run()
