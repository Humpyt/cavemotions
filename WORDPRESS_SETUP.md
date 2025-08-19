# WordPress Blog Integration Setup Guide

This guide will help you set up WordPress as a headless CMS for your Cave Motions website.

## 🚀 Quick Setup Options

### Option 1: WordPress.com (Easiest)
1. Go to [WordPress.com](https://wordpress.com)
2. Create a new site (e.g., `cavemotions.wordpress.com`)
3. Choose a plan that supports API access (Business plan or higher)
4. Your API URL will be: `https://cavemotions.wordpress.com/wp-json/wp/v2`

### Option 2: Self-Hosted WordPress (Recommended)
1. Get hosting (Bluehost, SiteGround, or local hosting in Uganda)
2. Install WordPress on a subdomain: `blog.cavemotions.com`
3. Your API URL will be: `https://blog.cavemotions.com/wp-json/wp/v2`

### Option 3: Local Development
1. Install XAMPP, WAMP, or Local by Flywheel
2. Create a WordPress installation
3. Your API URL will be: `http://localhost/your-wp-site/wp-json/wp/v2`

## 📝 WordPress Configuration

### 1. Enable REST API (Usually enabled by default)
The WordPress REST API is enabled by default in WordPress 4.7+. Test it by visiting:
```
https://your-wordpress-site.com/wp-json/wp/v2/posts
```

### 2. Install Recommended Plugins

#### Essential Plugins:
- **Yoast SEO** - For better SEO metadata
- **Advanced Custom Fields (ACF)** - For custom fields
- **WP REST API Controller** - Better API control
- **JWT Authentication** - If you need authentication

#### Optional Plugins:
- **Rank Math** - Alternative to Yoast SEO
- **WP GraphQL** - If you prefer GraphQL over REST
- **Custom Post Type UI** - For custom post types

### 3. Configure Permalinks
1. Go to Settings → Permalinks
2. Choose "Post name" structure
3. Save changes

### 4. Set Up Categories and Tags
Create categories that match your content strategy:
- Web Development
- AI Automation
- Mobile Development
- Digital Marketing
- E-commerce
- Software Development

## 🔧 Environment Setup

### 1. Create .env.local file
```bash
cp .env.example .env.local
```

### 2. Update WordPress URL
```env
WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
```

### 3. Test the Connection
Visit your Next.js site at:
```
http://localhost:3000/blog-wp
```

## 📊 Content Migration

### Option 1: Manual Content Entry
1. Log into your WordPress admin
2. Create new posts with your existing content
3. Add featured images
4. Set categories and tags
5. Publish posts

### Option 2: Import from Existing Content
1. Install "WP All Import" plugin
2. Export your existing blog data to CSV/XML
3. Import using the plugin

### Option 3: WordPress Importer
1. Export content from your current system
2. Use WordPress's built-in importer
3. Tools → Import → Choose your format

## 🎨 WordPress Theme (Optional)

Since we're using WordPress headlessly, you don't need a fancy theme, but for admin convenience:

1. Install a simple admin theme like "Astra" or "GeneratePress"
2. Or use the default Twenty Twenty-Four theme
3. Focus on the admin experience rather than frontend

## 🔐 Security & Performance

### Security:
1. Install "Wordfence Security" plugin
2. Use strong passwords
3. Enable two-factor authentication
4. Regular backups with "UpdraftPlus"

### Performance:
1. Install "WP Rocket" or "W3 Total Cache"
2. Optimize images with "Smush"
3. Use a CDN like Cloudflare

## 📱 Content Management Workflow

### For Todo Humphrey (Content Creator):
1. Log into WordPress admin
2. Create new post
3. Add title, content, excerpt
4. Upload featured image
5. Set category and tags
6. Add SEO metadata (Yoast)
7. Publish or schedule

### Content appears automatically on:
- `/blog-wp` - Main blog page
- `/blog-wp/[slug]` - Individual posts
- Homepage (if you add featured posts widget)

## 🚀 Going Live

### 1. Production WordPress Setup
1. Set up WordPress on your production domain
2. Import/migrate content
3. Update environment variables

### 2. Update Next.js Environment
```env
WORDPRESS_API_URL=https://blog.cavemotions.com/wp-json/wp/v2
```

### 3. Deploy Next.js Site
Your existing deployment process will work. The WordPress integration will automatically fetch content.

## 🔄 Alternative: Keep Current System + WordPress

You can run both systems simultaneously:
- Keep current blog at `/blog`
- Add WordPress blog at `/blog-wp`
- Gradually migrate content
- Eventually redirect `/blog` to `/blog-wp`

## 📞 Support

If you need help setting up WordPress:
1. Contact your hosting provider
2. Hire a WordPress developer
3. Use managed WordPress hosting (WP Engine, Kinsta)

## 🎯 Benefits of This Setup

✅ **Easy Content Management** - WordPress admin interface
✅ **SEO Optimized** - Yoast SEO integration
✅ **Fast Performance** - Static generation with Next.js
✅ **Scalable** - Handle thousands of posts
✅ **Flexible** - Add custom fields, post types
✅ **Team Friendly** - Multiple authors, roles, permissions
✅ **Plugin Ecosystem** - Thousands of WordPress plugins
✅ **Backup & Security** - Mature WordPress ecosystem

## 🚀 Next Steps

1. Choose your WordPress hosting option
2. Set up WordPress installation
3. Update environment variables
4. Test the integration
5. Start creating content!

The WordPress integration is now ready. Once you set up WordPress and update the environment variables, you'll have a powerful, easy-to-manage blog system!
