'use server'

import { redirect } from 'next/navigation'
import { signIn } from "@/auth"

export async function loginWithGithub() {
  try {
    await signIn("github", { redirectTo: "/dashboard" })
  } catch (error) {
    if (error.message && error.message.includes("NEXT_REDIRECT")) {
      throw error
    }
    redirect('/login?error=' + encodeURIComponent('Failed to sign in with GitHub'))
  }
}

export async function loginWithDiscord() {
  try {
    await signIn("discord", { redirectTo: "/dashboard" })
  } catch (error) {
    if (error.message && error.message.includes("NEXT_REDIRECT")) {
      throw error
    }
    redirect('/login?error=' + encodeURIComponent('Failed to sign in with Discord'))
  }
}
