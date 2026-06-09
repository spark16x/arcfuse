import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // If "next" is in param, use it as the redirect URL, defaulting to /dashboard
  const next = searchParams.get('next') ?? '/dashboard'

  // Sanitize next to prevent open redirect vulnerabilities
  let safeNext = next
  try {
    // If it's a full URL, only extract pathname + search query
    const parsedUrl = new URL(next)
    safeNext = parsedUrl.pathname + parsedUrl.search
  } catch (e) {
    // Next is already a relative path
  }

  // Ensure it starts with a single '/' and not '//' to prevent protocol-relative redirects
  if (!safeNext.startsWith('/')) {
    safeNext = '/' + safeNext
  }
  const finalSafeNext = safeNext.replace(/^\/+/, '/')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const forwardedProto = request.headers.get('x-forwarded-proto') || 'https'
      const redirectUrl = forwardedHost 
        ? `${forwardedProto}://${forwardedHost}${finalSafeNext}`
        : `${origin}${finalSafeNext}`
      return NextResponse.redirect(redirectUrl)
    }
  }

  // return the user to the login page with an error parameter
  return NextResponse.redirect(`${origin}/login?error=Could not exchange authentication code for session`)
}
