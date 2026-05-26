'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

// Simple validation to ensure inputs are strings and within reasonable length bounds
function validateAuthInputs(email, password, isLogin = false) {
  if (typeof email !== 'string' || typeof password !== 'string') {
    return false;
  }
  if (email.length < 3 || email.length > 254) {
    return false;
  }
  // Enforce min length only on signup to avoid locking out existing users
  // with legacy passwords that might be shorter.
  if (password.length > 128 || (!isLogin && password.length < 8)) {
    return false;
  }
  return true;
}

export async function login(formData) {
  const supabase = await createClient()

  const email = formData.get('email')
  const password = formData.get('password')

  if (!validateAuthInputs(email, password, true)) {
    redirect('/login?error=Invalid input provided')
  }

  const data = { email, password }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?error=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData) {
  const supabase = await createClient()

  const email = formData.get('email')
  const password = formData.get('password')

  if (!validateAuthInputs(email, password, false)) {
    redirect('/signup?error=Invalid input provided')
  }

  const data = { email, password }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/signup?error=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function loginWithGithub() {
  const supabase = await createClient()

  // We use headers to get the origin for redirect URL
  const { headers } = await import('next/headers')
  const headersList = await headers()
  const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (data.url) {
    redirect(data.url)
  }
}

export async function loginWithDiscord() {
  const supabase = await createClient()

  // We use headers to get the origin for redirect URL
  const { headers } = await import('next/headers')
  const headersList = await headers()
  const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (data.url) {
    redirect(data.url)
  }
}
