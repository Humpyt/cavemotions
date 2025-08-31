# Cave Motions - Digital Solutions Company Website

A modern, responsive website for Cave Motions, a leading digital solutions company in Uganda specializing in web development, mobile apps, AI automation, and digital marketing.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Fast Performance**: Built with Next.js 14 and optimized for speed
- **SEO Optimized**: Comprehensive SEO implementation
- **Blog System**: Dual blog system (Enhanced + WordPress integration)
- **Portfolio Showcase**: Dynamic portfolio with filtering
- **Contact Forms**: Multiple contact options with form validation
- **Dark Mode**: Full dark mode support

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **CMS**: WordPress (Headless)
- **Deployment**: Vercel
- **Analytics**: Google Analytics (optional)

## 📁 Project Structure

```
cavesite/
├── app/                    # Next.js app directory
│   ├── blog/              # Enhanced blog pages
│   ├── blog-wp/           # WordPress blog pages
│   ├── services/          # Service pages
│   ├── portfolio/         # Portfolio pages
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # UI components (shadcn/ui)
│   └── ...               # Custom components
├── lib/                  # Utility functions
│   ├── wordpress.ts      # WordPress API integration
│   └── utils.ts          # General utilities
├── data/                 # Static data
│   ├── blog-posts.ts     # Enhanced blog posts
│   └── portfolio.ts      # Portfolio data
├── public/               # Static assets
│   └── images/           # Image assets
└── content/              # Content files
    └── blogs/            # Blog content source
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- WordPress installation (for blog functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Humpyt/cavemotions.git
   cd cavemotions
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   WORDPRESS_API_URL=https://blog.cavemotions.com/wp-json/wp/v2
   NEXT_PUBLIC_SITE_URL=https://cavemotions.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Content Management

### Enhanced Blog System
- Rich content with interactive elements
- Located in `data/blog-posts.ts`
- Supports images, statistics, and custom layouts

### WordPress Integration
- Headless WordPress setup
- Dynamic content fetching
- SEO optimized
- Easy content management

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Import project from GitHub
   - Configure environment variables
   - Deploy automatically

2. **Environment Variables in Vercel**
   ```
   WORDPRESS_API_URL=https://blog.cavemotions.com/wp-json/wp/v2
   NEXT_PUBLIC_SITE_URL=https://cavemotions.com
   ```

### Manual Deployment

```bash
npm run build
npm start
```

## 🔧 Configuration

### WordPress Setup
1. Install WordPress on subdomain (blog.cavemotions.com)
2. Enable REST API
3. Install recommended plugins (Yoast SEO, etc.)
4. Update environment variables

### SEO Configuration
- Meta tags automatically generated
- Sitemap included
- Structured data implemented
- Open Graph tags

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions:
- **Email**: hello@cavemotions.com
- **Phone**: +256 787 022105
- **Website**: [cavemotions.com](https://cavemotions.com)

## 📄 License

This project is proprietary and confidential. All rights reserved by Cave Motions.

---

**Built with ❤️ by Cave Motions Team**
