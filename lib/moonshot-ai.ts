import { z } from 'zod'

// Moonshot AI API Configuration
const MOONSHOT_API_URL = 'https://api.moonshot.ai/v1/chat/completions'
const MOONSHOT_API_KEY = 'sk-D11yIKSrsTZBHKCJBeJQxA3vh1at9Vfd7WpojCH49LcJlA9N'

// Test connection and log API details
console.log('🌙 Moonshot AI Configuration:')
console.log('📡 API URL:', MOONSHOT_API_URL)
console.log('🔑 API Key configured:', MOONSHOT_API_KEY ? 'Yes' : 'No')
console.log('🔑 API Key length:', MOONSHOT_API_KEY?.length || 0)

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
      console.log('🌙 Moonshot AI: Starting layout analysis for:', content.title)
      console.log('📡 API Endpoint:', this.baseUrl)
      console.log('🔑 API Key present:', this.apiKey ? 'Yes' : 'No')
      
      const prompt = this.createLayoutAnalysisPrompt(content)
      
      const requestBody = {
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: 'You are a professional web designer and frontend developer specializing in blog layout optimization and modern UI/UX design. You understand clean typography, balanced white space, consistent color palettes, responsive design, and SEO optimization. Analyze the given blog content and provide optimal layout recommendations in valid JSON format only, no additional text. Focus on professional styling that ensures excellent readability and user experience.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }
      
      console.log('📤 Sending request to Moonshot AI...')
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(requestBody)
      })

      console.log('📥 Response status:', response.status, response.statusText)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ API Error Response:', errorText)
        throw new Error(`Moonshot API error: ${response.status} - ${errorText}`)
      }

      const data: MoonshotResponse = await response.json()
      console.log('📊 Raw API Response:', data)
      
      const aiResponse = data.choices[0]?.message?.content

      if (!aiResponse) {
        throw new Error('No response content from Moonshot AI')
      }
      
      console.log('🤖 AI Response:', aiResponse)

      // Parse JSON response and validate against schema
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        console.warn('⚠️ No JSON found in AI response, using fallback')
        throw new Error('Invalid JSON response from AI')
      }

      let layoutRecommendation
      try {
        layoutRecommendation = JSON.parse(jsonMatch[0])
        console.log('📋 Parsed JSON:', layoutRecommendation)
      } catch (parseError) {
        console.error('❌ JSON Parse Error:', parseError)
        console.log('🔧 Raw JSON string:', jsonMatch[0])
        throw new Error('Failed to parse JSON from AI response')
      }

      // Validate and sanitize the recommendation before schema validation
      const sanitizedRecommendation = this.sanitizeAIRecommendation(layoutRecommendation)
      console.log('🧹 Sanitized recommendation:', sanitizedRecommendation)
      
      try {
        const validatedRecommendation = LayoutRecommendationSchema.parse(sanitizedRecommendation)
        console.log('✅ AI Layout Recommendation Generated:', validatedRecommendation)
        return validatedRecommendation
      } catch (zodError) {
        console.error('❌ Zod Validation Error:', zodError)
        console.log('🔧 Failed recommendation:', sanitizedRecommendation)
        const errorMessage = zodError instanceof Error ? zodError.message : 'Unknown validation error'
        throw new Error(`Schema validation failed: ${errorMessage}`)
      }

    } catch (error) {
      console.error('❌ Moonshot AI service error:', error)
      console.log('🔄 Falling back to intelligent default recommendation')
      // Return fallback recommendation
      const fallback = this.getFallbackRecommendation(content)
      console.log('🛡️ Fallback recommendation:', fallback)
      return fallback
    }
  }

  /**
   * Create a detailed prompt for layout analysis using professional web design instructions
   */
  private createLayoutAnalysisPrompt(content: BlogContent): string {
    return `You are a professional web designer and frontend developer. Your task is to style blog articles for a modern, professional blog. Use clean typography, balanced white space, and a consistent color palette. Each article should have: a clear headline hierarchy (H1, H2, H3), well-spaced paragraphs, blockquotes for key highlights, callout boxes for tips or notes, and visually distinct links. Add subtle hover effects for links and images, responsive formatting for mobile, and ensure readability with a minimum of 16px font size. Use CSS classes instead of inline styles for maintainability. The design should feel elegant, minimal, and optimized for both user experience and SEO. Provide reusable CSS/utility classes that can be applied to any future article.

ANALYZE THIS CONTENT AND RETURN OPTIMAL LAYOUT DESIGN RECOMMENDATIONS:

CONTENT ANALYSIS:
- Title: "${content.title}"
- Category: ${content.category}
- Tags: ${content.tags.join(', ')}
- Reading Time: ${content.readTime || 5} minutes
- Excerpt: "${content.excerpt}"
- Content Length: ${content.content.length} characters
- Has Code: ${/```|<code>|<pre>/.test(content.content)}
- Has Images: ${/<img|!\[.*\]/.test(content.content)}
- Complexity: ${content.content.length > 2000 ? 'complex' : content.content.length > 1000 ? 'medium' : 'simple'}

