import type { Payload, PayloadRequest, File } from 'payload'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const seedAllData = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<Record<string, any>> => {
  payload.logger.info('🚀 Starting complete Ubuntu Logistics database seeding...')

  // Load the perfected seed dataset
  const jsonPath = path.resolve(process.cwd(), 'payload-seed-all-collections.json')
  const seedData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))

  const summary: Record<string, number> = {
    categories: 0,
    fleet: 0,
    destinations: 0,
    services: 0,
    pricing: 0,
    faqs: 0,
  }

  // 1. Create Media Items for Featured Images
  payload.logger.info('📸 Seeding media assets...')
  let mediaDocId: number | string | null = null

  try {
    const existingMedia = await payload.find({
      collection: 'media',
      limit: 1,
      req,
    })

    if (existingMedia.docs.length > 0) {
      mediaDocId = existingMedia.docs[0].id
    } else {
      // Use local seed webp image
      const imageHeroPath = path.resolve(dirname, 'image-hero1.webp')
      let imageBuffer: Buffer

      if (fs.existsSync(imageHeroPath)) {
        imageBuffer = fs.readFileSync(imageHeroPath)
      } else {
        imageBuffer = Buffer.from(
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
          'base64',
        )
      }

      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: 'Ubuntu Logistics Kenya Transport and Safari',
        },
        file: {
          name: 'ubuntu-logistics-hero.webp',
          data: imageBuffer,
          mimetype: 'image/webp',
          size: imageBuffer.length,
        },
        req,
      })
      mediaDocId = mediaDoc.id
    }
  } catch (err: any) {
    payload.logger.warn(`Media seeding notice: ${err.message}`)
  }

  // 2. Seed Categories
  payload.logger.info('📂 Seeding Categories...')
  const categoryMap: Record<string, number | string> = {}

  for (const cat of seedData.categories) {
    try {
      const existing = await payload.find({
        collection: 'categories',
        where: { slug: { equals: cat.slug } },
        limit: 1,
        req,
      })

      if (existing.docs.length > 0) {
        categoryMap[cat.slug] = existing.docs[0].id
        await payload.update({
          collection: 'categories',
          id: existing.docs[0].id,
          data: {
            title: cat.title,
            description: cat.description,
            ...(mediaDocId ? { featuredImage: mediaDocId } : {}),
          },
          req,
        })
      } else {
        const created = await payload.create({
          collection: 'categories',
          data: {
            title: cat.title,
            slug: cat.slug,
            description: cat.description,
            ...(mediaDocId ? { featuredImage: mediaDocId } : {}),
          },
          req,
        })
        categoryMap[cat.slug] = created.id
      }
      summary.categories++
    } catch (err: any) {
      payload.logger.error(`Error seeding category ${cat.slug}: ${err.message}`)
    }
  }

  // 3. Seed Fleet
  payload.logger.info('🚐 Seeding Fleet Vehicles...')
  const fleetMap: Record<string, number | string> = {}

  for (const vehicle of seedData.fleet) {
    try {
      const existing = await payload.find({
        collection: 'fleet',
        where: { slug: { equals: vehicle.slug } },
        limit: 1,
        req,
      })

      const vehicleData: any = {
        title: vehicle.title,
        slug: vehicle.slug,
        subTitle: vehicle.subTitle,
        vehicleType: vehicle.vehicleType,
        summary: vehicle.summary,
        passengerCapacity: vehicle.passengerCapacity,
        luggageCapacity: vehicle.luggageCapacity,
        baseDayRateKES: vehicle.baseDayRateKES,
        baseDayRateUSD: vehicle.baseDayRateUSD,
        specifications: vehicle.specifications,
        idealFor: vehicle.idealFor,
        featuresList: vehicle.featuresList,
        content: vehicle.content,
        meta: vehicle.meta,
        _status: 'published',
        publishedAt: new Date().toISOString(),
        ...(mediaDocId ? { featuredImage: mediaDocId } : {}),
      }

      if (existing.docs.length > 0) {
        fleetMap[vehicle.slug] = existing.docs[0].id
        await payload.update({
          collection: 'fleet',
          id: existing.docs[0].id,
          data: vehicleData,
          req,
        })
      } else {
        const created = await payload.create({
          collection: 'fleet',
          data: vehicleData,
          req,
        })
        fleetMap[vehicle.slug] = created.id
      }
      summary.fleet++
    } catch (err: any) {
      payload.logger.error(`Error seeding fleet ${vehicle.slug}: ${err.message}`)
    }
  }

  // 4. Seed Destinations
  payload.logger.info('📍 Seeding Destinations...')
  const destinationMap: Record<string, number | string> = {}

  for (const dest of seedData.destinations) {
    try {
      const existing = await payload.find({
        collection: 'destinations',
        where: { slug: { equals: dest.slug } },
        limit: 1,
        req,
      })

      const recommendedFleetIds = (dest.recommendedFleetSlugs || [])
        .map((s: string) => fleetMap[s])
        .filter(Boolean)

      const destinationData: any = {
        title: dest.title,
        slug: dest.slug,
        subTitle: dest.subTitle,
        region: dest.region,
        summary: dest.summary,
        distanceFromNairobiKm: dest.distanceFromNairobiKm,
        estimatedTravelTime: dest.estimatedTravelTime,
        roadCondition: dest.roadCondition,
        bestTimeToVisit: dest.bestTimeToVisit,
        highlights: dest.highlights,
        routeInfo: dest.routeInfo,
        recommendedFleet: recommendedFleetIds,
        content: dest.content,
        meta: dest.meta,
        _status: 'published',
        publishedAt: new Date().toISOString(),
        ...(mediaDocId ? { featuredImage: mediaDocId } : {}),
      }

      if (existing.docs.length > 0) {
        destinationMap[dest.slug] = existing.docs[0].id
        await payload.update({
          collection: 'destinations',
          id: existing.docs[0].id,
          data: destinationData,
          req,
        })
      } else {
        const created = await payload.create({
          collection: 'destinations',
          data: destinationData,
          req,
        })
        destinationMap[dest.slug] = created.id
      }
      summary.destinations++
    } catch (err: any) {
      payload.logger.error(`Error seeding destination ${dest.slug}: ${err.message}`)
    }
  }

  // 5. Seed Services
  payload.logger.info('🛠️ Seeding Services...')
  const serviceMap: Record<string, number | string> = {}

  for (const service of seedData.services) {
    try {
      const existing = await payload.find({
        collection: 'services',
        where: { slug: { equals: service.slug } },
        limit: 1,
        req,
      })

      const categoryId = categoryMap[service.categorySlug] || Object.values(categoryMap)[0]
      const recommendedFleetIds = (service.recommendedFleetSlugs || [])
        .map((s: string) => fleetMap[s])
        .filter(Boolean)
      const popularDestinationIds = (service.popularDestinationSlugs || [])
        .map((s: string) => destinationMap[s])
        .filter(Boolean)

      const serviceData: any = {
        title: service.title,
        slug: service.slug,
        subTitle: service.subTitle,
        icon: service.icon,
        category: categoryId,
        recommendedFleet: recommendedFleetIds,
        popularDestinations: popularDestinationIds,
        summary: service.summary,
        serviceHighlights: service.serviceHighlights,
        content: service.content,
        meta: service.meta,
        _status: 'published',
        publishedAt: new Date().toISOString(),
        ...(mediaDocId ? { heroImage: mediaDocId } : {}),
      }

      if (existing.docs.length > 0) {
        serviceMap[service.slug] = existing.docs[0].id
        await payload.update({
          collection: 'services',
          id: existing.docs[0].id,
          data: serviceData,
          req,
        })
      } else {
        const created = await payload.create({
          collection: 'services',
          data: serviceData,
          req,
        })
        serviceMap[service.slug] = created.id
      }
      summary.services++
    } catch (err: any) {
      payload.logger.error(`Error seeding service ${service.slug}: ${err.message}`)
    }
  }

  // 6. Seed Pricing
  payload.logger.info('💵 Seeding Pricing Packages...')
  for (const pr of seedData.pricing) {
    try {
      const existing = await payload.find({
        collection: 'pricing',
        where: { slug: { equals: pr.slug } },
        limit: 1,
        req,
      })

      const pricingData: any = {
        title: pr.title,
        slug: pr.slug,
        pricingType: pr.pricingType,
        service: pr.serviceSlug ? serviceMap[pr.serviceSlug] : undefined,
        fleet: pr.fleetSlug ? fleetMap[pr.fleetSlug] : undefined,
        destination: pr.destinationSlug ? destinationMap[pr.destinationSlug] : undefined,
        origin: pr.origin || 'Nairobi',
        priceKES: pr.priceKES,
        priceUSD: pr.priceUSD,
        billingUnit: pr.billingUnit,
        isPopular: pr.isPopular || false,
        inclusions: pr.inclusions,
        exclusions: pr.exclusions,
        termsAndConditions: pr.termsAndConditions,
        _status: 'published',
        publishedAt: new Date().toISOString(),
      }

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'pricing',
          id: existing.docs[0].id,
          data: pricingData,
          req,
        })
      } else {
        await payload.create({
          collection: 'pricing',
          data: pricingData,
          req,
        })
      }
      summary.pricing++
    } catch (err: any) {
      payload.logger.error(`Error seeding pricing ${pr.slug}: ${err.message}`)
    }
  }

  // 7. Seed FAQs
  payload.logger.info('❓ Seeding FAQs...')
  for (const faq of seedData.faqs) {
    try {
      const existing = await payload.find({
        collection: 'faqs',
        where: { question: { equals: faq.question } },
        limit: 1,
        req,
      })

      const faqData: any = {
        question: faq.question,
        faqType: faq.faqType,
        service: faq.serviceSlug ? serviceMap[faq.serviceSlug] : undefined,
        fleet: faq.fleetSlug ? fleetMap[faq.fleetSlug] : undefined,
        destination: faq.destinationSlug ? destinationMap[faq.destinationSlug] : undefined,
        answer: faq.answer,
        isFeatured: faq.isFeatured || false,
      }

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'faqs',
          id: existing.docs[0].id,
          data: faqData,
          req,
        })
      } else {
        await payload.create({
          collection: 'faqs',
          data: faqData,
          req,
        })
      }
      summary.faqs++
    } catch (err: any) {
      payload.logger.error(`Error seeding FAQ ${faq.question}: ${err.message}`)
    }
  }

  payload.logger.info('🎉 Database seeding completed successfully!')
  return summary
}
