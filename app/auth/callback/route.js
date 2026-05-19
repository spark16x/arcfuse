import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  // Sanitize next to prevent open redirect vulnerabilities
  // Ensure it starts with a single slash and prevents protocol-relative URLs (e.g. //attacker.com)
  const safeNext = (next || '/').replace(/^[/\\]+/, '/')

  // Ensure the path actually starts with a slash after stripping (in case next was empty)
  const finalSafeNext = safeNext.startsWith('/') ? safeNext : '/' + safeNext

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${finalSafeNext}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${finalSafeNext}`)
      } else {
        return NextResponse.redirect(`${origin}${finalSafeNext}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
