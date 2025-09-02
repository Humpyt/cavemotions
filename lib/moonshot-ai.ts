import { z } from 'zod'

// Moonshot AI API Configuration
const MOONSHOT_API_URL = 'https://api.moonshot.cn/v1/chat/completions'
const MOONSHOT_API_KEY = 'sk-D11yIKSrsTZBHKCJBeJQxA3vh1at9Vfd7WpojCH49LcJlA9N'

// Layout recommendation schema
const LayoutRecommendationSchema = z.object({
  layoutType: z.enum(['standard', 'visual-heavy', 'technical', 'storytelling', 'tutorial', 'news']),
  heroStyle: z.enum(['minimal', 'immersive', 'gradient', 'image-overlay', 'clean']),
  contentStructure: z.array(z.enum(['intro', 'overview', 'main-content', 'code-blocks', 'images', 'quotes', 'callouts', 'conclusion'])),
  visualElements: z.object({
    accentColor: z.string(),
    backgroundStyle: z.enum(['clean', 'gradient', 'pattern', 'minimal']),
    cardStyle: z.enum(['modern', 'glass', 'shadow', 'minimal', 'bordered']),
    typography: z.enum(['readable', 'elegant', 'technical', 'casual'])
  }),
  interactiveElements: z.array(z.enum(['progress-bar', 'table-of-contents', 'social-share', 'related-articles', 'author-bio', 'newsletter', 'comments'])),
  readabilityFeatures: z.array(z.enum(['estimated-time', 'word-count', 'difficulty-level', 'tags', 'categories']))
})

export type LayoutRecommendation = z.infer<typeof LayoutRecommendationSchema>

interface BlogContent {
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  readTime?: number
}

interface MoonshotResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

