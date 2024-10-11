'use client'
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationSkip,
} from '@/components/ui/pagination'
import { cn } from '@/utilities/cn'
import { useRouter } from 'next/navigation'
import React from 'react'

export const Pagination: React.FC<{
  className?: string
  page: number
  totalPages: number,
  locale: string
}> = (props) => {
  const router = useRouter()

  const { className, page, totalPages, locale } = props
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  const isFirstPage = page === 1
  const isLastPage = page === totalPages


  return (
    <div className={cn('my-12', className)}>
      <PaginationComponent>
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst
              disabled={isFirstPage}
              onClick={() => {
                router.push(`/${locale}/news`)
              }}
            />
          </PaginationItem>

          {totalPages >= 3 && (
            <PaginationItem>
              <PaginationSkip
                direction="left"
                disabled={(page - 2) <= 0}
                onClick={() => {
                  if (page === 3) return router.push(`/${locale}/news`)

                  router.push(`/${locale}/news/page/${page - 2}`)
                }}
              />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationPrevious
              disabled={!hasPrevPage}
              onClick={() => {
                if (page === 2) return router.push(`/${locale}/news`)

                router.push(`/${locale}/news/page/${page - 1}`)
              }}
            />
          </PaginationItem>

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  router.push(`/${locale}/news/page/${page - 1}`)
                }}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              isActive
              onClick={() => {
                router.push(`/${locale}/news/page/${page}`)
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  router.push(`/${locale}/news/page/${page + 1}`)
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNextPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              disabled={!hasNextPage}
              onClick={() => {
                router.push(`/${locale}/news/page/${page + 1}`)
              }}
            />
          </PaginationItem>

          {totalPages >= 3 && (
            <PaginationItem>
              <PaginationSkip
                direction="right"
                disabled={(page + 2) > totalPages}
                onClick={() => {
                  router.push(`/${locale}/news/page/${page + 2}`)
                }}
              />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLast
              disabled={isLastPage || totalPages <= 2}
              onClick={() => {
                router.push(`/${locale}/news/page/${totalPages}`)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
