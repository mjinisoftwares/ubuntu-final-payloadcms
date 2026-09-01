import { MediaBlock } from '@/blocks/MediaBlock/config'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { type CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'faqType', 'service', 'fleet', 'destination'],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Question',
      admin: {
        placeholder: 'e.g., Is fuel and the driver-guide included in the daily hire rate?',
      },
    },
    {
      name: 'faqType',
      type: 'select',
      required: true,
      defaultValue: 'general',
      label: 'Scope / Target Entity',
      options: [
        { label: 'General / Universal Transport FAQ', value: 'general' },
        { label: 'Specific Service FAQ', value: 'service' },
        { label: 'Specific Fleet Vehicle FAQ', value: 'fleet' },
        { label: 'Specific Destination / Route FAQ', value: 'destination' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          hasMany: false,
          label: 'Associated Service',
          admin: {
            width: '33%',
            condition: (_, siblingData) => siblingData?.faqType === 'service' || siblingData?.faqType === 'general',
            description: 'Link to a specific service.',
          },
        },
        {
          name: 'fleet',
          type: 'relationship',
          relationTo: 'fleet',
          hasMany: false,
          label: 'Associated Fleet Vehicle',
          admin: {
            width: '33%',
            condition: (_, siblingData) => siblingData?.faqType === 'fleet' || siblingData?.faqType === 'general',
            description: 'Link to a specific vehicle model.',
          },
        },
        {
          name: 'destination',
          type: 'relationship',
          relationTo: 'destinations',
          hasMany: false,
          label: 'Associated Destination',
          admin: {
            width: '33%',
            condition: (_, siblingData) => siblingData?.faqType === 'destination' || siblingData?.faqType === 'general',
            description: 'Link to a specific Kenyan park or city.',
          },
        },
      ],
    },
    {
      name: 'answer',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            BlocksFeature({ blocks: [MediaBlock] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
      admin: {
        description: 'Detailed answer for users and rich snippets for Search Engines (FAQ Schema).',
      },
      required: true,
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Display in Featured Top FAQ section',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
