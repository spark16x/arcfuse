"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { loginWithGithub, loginWithDiscord } from "@/app/login/actions"
import { Github, ShieldAlert, CheckCircle2 } from "lucide-react"

function Discord(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="12" r="1" />
      <circle cx="15" cy="12" r="1" />
      <path d="M7.5 16.5c3.5 1 5.5 1 9 0" />
      <path d="M7 3.338A9.954 9.954 0 0 1 12 2c2.69 0 5.132 1.048 6.96 2.766M5.845 5.845A9.946 9.946 0 0 0 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-1.879-.517-3.636-1.408-5.115" />
    </svg>
  )
}

export function AuthForm({
  className,
  error,
  message,
  initialMode = "login",
  ...props
}) {
  const [mode, setMode] = useState(initialMode) // "login" | "signup"

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border border-[var(--border)] dark:border-white/10 bg-white/75 dark:bg-black/40 backdrop-blur-xl shadow-2xl relative overflow-hidden group rounded-2xl">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[var(--primary)]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[var(--primary)]/20 transition-colors duration-500" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[var(--primary)]/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Unified Tabs Switcher */}
        <div className="flex border-b border-[var(--border)] dark:border-white/10">
          <button
            onClick={() => setMode("login")}
            className={cn(
              "flex-1 py-3 text-sm font-semibold transition-all border-b-2 cursor-pointer",
              mode === "login"
                ? "border-[var(--primary)] text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("signup")}
            className={cn(
              "flex-1 py-3 text-sm font-semibold transition-all border-b-2 cursor-pointer",
              mode === "signup"
                ? "border-[var(--primary)] text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Create Account
          </button>
        </div>

        <CardHeader className="text-center pb-2 pt-6">
          <CardTitle className="text-2xl font-bold tracking-tight transition-all duration-300">
            {mode === "login" ? "Welcome back" : "Get started with Arcfuse"}
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm mt-1 max-w-[320px] mx-auto transition-all duration-300">
            {mode === "login"
              ? "Connect your accounts to access your unified development workspace."
              : "Choose your preferred developer platform to register and set up your workspace."}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-4">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2.5 text-xs text-red-600 dark:text-red-400">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start gap-2.5 text-xs text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{message}</span>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <form action={loginWithGithub}>
              <Button 
                variant="outline" 
                type="submit" 
                className="w-full border-neutral-300 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300 transform hover:scale-[1.02] shadow-sm flex items-center justify-center gap-2 h-11 rounded-xl cursor-pointer"
              >
                <Github className="h-4 w-4" />
                {mode === "login" ? "Continue with GitHub" : "Sign up with GitHub"}
              </Button>
            </form>
            <form action={loginWithDiscord}>
              <Button 
                variant="outline" 
                type="submit" 
                className="w-full border-neutral-300 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300 transform hover:scale-[1.02] shadow-sm flex items-center justify-center gap-2 h-11 rounded-xl cursor-pointer"
              >
                <Discord className="h-4 w-4 fill-current text-[#5865F2]" />
                {mode === "login" ? "Continue with Discord" : "Sign up with Discord"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
      
      <p className="px-6 text-center text-xs text-muted-foreground leading-normal">
        {mode === "login" ? (
          <>
            Don't have an account?{" "}
            <button
              onClick={() => setMode("signup")}
              className="underline text-[var(--primary)] hover:text-foreground transition-colors font-medium cursor-pointer"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              className="underline text-[var(--primary)] hover:text-foreground transition-colors font-medium cursor-pointer"
            >
              Sign in
            </button>
          </>
        )}
      </p>

      <p className="px-6 text-center text-xs text-muted-foreground leading-normal -mt-4">
        By connecting, you agree to our <a href="#" className="underline hover:text-foreground transition-colors">Terms of Service</a> and <a href="#" className="underline hover:text-foreground transition-colors">Privacy Policy</a>.
      </p>
    </div>
  )
}
