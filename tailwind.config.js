/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "#E5E7EB",
        input: "#E5E7EB",
        ring: "#4F46E5",
        background: "#FFFFFF",
        foreground: "#111827",

        primary: {
          DEFAULT: "#4F46E5",
          hover: "#4338CA",
          soft: "#EEF2FF",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#EEF2FF",
          foreground: "#4F46E5",
        },
        success: "#10B981",
        warning: "#F59E0B",

        "section-bg": "#F8FAFC",
        "card-bg": "#FFFFFF",
        "code-bg": "#F3F4F6",

        "text-primary": "#111827",
        "text-secondary": "#6B7280",
        "text-muted": "#9CA3AF",

        // Retaining generic variables for compatibility with existing shadcn/ui components if any
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#F3F4F6",
          foreground: "#9CA3AF",
        },
        accent: {
          DEFAULT: "#EEF2FF",
          foreground: "#4F46E5",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827",
        },

        // Retaining essential mapped colors to avoid breaking existing generic classes
        "surface-container-lowest": "#FFFFFF",
        "surface-dim": "#F8FAFC",
        "surface": "#FFFFFF",
        "surface-bright": "#FFFFFF",
        "surface-variant": "#F3F4F6",
        "on-surface": "#111827",
        "on-surface-variant": "#6B7280",
        "outline": "#E5E7EB",
        "outline-variant": "#E5E7EB",
        "primary-container": "#EEF2FF",
        "on-primary-container": "#4F46E5",
        "on-primary": "#FFFFFF",
      },
      spacing: {
        'section-desktop': '96px',
        'section-tablet': '72px',
        'section-mobile': '56px',
      },
      maxWidth: {
        'content': '720px',
        'container-main': '1280px',
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'card': '20px',
      },
      fontFamily: {
        sans: ["Geist", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        'display-mobile': ['36px', { lineHeight: '1.2', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-tablet': ['44px', { lineHeight: '1.2', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-desktop': ['56px', { lineHeight: '1.2', letterSpacing: '-0.04em', fontWeight: '700' }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries")
  ],
}
export default config;
