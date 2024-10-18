import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    adapter: 's3',
    disableLocalStorage: true,
    staticDir: '/media',
    imageSizes: [
      {
        height: 200,
        width: 400,
        name: 'thumbnail',
        crop: 'center'
      },
      {
        height: 450,
        width: 900,
        name: 'thumbnail2x',
        crop: 'center'
      }
    ]
  }
}
