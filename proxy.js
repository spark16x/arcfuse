import { auth } from "@/auth"

export async function proxy(request) {
  const session = await auth()
  const isLoggedIn = !!session
  
  const nextUrl = request.nextUrl
  const isOnDashboard = nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/onboarding')
  const isOnAuth = nextUrl.pathname === '/login' || nextUrl.pathname === '/signup'

  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL('/login', nextUrl))
  }
  if (isOnAuth && isLoggedIn) {
    return Response.redirect(new URL('/dashboard', nextUrl))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
