export async function GET(): Promise<Response> {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://cavemotions.com/sitemap.xml`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}