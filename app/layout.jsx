import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Arcfuse",
  description: "Unify all your social platforms in one space.",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
<meta name="google-site-verification" content="7SnpTJD94MylkjVp3A2GY9wDF1Xhvs1yLkq_AH7nJxQ" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`bg-background text-on-background font-body selection:bg-primary-container/30 w-full min-h-screen ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
