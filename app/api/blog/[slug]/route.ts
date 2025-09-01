import { NextResponse } from 'next/server'
import { getBlogPostBySlug } from '@/lib/blog'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const post = getBlogPostBySlug(slug)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found', success: false },
        { status: 404 }
      )
    }

    return NextResponse.json({
      post,
      success: true
    })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post', success: false },
      { status: 500 }
    )
  }
}