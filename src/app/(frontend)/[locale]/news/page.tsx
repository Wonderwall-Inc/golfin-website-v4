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
    limit: 5,
    locale: urlLocaleToLangCodeMap.get((await params).locale),
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
          limit={newsPosts.totalPages}
          totalDocs={newsPosts.totalDocs}
        />
      </div>

      <CollectionArchive posts={newsPosts.docs} locale={(await params).locale} />

      <div className="container">
        {newsPosts.totalPages > 1 && newsPosts.page && (
          <Pagination page={Number(newsPosts.page)} totalPages={newsPosts.totalPages} locale={(await params).locale} />
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
