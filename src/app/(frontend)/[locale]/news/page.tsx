import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import { urlLocaleToLangCodeMap } from '@/constants/urlLocaleToLangCodeMap'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page({ params }) {
  const payload = await getPayloadHMR({ config: configPromise })

  const newsPosts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    locale: urlLocaleToLangCodeMap.get(params.locale),
    where: {
      'categories.title': {
        equals: 'News'
      }
    }
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>News</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={newsPosts.page}
          limit={12}
          totalDocs={newsPosts.totalDocs}
        />
      </div>

      <CollectionArchive posts={newsPosts.docs} />

      <div className="container">
        {newsPosts.totalPages > 1 && newsPosts.page && (
          <Pagination page={newsPosts.page} totalPages={newsPosts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
