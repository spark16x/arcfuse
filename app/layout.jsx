import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";

export const metadata = {
  title: "Arcfuse - Open Source AI Discovery Platform",
  description: "Unify all your digital platforms in one developer-focused space.",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="7SnpTJD94MylkjVp3A2GY9wDF1Xhvs1yLkq_AH7nJxQ" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        {/* Geist and JetBrains Mono from Google Fonts as fallback/standard */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* Geist isn't natively on Google Fonts under that exact name usually, but Inter is a close sibling. Let's use Inter for base if Geist fails, or we can use the local Next font if it were working. */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-foreground font-sans selection:bg-primary/20 w-full min-h-screen" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
