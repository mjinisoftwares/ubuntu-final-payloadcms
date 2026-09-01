// PricingBlock.ts
import type { Block } from 'payload'

export const PricingBlock: Block = {
  slug: 'pricingBlock',
  interfaceName: 'PricingBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', label: 'Main Section Title' },
            { name: 'subTitle', type: 'text', label: 'Section Subtitle' },
            { name: 'description', type: 'textarea', label: 'General Section Description' },
          ],
        },
        {
          label: 'Data Selection',
          fields: [
            {
              name: 'populateBy',
              type: 'select',
              defaultValue: 'dynamic',
              options: [
                { label: 'Dynamic Filter (Service / Fleet / Destination)', value: 'dynamic' },
                { label: 'Manual Individual Selection', value: 'selection' },
              ],
            },
            {
              name: 'service',
              type: 'relationship',
              relationTo: 'services',
              hasMany: false,
              admin: {
                condition: (_, siblingData) => siblingData?.populateBy === 'dynamic',
                description: 'Filter rates tied to this service.',
              },
            },
            {
              name: 'fleet',
              type: 'relationship',
              relationTo: 'fleet',
              hasMany: false,
              admin: {
                condition: (_, siblingData) => siblingData?.populateBy === 'dynamic',
                description: 'Filter rates tied to this vehicle.',
              },
            },
            {
              name: 'destination',
              type: 'relationship',
              relationTo: 'destinations',
              hasMany: false,
              admin: {
                condition: (_, siblingData) => siblingData?.populateBy === 'dynamic',
                description: 'Filter rates tied to this destination.',
              },
            },
            {
              name: 'limit',
              type: 'number',
              defaultValue: 6,
              admin: {
                condition: (_, siblingData) => siblingData?.populateBy === 'dynamic',
              },
              label: 'Maximum Plans To Display',
            },
            {
              name: 'selectedDocs',
              type: 'relationship',
              relationTo: 'pricing',
              hasMany: true,
              label: 'Selected Pricing Tiers',
              admin: {
                condition: (_, siblingData) => siblingData?.populateBy === 'selection',
              },
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Pricing Blocks',
    singular: 'Pricing Block',
  },
}
