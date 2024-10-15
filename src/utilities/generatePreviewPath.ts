import { CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
 posts: 'news',
 pages: '',
}

type Props = {
 locale: 'en-us' | 'ja'
 collection: keyof typeof collectionPrefixMap
 slug: string
}

export const generatePreviewPath = ({ locale, collection, slug }: Props) => {
 const path = `/${locale}/${collectionPrefixMap[collection]}/${slug}`

 const params = {
  slug,
  collection,
  path,
 }

 const encodedParams = new URLSearchParams()

 Object.entries(params).forEach(([key, value]) => {
  encodedParams.append(key, value)
 })

 return `/next/preview?${encodedParams.toString()}`
}