class MoonshotAIService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = MOONSHOT_API_KEY
    this.baseUrl = MOONSHOT_API_URL
  }

  /**
   * Analyze content and generate layout recommendations using Moonshot AI
   */
  async generateLayoutRecommendation(content: BlogContent): Promise<LayoutRecommendation> {
    try {
      const prompt = this.createLayoutAnalysisPrompt(content)
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'moonshot-v1-8k',
          messages: [
            {
              role: 'system',
              content: 'You are an expert UI/UX designer and web developer specializing in blog layout optimization. Analyze the given blog content and provide optimal layout recommendations in valid JSON format.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      })

      if (!response.ok) {
        throw new Error(`Moonshot API error: ${response.status}`)
      }

      const data: MoonshotResponse = await response.json()
      const aiResponse = data.choices[0]?.message?.content

      if (!aiResponse) {
        throw new Error('No response from Moonshot AI')
      }

      // Parse JSON response and validate against schema
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('Invalid JSON response from AI')
      }

      const layoutRecommendation = JSON.parse(jsonMatch[0])
      return LayoutRecommendationSchema.parse(layoutRecommendation)

    } catch (error) {
      console.error('Moonshot AI service error:', error)
      // Return fallback recommendation
      return this.getFallbackRecommendation(content)
    }
  }

  /**
   * Create a detailed prompt for layout analysis
   */
  private createLayoutAnalysisPrompt(content: BlogContent): string {
    return `
Analyze this blog content and recommend an optimal layout design:

CONTENT ANALYSIS:
- Title: "${content.title}"
- Category: ${content.category}
- Tags: ${content.tags.join(', ')}
- Estimated Reading Time: ${content.readTime || 'Unknown'} minutes
- Excerpt: "${content.excerpt}"
- Content Preview: "${content.content.substring(0, 500)}..."

ANALYSIS REQUIREMENTS:
1. Determine the content type (technical tutorial, news article, storytelling, etc.)
2. Assess visual content requirements based on content structure
3. Recommend appropriate layout patterns
4. Suggest optimal user engagement elements
5. Consider readability and accessibility

RESPONSE FORMAT (JSON only):
{
  "layoutType": "standard|visual-heavy|technical|storytelling|tutorial|news",
  "heroStyle": "minimal|immersive|gradient|image-overlay|clean",
  "contentStructure": ["intro", "overview", "main-content", ...],
  "visualElements": {
    "accentColor": "#hex-color-based-on-category",
    "backgroundStyle": "clean|gradient|pattern|minimal",
    "cardStyle": "modern|glass|shadow|minimal|bordered",
    "typography": "readable|elegant|technical|casual"
  },
  "interactiveElements": ["progress-bar", "table-of-contents", ...],
  "readabilityFeatures": ["estimated-time", "word-count", ...]
}

Focus on:
- Content readability and user engagement
- Category-appropriate styling (technical content needs code-friendly layouts)
- Modern design trends while maintaining functionality
- Accessibility and mobile responsiveness considerations
`
  }

  /**
   * Generate layout recommendations based on content analysis
   */
  async analyzeContentStructure(content: string): Promise<{
    hasCodeBlocks: boolean
    hasImages: boolean
    hasQuotes: boolean
    complexity: 'simple' | 'medium' | 'complex'
    suggestedSections: string[]
  }> {
    const hasCodeBlocks = /```|<code>|<pre>/.test(content)
    const hasImages = /<img|!\[.*\]/.test(content)
    const hasQuotes = /<blockquote>|>/.test(content)
    
    // Calculate complexity based on content length and structure
    const wordCount = content.split(/\s+/).length
    const headingCount = (content.match(/#{1,6}|<h[1-6]>/g) || []).length
    
    let complexity: 'simple' | 'medium' | 'complex' = 'simple'
    if (wordCount > 1500 || headingCount > 5) complexity = 'complex'
    else if (wordCount > 800 || headingCount > 2) complexity = 'medium'

    const suggestedSections = ['intro']
    if (headingCount > 2) suggestedSections.push('overview', 'table-of-contents')
    suggestedSections.push('main-content')
    if (hasCodeBlocks) suggestedSections.push('code-blocks')
    if (hasImages) suggestedSections.push('images')
    if (hasQuotes) suggestedSections.push('quotes')
    suggestedSections.push('conclusion')

    return {
      hasCodeBlocks,
      hasImages,
      hasQuotes,
      complexity,
      suggestedSections
    }
  }

  /**
   * Fallback recommendation when AI service is unavailable
   */
  private getFallbackRecommendation(content: BlogContent): LayoutRecommendation {
    const categoryColors = {
      'AI Automation': '#8b5cf6',
      'Web Development': '#06b6d4',
      'Mobile Development': '#f59e0b',
      'Digital Marketing': '#ec4899',
      'Software Development': '#10b981',
      'default': '#6366f1'
    }

    const layoutTypes = {
      'AI Automation': 'technical' as const,
      'Web Development': 'tutorial' as const,
      'Mobile Development': 'tutorial' as const,
      'Software Development': 'technical' as const,
      'default': 'standard' as const
    }

    return {
      layoutType: layoutTypes[content.category as keyof typeof layoutTypes] || layoutTypes.default,
      heroStyle: 'gradient',
      contentStructure: ['intro', 'main-content', 'conclusion'],
      visualElements: {
        accentColor: categoryColors[content.category as keyof typeof categoryColors] || categoryColors.default,
        backgroundStyle: 'clean',
        cardStyle: 'modern',
        typography: 'readable'
      },
      interactiveElements: ['progress-bar', 'social-share', 'related-articles', 'author-bio'],
      readabilityFeatures: ['estimated-time', 'tags', 'categories']
    }
  }

  /**
   * Get color palette based on category
   */
  getCategoryColorPalette(category: string): {
    primary: string
    secondary: string
    accent: string
    background: string
  } {
    const palettes = {
      'AI Automation': {
        primary: '#8b5cf6',
        secondary: '#a78bfa',
        accent: '#c4b5fd',
        background: '#faf5ff'
      },
      'Web Development': {
        primary: '#06b6d4',
        secondary: '#22d3ee',
        accent: '#67e8f9',
        background: '#f0fdff'
      },
      'Mobile Development': {
        primary: '#f59e0b',
        secondary: '#fbbf24',
        accent: '#fcd34d',
        background: '#fffbeb'
      },
      'Digital Marketing': {
        primary: '#ec4899',
        secondary: '#f472b6',
        accent: '#f9a8d4',
        background: '#fdf2f8'
      },
      'Software Development': {
        primary: '#10b981',
        secondary: '#34d399',
        accent: '#6ee7b7',
        background: '#f0fdf4'
      },
      'default': {
        primary: '#6366f1',
        secondary: '#818cf8',
        accent: '#a5b4fc',
        background: '#f8fafc'
      }
    }

    return palettes[category as keyof typeof palettes] || palettes.default
  }
}

// Export singleton instance
export const moonshotAI = new MoonshotAIService()

// Utility function to format AI recommendations for CSS variables
export function formatRecommendationForCSS(recommendation: LayoutRecommendation, category: string): Record<string, string> {
  const colorPalette = moonshotAI.getCategoryColorPalette(category)
  
  return {
    '--ai-accent-color': recommendation.visualElements.accentColor,
    '--ai-primary-color': colorPalette.primary,
    '--ai-secondary-color': colorPalette.secondary,
    '--ai-accent-light': colorPalette.accent,
    '--ai-background': colorPalette.background
  }
}
