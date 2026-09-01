import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { slugField } from 'payload'
import { Content } from '@/blocks/Content/config'
import { FeatureCards } from '@/blocks/FeatureCards/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { FAQsBlock } from '@/blocks/FAQBlock/config'
import { PricingBlock } from '@/blocks/PricingBlock/config'
import { ReviewsBlock } from '@/blocks/ReviewsBlock/config'
import { seoFields } from '@/fields/seo'

export const Fleet: CollectionConfig = {
  slug: 'fleet',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'vehicleType', 'passengerCapacity', 'baseDayRateKES', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'fleet',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'fleet',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Vehicle Name / Model',
      required: true,
      admin: {
        placeholder: 'e.g., Customized Safari Land Cruiser 4x4 (7-Seater)',
      },
    },
    {
      name: 'subTitle',
      type: 'text',
      label: 'Subtitle / Tagline',
      admin: {
        placeholder: 'e.g., The Ultimate Off-Road Vehicle for Kenyan Game Drives',
      },
    },
    {
      name: 'vehicleType',
      type: 'select',
      required: true,
      defaultValue: 'safari-land-cruiser',
      options: [
        { label: 'Safari Land Cruiser (4x4)', value: 'safari-land-cruiser' },
        { label: 'Safari Tour Van (HiAce 4x4)', value: 'safari-tour-van' },
        { label: 'Executive SUV (Prado / V8 / Mercedes)', value: 'executive-suv' },
        { label: 'Mini Bus / Coaster (22-33 Seater)', value: 'coaster-mini-bus' },
        { label: 'Large Tour Bus (34-50+ Seater)', value: 'large-bus' },
        { label: 'Passenger Shuttle / Voxy / Noah', value: 'van-shuttle' },
        { label: 'Executive Saloon / Sedan', value: 'saloon-car' },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Short Summary for Cards & Search',
      admin: {
        placeholder: 'Brief description of passenger comfort, vehicle capabilities, and best use cases.',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Primary Vehicle Image',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Vehicle Photo Gallery',
      labels: {
        singular: 'Photo',
        plural: 'Photos',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'passengerCapacity',
          type: 'number',
          label: 'Max Passengers (Seats)',
          required: true,
          defaultValue: 7,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'luggageCapacity',
          type: 'number',
          label: 'Luggage Capacity (Bags)',
          required: true,
          defaultValue: 5,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'baseDayRateKES',
          type: 'number',
          label: 'Base Daily Rate (KES)',
          required: true,
          admin: {
            width: '50%',
            placeholder: 'e.g., 25000',
            description: 'Daily hire rate with professional driver-guide in KES.',
          },
        },
        {
          name: 'baseDayRateUSD',
          type: 'number',
          label: 'Base Daily Rate (USD)',
          admin: {
            width: '50%',
            placeholder: 'e.g., 200',
            description: 'International tourist standard USD daily rate.',
          },
        },
      ],
    },
    {
      name: 'specifications',
      type: 'group',
      label: 'Vehicle Specifications & Amenities',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'is4WD',
              type: 'checkbox',
              label: '4x4 / All-Wheel Drive Capability',
              defaultValue: true,
              admin: { width: '33%' },
            },
            {
              name: 'hasPopUpRoof',
              type: 'checkbox',
              label: 'Pop-Up Game Viewing Roof',
              defaultValue: true,
              admin: { width: '33%' },
            },
            {
              name: 'hasAircon',
              type: 'checkbox',
              label: 'Air Conditioning (A/C)',
              defaultValue: true,
              admin: { width: '33%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'hasWifi',
              type: 'checkbox',
              label: 'Onboard High-Speed Wi-Fi',
              defaultValue: false,
              admin: { width: '25%' },
            },
            {
              name: 'hasChargingPorts',
              type: 'checkbox',
              label: 'USB / Inverter Power Charging Ports',
              defaultValue: true,
              admin: { width: '25%' },
            },
            {
              name: 'hasCoolerBox',
              type: 'checkbox',
              label: 'Cooler Box / Refrigerator',
              defaultValue: true,
              admin: { width: '25%' },
            },
            {
              name: 'hasRadioCommunication',
              type: 'checkbox',
              label: 'HF Safari Two-Way Radio',
              defaultValue: true,
              admin: { width: '25%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'transmission',
              type: 'select',
              label: 'Transmission',
              defaultValue: 'manual',
              options: [
                { label: 'Manual', value: 'manual' },
                { label: 'Automatic', value: 'automatic' },
              ],
              admin: { width: '50%' },
            },
            {
              name: 'fuelType',
              type: 'select',
              label: 'Fuel Type',
              defaultValue: 'diesel',
              options: [
                { label: 'Diesel', value: 'diesel' },
                { label: 'Petrol', value: 'petrol' },
                { label: 'Hybrid', value: 'hybrid' },
              ],
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
    {
      name: 'idealFor',
      type: 'select',
      hasMany: true,
      label: 'Recommended Use Cases',
      options: [
        { label: 'Safari & Game Drives (Rough Terrain)', value: 'safari-game-drives' },
        { label: 'Corporate & Conference Transport', value: 'corporate-transport' },
        { label: 'Airport & Inter-City Transfers', value: 'airport-transfers' },
        { label: 'VIP, Diplomatic & Executive Chauffeur', value: 'vip-executive' },
        { label: 'Weddings & Private Events', value: 'weddings-events' },
        { label: 'Long-Distance Inter-County Road Trips', value: 'inter-county' },
        { label: 'School & Church Group Excursions', value: 'group-excursions' },
      ],
    },
    {
      name: 'featuresList',
      type: 'array',
      label: 'Key Vehicle Features / Highlights',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., Extended chassis with individual window seats for all passengers',
          },
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Vehicle Overview & Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures, defaultFeatures }) => [
                  ...rootFeatures,
                  ...defaultFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                  BlocksFeature({
                    blocks: [Banner, MediaBlock, Content, FAQsBlock, PricingBlock, FeatureCards, CallToAction, ReviewsBlock],
                  }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                  HorizontalRuleFeature(),
                ],
              }),
              label: false,
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: seoFields,
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    slugField(),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
