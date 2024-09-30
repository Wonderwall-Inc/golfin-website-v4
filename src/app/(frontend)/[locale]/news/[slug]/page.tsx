
import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Page, Post } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const pages = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return pages.docs
    .map(({ slug }) => slug as string + 1)
}

export default async function Page({ params: { locale, slug = '' } }) {
  const url = '/' + slug

  let post: Post | null

  post = await queryNewsPostById({
    slug,
  })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-24">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />
      Single News Item Page
      {post.title}
    </article>
  )
}

export async function generateMetadata({ params: { slug = '' } }): Promise<Metadata> {
  const page = await queryNewsPostById({
    slug
  })

  return generateMeta({ doc: page })
}

const queryNewsPostById = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
