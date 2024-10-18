import { NextRequest, NextResponse } from "next/server"
import acceptLanguage from "accept-language"

export function middleware(request: NextRequest): NextResponse<unknown> {
  const pathname = request.nextUrl.pathname
  acceptLanguage.languages(['ja', 'en-US'])
  const browserLanguage = acceptLanguage.get(request.headers.get('accept-language'))
  const url = request.nextUrl.clone()

  if (pathname === '/') {
    url.pathname = browserLanguage === '/ja' ? '/ja-jp' : '/en-us'
    return NextResponse.redirect(new URL(url.pathname, request.url))
  }

  if (pathname === '/en') {
    return NextResponse.redirect(new URL(`/en-us`, request.url))
  }

  if (pathname === '/news') {
    url.pathname = browserLanguage === '/ja' ? '/ja-jp/news' : '/en-us/news'
    return NextResponse.redirect(new URL(url.pathname, request.url))
  }

  if (pathname === '/app') {
    url.pathname = browserLanguage === '/ja' ? '/ja-jp/app' : '/en-us/app'
    return NextResponse.redirect(new URL(url.pathname, request.url))
  }

  return NextResponse.next()
}