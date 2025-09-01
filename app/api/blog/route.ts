import { NextResponse } from 'next/server'
import { getAllBlogPosts } from '@/lib/blog'

export async function GET() {
  try {
    const posts = getAllBlogPosts()
    return NextResponse.json({
      posts,
      count: posts.length,
      success: true
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts', success: false },
      { status: 500 }
    )
  }
}