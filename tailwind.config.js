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
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#000000", // Deep black background for premium feel
        foreground: "#FAFAFA",

        // Brand/Accent (Cyan Blue / Electric Blue)
        primary: "#00E5FF",
        "primary-hover": "#00B8D4",
        "primary-glow": "rgba(0, 229, 255, 0.5)",

        // Surfaces (Layered, glassmorphic dark navy/grays)
        "surface-100": "#0A0A0A", // Very dark grey/navy
        "surface-200": "#121212",
        "surface-300": "#1E1E1E",
        "surface-400": "#2C2C2C",

        "glass-100": "rgba(255, 255, 255, 0.03)",
        "glass-200": "rgba(255, 255, 255, 0.05)",
        "glass-300": "rgba(255, 255, 255, 0.08)",
        "glass-border": "rgba(255, 255, 255, 0.1)",

        // Retaining essential mapped colors to avoid breaking existing generic classes
        "surface-container-lowest": "#000000",
        "surface-dim": "#0A0A0A",
        "surface": "#121212",
        "surface-bright": "#1E1E1E",
        "surface-variant": "#2C2C2C",
        "on-surface": "#FAFAFA",
        "on-surface-variant": "#A1A1AA",
        "outline": "rgba(255, 255, 255, 0.1)",
        "outline-variant": "rgba(255, 255, 255, 0.05)",

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#27272A",
          foreground: "#A1A1AA",
        },
        accent: {
          DEFAULT: "rgba(0, 229, 255, 0.1)",
          foreground: "#00E5FF",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #00000000 0deg, #00E5FF20 180deg, #00000000 360deg)',
        'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'glow-primary': '0 0 20px rgba(0, 229, 255, 0.3)',
        'glow-primary-lg': '0 0 40px rgba(0, 229, 255, 0.2)',
        'soft': '0 10px 40px -10px rgba(0,0,0,0.5)',
      },
      borderRadius: {
        lg: "0.75rem",
        md: "calc(0.75rem - 2px)",
        sm: "calc(0.75rem - 4px)",
        xl: "1rem",
        '2xl': "1.5rem",
        '3xl': "2rem",
        full: "9999px"
      },
      fontFamily: {
        headline: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"]
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
        "pulse-glow": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
