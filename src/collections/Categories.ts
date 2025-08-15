import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'Categories',
  fields: [
    {
      name: 'categories',
      type: 'text',
      required: true,
    },
  ],
}
