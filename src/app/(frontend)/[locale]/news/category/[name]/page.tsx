
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'

export default async function Page({ params: { locale, name } }) {
  const payload = await getPayloadHMR({ config: configPromise })

  const newsPosts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    locale: locale === 'en-us' ? 'en' : 'ja',
    where: {
      category: name
    }
  })

  return (
    <article className="pt-16 pb-24">
      Localized Root Page for category {name}
      {newsPosts.docs.map(post => (
        <React.Fragment key={post.id}>
          {post.title}
        </React.Fragment>
      ))}
    </article>
  )
}