RETURN ONLY THIS JSON FORMAT WITH PROFESSIONAL STYLING RECOMMENDATIONS:
{
  "layoutType": "standard",
  "heroStyle": "gradient", 
  "contentStructure": ["intro", "main-content", "conclusion"],
  "visualElements": {
    "accentColor": "#6366f1",
    "backgroundStyle": "clean",
    "cardStyle": "modern",
    "typography": "readable"
  },
  "interactiveElements": ["progress-bar", "social-share", "related-articles"],
  "readabilityFeatures": ["estimated-time", "tags"]
}

Adjust the values based on content analysis:
- For technical content: use "technical" layoutType, "technical" typography, include "table-of-contents"
- For tutorials: use "tutorial" layoutType, include "table-of-contents" and "progress-bar"
- For storytelling: use "storytelling" layoutType with "elegant" typography
- Choose accent colors that complement the category theme and maintain professional appearance
- Ensure all recommendations follow modern web design principles for optimal UX and SEO`
  }

  /**
   * Sanitize AI recommendation to ensure it matches our schema
   */
  private sanitizeAIRecommendation(recommendation: any): any {
    console.log('🧹 Sanitizing AI recommendation...')
    
    // Define valid enum values
    const validLayoutTypes = ['standard', 'visual-heavy', 'technical', 'storytelling', 'tutorial', 'news']
    const validHeroStyles = ['minimal', 'immersive', 'gradient', 'image-overlay', 'clean']
    const validContentStructure = ['intro', 'overview', 'main-content', 'code-blocks', 'images', 'quotes', 'callouts', 'conclusion']
    const validBackgroundStyles = ['clean', 'gradient', 'pattern', 'minimal']
    const validCardStyles = ['modern', 'glass', 'shadow', 'minimal', 'bordered']
    const validTypography = ['readable', 'elegant', 'technical', 'casual']
    const validInteractiveElements = ['progress-bar', 'table-of-contents', 'social-share', 'related-articles', 'author-bio', 'newsletter', 'comments']
    const validReadabilityFeatures = ['estimated-time', 'word-count', 'difficulty-level', 'tags', 'categories']
    
    const sanitized = {
      layoutType: validLayoutTypes.includes(recommendation.layoutType) ? recommendation.layoutType : 'standard',
      heroStyle: validHeroStyles.includes(recommendation.heroStyle) ? recommendation.heroStyle : 'gradient',
      contentStructure: Array.isArray(recommendation.contentStructure) ? 
        recommendation.contentStructure.filter((item: string) => validContentStructure.includes(item)) : 
        ['intro', 'main-content', 'conclusion'],
      visualElements: {
        accentColor: (typeof recommendation.visualElements?.accentColor === 'string' && recommendation.visualElements.accentColor.startsWith('#')) ? 
          recommendation.visualElements.accentColor : '#6366f1',
        backgroundStyle: validBackgroundStyles.includes(recommendation.visualElements?.backgroundStyle) ? 
          recommendation.visualElements.backgroundStyle : 'clean',
        cardStyle: validCardStyles.includes(recommendation.visualElements?.cardStyle) ? 
          recommendation.visualElements.cardStyle : 'modern',
        typography: validTypography.includes(recommendation.visualElements?.typography) ? 
          recommendation.visualElements.typography : 'readable'
      },
      interactiveElements: Array.isArray(recommendation.interactiveElements) ? 
        recommendation.interactiveElements.filter((item: string) => validInteractiveElements.includes(item)) : 
        ['progress-bar', 'social-share', 'related-articles'],
      readabilityFeatures: Array.isArray(recommendation.readabilityFeatures) ? 
        recommendation.readabilityFeatures.filter((item: string) => validReadabilityFeatures.includes(item)) : 
        ['estimated-time', 'tags']
    }
    
    // Ensure arrays are not empty
    if (sanitized.contentStructure.length === 0) {
      sanitized.contentStructure = ['intro', 'main-content', 'conclusion']
    }
    if (sanitized.interactiveElements.length === 0) {
      sanitized.interactiveElements = ['progress-bar', 'social-share']
    }
    if (sanitized.readabilityFeatures.length === 0) {
      sanitized.readabilityFeatures = ['estimated-time']
    }
    
    console.log('✅ Sanitization complete')
    return sanitized
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
   * Test API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      console.log('🧪 Testing Moonshot AI connection...')
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'moonshot-v1-8k',
          messages: [{
            role: 'user',
            content: 'Test connection. Reply with: {"status": "connected"}'
          }],
          max_tokens: 50
        })
      })
      
      const success = response.ok
      console.log(success ? '✅ Connection test passed' : '❌ Connection test failed')
      return success
    } catch (error) {
      console.error('🚫 Connection test error:', error)
      return false
    }
  }

  /**
   * Fallback recommendation when AI service is unavailable
   */
  getFallbackRecommendation(content: BlogContent): LayoutRecommendation {
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
   * Get enhanced color palette based on category with professional design principles
   */
  getCategoryColorPalette(category: string): {
    primary: string
    secondary: string
    accent: string
    background: string
  } {
    const palettes = {
      'AI Automation': {
        primary: '#6366f1',
        secondary: '#818cf8',
        accent: '#a5b4fc',
        background: '#f8fafc'
      },
      'Web Development': {
        primary: '#0ea5e9',
        secondary: '#38bdf8',
        accent: '#7dd3fc',
        background: '#f0f9ff'
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
      'Business Intelligence': {
        primary: '#8b5cf6',
        secondary: '#a78bfa',
        accent: '#c4b5fd',
        background: '#faf5ff'
      },
      'Performance Optimization': {
        primary: '#ef4444',
        secondary: '#f87171',
        accent: '#fca5a5',
        background: '#fef2f2'
      },
      'UI/UX Design': {
        primary: '#06b6d4',
        secondary: '#22d3ee',
        accent: '#67e8f9',
        background: '#f0fdff'
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
console.log('🌙 Moonshot AI service initializing...')
export const moonshotAI = new MoonshotAIService()
console.log('🌙 Moonshot AI service initialized successfully')

// Test connection on module load (optional)
if (typeof window !== 'undefined') {
  console.log('🌙 Running Moonshot AI connection test...')
  moonshotAI.testConnection().then((success) => {
    if (success) {
      console.log('✅ Moonshot AI connection successful - Professional blog styling enabled!')
    } else {
      console.log('⚠️ Moonshot AI connection failed - Using fallback recommendations with professional styling')
    }
  }).catch(() => {
    console.log('🔄 Moonshot AI connection test failed, will use fallback recommendations')
  })
}

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
