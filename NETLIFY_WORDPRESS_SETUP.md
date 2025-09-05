# Netlify WordPress Blog Setup Guide

## Environment Variables Required

To fix the WordPress blog content not loading on Netlify, you need to set these environment variables in your Netlify dashboard:

### Required Environment Variables

1. **WORDPRESS_API_URL**
   - Value: `https://blog.cavemotions.com/wp-json/wp/v2`
   - Description: Server-side WordPress API endpoint

2. **NEXT_PUBLIC_WORDPRESS_API_URL**
   - Value: `https://blog.cavemotions.com/wp-json/wp/v2`
   - Description: Client-side WordPress API endpoint

3. **NEXT_PUBLIC_SITE_URL**
   - Value: `https://cavemotions.com`
   - Description: Your site's production URL

## How to Set Environment Variables on Netlify

1. Go to your Netlify dashboard
2. Select your site (cavemotions)
3. Navigate to **Site settings** → **Environment variables**
4. Click **Add a variable** for each of the above variables
5. Enter the **Key** and **Value** for each variable
6. Click **Save**

## Deployment Steps

1. **Set Environment Variables** (as described above)
2. **Trigger a New Deploy**:
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Deploy site**
3. **Monitor Build Logs**:
   - Check for WordPress API connection messages
   - Look for any timeout or connection errors

## Troubleshooting

### If Blog Content Still Doesn't Load:

1. **Check Build Logs**:
   - Look for "WordPress API URL:" log messages
   - Check for connection timeout errors
   - Verify environment variables are being loaded

2. **Verify WordPress API**:
   - Test the API directly: `https://blog.cavemotions.com/wp-json/wp/v2/posts?per_page=1`
   - Ensure the WordPress site is accessible
   - Check for CORS issues

3. **Build Time Issues**:
   - The code now includes 8-second timeouts for API calls during build
   - If WordPress is slow, the site will fallback to the enhanced blog
   - Users can retry loading the WordPress content

### Common Issues:

1. **Environment Variables Not Set**: Blog shows "Blog Content Loading" message
2. **WordPress API Down**: Automatic fallback to enhanced blog
3. **Slow API Response**: Timeout protection prevents build failures
4. **CORS Issues**: Check WordPress CORS settings

## Fallback Behavior

The site now includes intelligent fallbacks:
- If WordPress API is unavailable during build, the page still deploys
- Users see a "Blog Content Loading" message with retry option
- Enhanced blog (/blog) is always available as backup
- No build failures due to WordPress connectivity issues

## Testing

After deployment:
1. Visit `/blog-wp` to test WordPress integration
2. Check browser console for any API errors
3. Verify images load correctly from WordPress
4. Test the retry functionality if content doesn't load

## Performance Notes

- WordPress content is cached for 5 minutes (300 seconds)
- Images are optimized through Next.js Image component
- API calls have 10-second timeout protection
- Build-time API calls have 8-second timeout protection