import { NextRequest, NextResponse } from "next/server"
import acceptLanguage from "accept-language"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  acceptLanguage.languages(['ja', 'en-US'])
  const browserLanguage = acceptLanguage.get(request.headers.get('accept-language'))
  const url = request.nextUrl.clone()

  if (pathname === '/') {
    url.pathname = browserLanguage === '/ja' ? '/ja-jp' : '/en-us'
    NextResponse.redirect(new URL(url.pathname, request.url))
  }

  if (pathname === '/en') {
    NextResponse.redirect(new URL(`/en-us`, request.url))
  }

  return NextResponse.next()
}