# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Cave Motions is a modern digital solutions company website built with Next.js 15, TypeScript, and Tailwind CSS. It features a dual-blog system (enhanced custom blog + WordPress integration), portfolio showcase, service pages, and an admin dashboard.

## Key Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **UI Components**: Radix UI primitives via shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **CMS**: Dual system (static + headless WordPress)
- **Development**: Node.js 18+, Husky for git hooks

## Architecture Overview

### Dual Blog System
The project implements two parallel blog systems:
1. **Enhanced Blog** (`/blog`): Static blog posts stored in `data/blog-posts.ts` with rich interactive content
2. **WordPress Blog** (`/blog-wp`): Headless WordPress integration via REST API for easy content management

### Key Directories
- `app/` - Next.js App Router pages and layouts
  - `blog/` - Enhanced static blog pages
  - `blog-wp/` - WordPress-powered blog pages  
  - `services/` - Service detail pages
  - `portfolio/` - Portfolio showcase pages
  - `admin/` - Admin dashboard pages
- `components/` - Reusable React components
  - `ui/` - shadcn/ui component library
- `lib/` - Utility functions and API integrations
  - `wordpress.ts` - WordPress REST API client
  - `utils.ts` - General utility functions
- `data/` - Static data files
  - `blog-posts.ts` - Enhanced blog post definitions
  - `portfolio.ts` - Portfolio project data

### WordPress Integration
- Headless WordPress setup using REST API (`/wp-json/wp/v2`)
- Environment variable: `WORDPRESS_API_URL`
- Supports featured images, categories, authors, and SEO metadata
- Built-in caching and error handling for API requests

### Component Architecture
- **UI Layer**: shadcn/ui components provide consistent design system
- **Layout Components**: Shared headers, footers, navigation
- **Page Components**: Specialized components for different page types
- **Form Components**: React Hook Form + Zod validation for contact forms

## Common Development Commands

### Development
```bash
npm run dev                 # Start development server on port 3001
npm install                 # Install dependencies
npm run type-check          # Run TypeScript type checking
```

### Building & Testing
```bash
npm run build              # Build for production (includes blog verification)
npm run verify-blog        # Verify blog posts are accessible
npm run lint               # Run ESLint
npm run lint:fix           # Fix ESLint errors automatically
```

### Production
```bash
npm start                  # Start production server
npm run build:analyze      # Build with bundle analysis
npm run clean              # Clean build directories (.next, out)
```

### Blog Development
When working with the enhanced blog system:
- Edit blog posts in `data/blog-posts.ts`
- The `verify-blog` script runs during build to ensure posts are accessible
- Blog posts support rich content including images, statistics, and custom layouts

### WordPress Blog Setup
For WordPress integration:
1. Set up WordPress installation (preferably on subdomain like `blog.cavemotions.com`)
2. Configure environment variables in `.env.local`:
   ```env
   WORDPRESS_API_URL=https://blog.cavemotions.com/wp-json/wp/v2
   NEXT_PUBLIC_SITE_URL=https://cavemotions.com
   ```
3. WordPress content automatically appears on `/blog-wp` routes

### Adding New Components
When adding shadcn/ui components:
```bash
npx shadcn-ui@latest add [component-name]
```

### Working with Animations
- Framer Motion is used throughout for smooth animations
- Common animation patterns are defined in component files
- Page transitions and scroll-triggered animations are implemented

### Environment Setup
Required environment variables:
- `WORDPRESS_API_URL` - WordPress REST API endpoint
- `NEXT_PUBLIC_SITE_URL` - Site URL for SEO and social sharing

### Deployment Notes
- Optimized for Vercel deployment
- Netlify support included with `@netlify/plugin-nextjs`
- Static optimization enabled for better performance
- Image optimization configured for external domains

### Development Workflow
1. Run `npm run dev` for development server
2. Use `npm run type-check` to verify TypeScript
3. Use `npm run lint:fix` to maintain code quality
4. Test builds with `npm run build` before deployment
5. The build process automatically verifies blog accessibility

### Key Files to Know
- `next.config.mjs` - Next.js configuration with image domains and webpack customization
- `tailwind.config.ts` - Tailwind CSS configuration with custom theme
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*`)
- `scripts/verify-blog.js` - Blog verification script run during build
- `data/blog-posts.ts` - Enhanced blog post definitions
- `lib/wordpress.ts` - WordPress API integration utilities

### Performance Considerations
- Next.js Image component used throughout for optimized images
- Static generation where possible for better performance
- Code splitting happens automatically with Next.js App Router
- Framer Motion animations are optimized for smooth performance
