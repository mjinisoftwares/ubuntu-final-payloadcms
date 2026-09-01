import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { seoFields } from '@/fields/seo'
import { slugField } from 'payload'

export const Pricing: CollectionConfig = {
  slug: 'pricing',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'pricingType', 'destination', 'fleet', 'priceKES', 'billingUnit'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Pricing Plan / Route Package Title',
      admin: {
        placeholder: 'e.g., Safari Land Cruiser to Maasai Mara (Round Trip Rate)',
      },
    },
    {
      name: 'pricingType',
      type: 'select',
      required: true,
      defaultValue: 'route_transfer',
      options: [
        { label: 'Route & Destination Transfer Rate', value: 'route_transfer' },
        { label: 'Fleet Vehicle Daily Hire Rate', value: 'fleet_day_rate' },
        { label: 'Service Plan / Corporate Package', value: 'service_package' },
        { label: 'Hourly / City Disposal Rate', value: 'hourly_hire' },
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
          admin: {
            width: '33%',
            description: 'Link to a specific service offering (optional).',
          },
        },
        {
          name: 'fleet',
          type: 'relationship',
          relationTo: 'fleet',
          hasMany: false,
          admin: {
            width: '33%',
            description: 'Vehicle assigned for this price.',
          },
        },
        {
          name: 'destination',
          type: 'relationship',
          relationTo: 'destinations',
          hasMany: false,
          admin: {
            width: '33%',
            description: 'Destination or route destination for this rate.',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'origin',
          type: 'text',
          defaultValue: 'Nairobi',
          label: 'Departure / Origin City',
          admin: {
            width: '33%',
          },
        },
        {
          name: 'priceKES',
          type: 'number',
          required: true,
          label: 'Price in Kenyan Shilling (KES)',
          admin: {
            width: '33%',
            placeholder: 'e.g., 28000',
          },
        },
        {
          name: 'priceUSD',
          type: 'number',
          label: 'Price in US Dollar (USD)',
          admin: {
            width: '33%',
            placeholder: 'e.g., 220',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'billingUnit',
          type: 'select',
          required: true,
          defaultValue: 'per_day',
          options: [
            { label: 'Per Day (Inclusive of Driver/Guide)', value: 'per_day' },
            { label: 'One-Way Transfer / Drop-off', value: 'per_trip_one_way' },
            { label: 'Round-Trip / Multi-Day Safari Package', value: 'round_trip' },
            { label: 'Per Person / Seat', value: 'per_person' },
            { label: 'Per Month (Corporate Contract)', value: 'per_month' },
            { label: 'Per Hour (Minimum 4 Hours)', value: 'per_hour' },
          ],
          admin: {
            width: '50%',
          },
        },
        {
          name: 'isPopular',
          type: 'checkbox',
          label: 'Highlight as Most Popular / Recommended Rate',
          defaultValue: false,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'inclusions',
      type: 'array',
      label: 'Standard Inclusions',
      fields: [
        {
          name: 'inclusion',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., Professional English-speaking Driver/Guide & Vehicle Fuel',
          },
        },
      ],
    },
    {
      name: 'exclusions',
      type: 'array',
      label: 'Exclusions (What is Not Included)',
      fields: [
        {
          name: 'exclusion',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., Park entrance fees & personal gratuities',
          },
        },
      ],
    },
    {
      name: 'termsAndConditions',
      type: 'textarea',
      label: 'Special Notes & Terms',
      admin: {
        placeholder: 'e.g., Minimum 2 days booking for Maasai Mara safari during high season.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      fields: seoFields,
    },
    slugField(),
  ],
}
