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
import { revalidateDelete, revalidateService } from './hooks/revalidateServices'
import { FeatureCards } from '@/blocks/FeatureCards/config'
import { SmallFeatureCards } from '@/blocks/SmallFeatureCards/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { TitleBlock } from '@/blocks/TitleBlock/config'
import { FormBlock } from '@/blocks/Form/config'
import { FAQsBlock } from '@/blocks/FAQBlock/config'
import { PricingBlock } from '@/blocks/PricingBlock/config'
import { ReviewsBlock } from '@/blocks/ReviewsBlock/config'
import { About } from '@/blocks/AboutBlock/config'
import { CarouselBlock } from '@/blocks/CarouselBlock/config'
import { TeamBlock } from '@/blocks/TeamBlock/config'
import { ServiceArchiveBlock } from '@/blocks/ServiceArchiveBlock/config'
import { Archive } from '@/blocks/ArchiveBlock/config'
import { UsefulLinksBlock } from '@/blocks/UsefulLinksBlock/config'
import { DestinationArchiveBlock } from '@/blocks/DestinationArchiveBlock/config'
import { PricingArchiveBlock } from '@/blocks/PricingArchiveBlock/config'
import { FleetArchiveBlock } from '@/blocks/FleetArchiveBlock/config'
import { seoFields } from '@/fields/seo'

export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    title: true,
    subTitle: true,
    summary: true,
    slug: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'services',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'services',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'socialShareAction',
      type: 'ui', // Clean interactive custom UI block type
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/SocialShareButtonAdmin', // Links path directly to client component
        },
      },
    },

    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subTitle',
      type: 'text',
    },

    {
      name: 'icon',
      type: 'select',
      options: [
        {
          label: 'Icon 1',
          value: 'Icon1',
        },
        {
          label: 'Laptop',
          value: 'Laptop',
        },
        {
          label: 'Globe icon',
          value: 'Globe',
        },
        {
          label: 'shield icon',
          value: 'Shield',
        },
        {
          label: 'sparkles icon',
          value: 'Sparkles',
        },
        {
          label: 'Smartphone icon',
          value: 'Smartphone',
        },
        {
          label: 'Settings icon',
          value: 'Settings',
        },
        {
          label: 'Rocket icon',
          value: 'Rocket',
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Parent Category',
      admin: {
        description: 'Broad pillar (e.g. Corporate Transport, Safari & Tours, Airport Transfers, Private Hire).',
      },
    },
    {
      name: 'recommendedFleet',
      type: 'relationship',
      relationTo: 'fleet',
      hasMany: true,
      label: 'Recommended Fleet / Vehicles',
      admin: {
        description: 'Vehicles suitable or available for this service.',
      },
    },
    {
      name: 'popularDestinations',
      type: 'relationship',
      relationTo: 'destinations',
      hasMany: true,
      label: 'Popular Destinations / Routes for this Service',
      admin: {
        description: 'Key destinations associated with this service.',
      },
    },
    {
      name: 'summary',
      type: 'text',
      label: 'Short Summary',
    },
    {
      name: 'serviceHighlights',
      type: 'array',
      label: 'Key Service Inclusions / Highlights',
      fields: [
        {
          name: 'highlight',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., Dedicated 24/7 route dispatch & real-time GPS tracking',
          },
        },
      ],
    },

    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures, defaultFeatures }) => {
                  return [
                    ...rootFeatures,
                    ...defaultFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'] }),
                    BlocksFeature({
                      blocks: [
                        Banner,
                        MediaBlock,
                        Content,
                        FAQsBlock,
                        PricingBlock,
                        FeatureCards,
                        SmallFeatureCards,
                        CallToAction,
                        TitleBlock,
                        FormBlock,
                        ReviewsBlock,
                      ],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                About,
                CarouselBlock,
                FAQsBlock,
                PricingBlock,
                FeatureCards,
                TeamBlock,
                SmallFeatureCards,
                ServiceArchiveBlock,
                TitleBlock,
                ReviewsBlock,
                Banner,
                UsefulLinksBlock,
                DestinationArchiveBlock,
                PricingArchiveBlock,
                FleetArchiveBlock,
              ],
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
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
  hooks: {
    afterChange: [revalidateService],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
