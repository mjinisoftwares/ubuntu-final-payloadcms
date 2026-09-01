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
import { DestinationArchive } from '@/blocks/DestinationArchiveBlock/config'
import { seoFields } from '@/fields/seo'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'region', 'distanceFromNairobiKm', 'roadCondition', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'destinations',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'destinations',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Destination Name',
      required: true,
      admin: {
        placeholder: 'e.g., Maasai Mara National Reserve',
      },
    },
    {
      name: 'subTitle',
      type: 'text',
      label: 'Subtitle / Tagline',
      admin: {
        placeholder: 'e.g., World-Famous Wildlife Safari & Great Migration Destination',
      },
    },
    {
      name: 'region',
      type: 'select',
      required: true,
      defaultValue: 'rift-valley',
      options: [
        { label: 'Rift Valley (Mara, Naivasha, Nakuru, Baringo)', value: 'rift-valley' },
        { label: 'Coast (Mombasa, Diani, Watamu, Malindi, Kilifi)', value: 'coast' },
        { label: 'Central Kenya & Mt. Kenya (Nanyuki, Aberdares, Meru)', value: 'central-kenya' },
        { label: 'Nairobi Metro & Environs (JKIA, Wilson, Karen, Limuru)', value: 'nairobi-metro' },
        { label: 'Amboseli & Tsavo Ecosystem', value: 'amboseli-tsavo' },
        { label: 'Western & Lake Victoria (Kisumu, Kakamega, Kisii)', value: 'western-kenya' },
        { label: 'Northern Kenya (Samburu, Shaba, Lake Turkana)', value: 'northern-kenya' },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Short Summary for Cards & Search',
      admin: {
        placeholder: 'Brief summary of the route, attractions, and distance from Nairobi.',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Primary Destination Image',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Destination Photo Gallery',
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
          name: 'distanceFromNairobiKm',
          type: 'number',
          label: 'Distance from Nairobi (KM)',
          required: true,
          admin: {
            width: '50%',
            placeholder: 'e.g., 260',
          },
        },
        {
          name: 'estimatedTravelTime',
          type: 'text',
          label: 'Estimated Driving Time',
          required: true,
          admin: {
            width: '50%',
            placeholder: 'e.g., 5 - 6 Hours via Mai Mahiu & Narok',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'roadCondition',
          type: 'select',
          label: 'Road Condition & Terrain',
          required: true,
          defaultValue: 'mixed-highway-and-offroad',
          options: [
            { label: 'All-Weather Smooth Tarmac (2WD & Buses Suitable)', value: 'all-weather-tarmac' },
            { label: 'Mixed Highway & Off-Road / Murram (4x4 or High Clearance Recommended)', value: 'mixed-highway-and-offroad' },
            { label: 'Rough Terrain / Game Reserve Tracks (Strictly 4x4 Required)', value: 'rough-terrain-4x4-required' },
          ],
          admin: {
            width: '50%',
          },
        },
        {
          name: 'bestTimeToVisit',
          type: 'text',
          label: 'Best Time to Visit / Peak Season',
          admin: {
            width: '50%',
            placeholder: 'e.g., July to October (Migration), Dec to March (Dry Season)',
          },
        },
      ],
    },
    {
      name: 'recommendedFleet',
      type: 'relationship',
      relationTo: 'fleet',
      hasMany: true,
      label: 'Recommended Fleet / Vehicles for this Route',
      admin: {
        description: 'Select the vehicle types best suited for this road terrain and distance.',
      },
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Key Attractions & Activities',
      fields: [
        {
          name: 'highlight',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., Wildebeest Migration crossing at Mara River',
          },
        },
      ],
    },
    {
      name: 'routeInfo',
      type: 'group',
      label: 'Route & Logistics Guide',
      fields: [
        {
          name: 'startingPoint',
          type: 'text',
          defaultValue: 'Nairobi (CBD, JKIA, or Hotel Pickup)',
          label: 'Standard Starting Point',
        },
        {
          name: 'recommendedStops',
          type: 'text',
          label: 'Popular En-route Stopovers',
          admin: {
            placeholder: 'e.g., Great Rift Valley Viewpoint, Narok Town (fuel & snacks)',
          },
        },
        {
          name: 'entryFeesNotes',
          type: 'textarea',
          label: 'Park / Gate Entry Fees & Permits Guide',
          admin: {
            placeholder: 'Guidelines for park entry fees, driver entry, vehicle permit charges.',
          },
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Destination Guide Content',
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
                    blocks: [Banner, MediaBlock, Content, FAQsBlock, PricingBlock, FeatureCards, CallToAction, ReviewsBlock, DestinationArchive],
                  }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                  HorizontalRuleFeature(),
                ],
              }),
              label: false,
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                FAQsBlock,
                PricingBlock,
                FeatureCards,
                ReviewsBlock,
                Banner,
                DestinationArchive,
              ],
              admin: {
                initCollapsed: true,
              },
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
