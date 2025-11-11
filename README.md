# Studio Sammii

A clean, modern freelance website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, minimal aesthetic with focus on typography and whitespace
- **Fully Responsive**: Mobile-first design that works beautifully on all devices
- **Performance Optimized**: Built with Next.js 15 and optimized for speed
- **SEO Ready**: Proper meta tags, Open Graph, and structured data
- **Contact Form**: Working contact form with validation and API endpoint
- **Accessible**: WCAG compliant with proper focus states and semantic HTML

## Pages

- **Home**: Hero section, services overview, selected work, and call-to-action
- **Services**: Detailed service offerings with pricing guidance
- **Work**: Portfolio showcase with project details
- **About**: Personal story, principles, and current status
- **Contact**: Contact form and alternative contact methods
- **Privacy**: Privacy policy page

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## Getting Started

1. Install dependencies:
```bash
yarn add
```

2. (Optional) Configure environment variables:
Create a `.env.local` file in the root directory:
```bash
# Studio Store API Configuration
# Base URL for the Studio Store API (defaults to https://framify-nine.vercel.app if not set)
STUDIO_STORE_API_URL=https://framify-nine.vercel.app

# Templates Store Feature Flag
# Set to 'true' to enable the templates store page and API routes
# Keep as 'false' or unset to hide templates until ready
NEXT_PUBLIC_ENABLE_TEMPLATES_STORE=false
```

3. Run the development server:
```bash
yarn run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see the site

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
