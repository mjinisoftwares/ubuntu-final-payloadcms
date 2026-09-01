import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import type { Field } from 'payload'

export const seoFields: Field[] = [
  OverviewField({
    titlePath: 'meta.title',
    descriptionPath: 'meta.description',
    imagePath: 'meta.image',
  }),
  MetaTitleField({
    hasGenerateFn: true,
  }),
  MetaImageField({
    relationTo: 'media',
  }),
  MetaDescriptionField({}),
  PreviewField({
    hasGenerateFn: true,
    titlePath: 'meta.title',
    descriptionPath: 'meta.description',
  }),
]
