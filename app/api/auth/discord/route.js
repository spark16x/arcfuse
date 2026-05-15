import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()

  // We use headers to get the origin for redirect URL
  const headersList = await headers()
  const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${origin}/auth/callback`,
      // "all permission to control user chats" implies scopes for reading and sending messages
      scopes: 'messages.read'
    },
  })

  if (data.url) {
    return NextResponse.redirect(data.url)
  }

  return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`)
}
