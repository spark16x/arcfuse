## 2024-05-27 - [Migrate to `next/font`]
**Learning:** External fonts loaded via standard `<link>` tags in the root layout can cause render-blocking performance issues, layout shift, and an extra network roundtrip. Next.js has built-in `next/font` for optimizing external fonts.
**Action:** Replace external fonts loaded in `<head>` with `next/font` for improved initial load performance and Zero Cumulative Layout Shift (CLS).
