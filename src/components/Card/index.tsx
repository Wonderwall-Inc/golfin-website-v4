'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { usePathname } from 'next/navigation'

interface CardProps {
  alignItems?: 'center'
  className?: string
  doc?: Post
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}
interface ChildrenContent {
  mode: string
  text: string
  type: string
  style: string
  detail: number
  format: number
  version: number
}

const truncateContent = (text: string) => text.length >= 120 ? text.substring(0, 120) + '...' : text
const sanitizeDescription = (text: string) => text.replace(/\s/g, ' ')

export const Card: React.FC<CardProps> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, description, content, thumbnail } = doc || {}
  const { description: metaDescription, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const pathname = usePathname()
  const href = `${pathname}/${slug}`

  let postDescription

  const postChildren = content?.root.children[0].children as ChildrenContent[]

  if (!description && postChildren) postDescription = truncateContent(postChildren[0].text)
  if (description) postDescription = truncateContent(description)

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!thumbnail && <div className="">No image</div>}
        {thumbnail && <Media className="relative w-full" resource={thumbnail} fill size="360px" />}
      </div>
      <div className="p-4">
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {postDescription && <div className="mt-2">{<p>{sanitizeDescription(postDescription)}</p>}</div>}
      </div>
    </article>
  )
}
