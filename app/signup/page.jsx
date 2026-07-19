import { GalleryVerticalEnd } from "lucide-react"
import { AuthForm } from "@/components/auth-form.jsx"

export default async function SignupPage({ searchParams }) {
  const params = await searchParams
  const error = params?.error ? decodeURIComponent(params.error) : null
  const message = params?.message ? decodeURIComponent(params.message) : null

  return (
    <div className="bg-[var(--muted)] flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-[var(--primary)] text-[var(--primary-foreground)] flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
         Arcfuse
        </a>
        <AuthForm error={error} message={message} initialMode="signup" />
      </div>
    </div>
  )
}
