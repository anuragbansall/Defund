# Defund

Premium, non-custodial campaign platform built with React + Vite.

## Social Sharing (Open Graph + Twitter)

Rich link previews are enabled via meta tags in index.html. To finalize for production:

1. Set your deployed domain:
   - Edit `index.html` and replace `https://your-domain.example` in `og:url` with your real site URL (e.g. `https://defund.app`).

2. Provide a large preview image:
   - Place an image in `public/og-image.png` sized ~1200x630 (or 1200x1200 for square). Keep it under ~5MB.
   - Update `og:image` and `twitter:image` in `index.html` to `/og-image.png` (absolute URL in production is recommended: `https://your-domain.example/og-image.png`).

3. Customize title and description:
   - Tweak `og:title`, `og:description`, and the basic `meta name="description"` in `index.html` to match your branding.

4. Validate previews:
   - Facebook/WhatsApp: https://developers.facebook.com/tools/debug/
   - X (Twitter): https://cards-dev.twitter.com/validator
   - Discord/Slack: simply paste the URL in a chat; ensure the image resolves via an absolute URL.

## Quick Start

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```
