import { resolve } from 'path'

async function run() {
  // ⚡ CRITICAL: Load environment variables FIRST before any imports that consume them
  const envPath = resolve(process.cwd(), '.env')

  // Try Node.js 20.12+ native env loading
  try {
    // @ts-ignore – process.loadEnvFile available in Node 20.12+
    process.loadEnvFile(envPath)
    console.log('✅ .env loaded (native) from:', envPath)
  } catch {
    // Fallback: use dotenv synchronously
    const { config } = await import('dotenv')
    const result = config({ path: envPath })
    if (result.error) {
      console.error('⚠️  dotenv fallback error:', result.error.message)
    } else {
      console.log('✅ .env loaded (dotenv) from:', envPath)
    }
  }

  // Alias DATABASE_URL → DATABASE_URI if Payload expects DATABASE_URI
  if (!process.env.DATABASE_URI && process.env.DATABASE_URL) {
    process.env.DATABASE_URI = process.env.DATABASE_URL
  }

  console.log('🚀 Running Ubuntu Logistics seed script from CLI...')
  console.log('📦 PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? '✅ set' : '❌ missing')
  console.log('🗄️  DATABASE_URL:', process.env.DATABASE_URL ? '✅ set' : '❌ missing')

  // ⚡ Dynamically import AFTER env vars are set so payload.config.ts reads them correctly
  const { createLocalReq, getPayload } = await import('payload')
  const { default: payloadConfig } = await import('@payload-config')
  const { seedAllData } = await import('./seed-all-data.js')

  try {
    const payload = await getPayload({ config: payloadConfig })
    const req = await createLocalReq({}, payload)
    const summary = await seedAllData({ payload, req })
    console.log('🎉 Seeding complete!')
    console.log('Summary:', summary)
    process.exit(0)
  } catch (err: any) {
    console.error('❌ Seeding error:', err.message || err)
    console.error(err)
    process.exit(1)
  }
}

run()
