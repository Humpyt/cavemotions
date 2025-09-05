// AI-Powered Blog Theme Configuration
// This file provides TypeScript interfaces and configurations for dynamic blog theming

import { BlogPost } from '@/types/blog-post';

// Theme Configuration Interfaces
export interface BlogTheme {
  id: string;
  name: string;
  description: string;
  colorPalette: ColorPalette;
  typography: TypographyConfig;
  layout: LayoutConfig;
  components: ComponentConfig;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  accentLight: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  semantic: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

export interface TypographyConfig {
  fontFamily: 'sans-serif' | 'serif' | 'mono';
  headingWeight: 'normal' | 'semibold' | 'bold' | 'extrabold';
  bodyWeight: 'light' | 'normal' | 'medium';
  scale: 'tight' | 'normal' | 'relaxed';
  lineHeight: 'tight' | 'normal' | 'relaxed';
}

export interface LayoutConfig {
  heroStyle: 'minimal' | 'gradient' | 'immersive';
  contentLayout: 'single-column' | 'sidebar' | 'wide';
  cardStyle: 'modern' | 'glass' | 'minimal';
  spacing: 'compact' | 'normal' | 'spacious';
}

export interface ComponentConfig {
  showProgressBar: boolean;
  showSocialShare: boolean;
  showTableOfContents: boolean;
  showAuthorBio: boolean;
  showNewsletterSignup: boolean;
  showRelatedArticles: boolean;
  animationLevel: 'none' | 'subtle' | 'enhanced';
}

// Predefined AI Themes - ALL USING SANS-SERIF FOR CONSISTENT INTER FONT
export const AI_THEMES: Record<string, BlogTheme> = {
  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'Clean, corporate-friendly design with excellent readability',
    colorPalette: {
      primary: '#2563eb',
      secondary: '#3b82f6',
      accent: '#60a5fa',
      accentLight: '#93c5fd',
      background: '#ffffff',
      surface: '#f8fafc',
      text: {
        primary: '#111827',
        secondary: '#374151',
        muted: '#6b7280',
      },
      semantic: {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
    },
    typography: {
      fontFamily: 'sans-serif',
      headingWeight: 'bold',
      bodyWeight: 'normal',
      scale: 'normal',
      lineHeight: 'normal',
    },
    layout: {
      heroStyle: 'minimal',
      contentLayout: 'sidebar',
      cardStyle: 'modern',
      spacing: 'normal',
    },
    components: {
      showProgressBar: true,
      showSocialShare: true,
      showTableOfContents: true,
      showAuthorBio: true,
      showNewsletterSignup: true,
      showRelatedArticles: true,
      animationLevel: 'subtle',
    },
  },
  creative: {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant and engaging design for creative content',
    colorPalette: {
      primary: '#7c3aed',
      secondary: '#8b5cf6',
      accent: '#a78bfa',
      accentLight: '#c4b5fd',
      background: '#fafafa',
      surface: '#f3f4f6',
      text: {
        primary: '#111827',
        secondary: '#374151',
        muted: '#6b7280',
      },
      semantic: {
        success: '#059669',
        warning: '#d97706',
        error: '#dc2626',
        info: '#7c3aed',
      },
    },
    typography: {
      fontFamily: 'sans-serif', // CHANGED FROM 'serif' TO 'sans-serif'
      headingWeight: 'extrabold',
      bodyWeight: 'normal',
      scale: 'relaxed',
      lineHeight: 'relaxed',
    },
    layout: {
      heroStyle: 'gradient',
      contentLayout: 'single-column',
      cardStyle: 'glass',
      spacing: 'spacious',
    },
    components: {
      showProgressBar: true,
      showSocialShare: true,
      showTableOfContents: false,
      showAuthorBio: true,
      showNewsletterSignup: true,
      showRelatedArticles: true,
      animationLevel: 'enhanced',
    },
  },
  technical: {
    id: 'technical',
    name: 'Technical',
    description: 'Developer-focused design with monospace highlights',
    colorPalette: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#34d399',
      accentLight: '#6ee7b7',
      background: '#ffffff',
      surface: '#f9fafb',
      text: {
        primary: '#111827',
        secondary: '#374151',
        muted: '#6b7280',
      },
      semantic: {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
    },
    typography: {
      fontFamily: 'sans-serif', // CHANGED FROM 'mono' TO 'sans-serif'
      headingWeight: 'semibold',
      bodyWeight: 'normal',
      scale: 'tight',
      lineHeight: 'normal',
    },
    layout: {
      heroStyle: 'minimal',
      contentLayout: 'wide',
      cardStyle: 'minimal',
      spacing: 'compact',
    },
    components: {
      showProgressBar: true,
      showSocialShare: false,
      showTableOfContents: true,
      showAuthorBio: false,
      showNewsletterSignup: false,
      showRelatedArticles: true,
      animationLevel: 'none',
    },
  },
  magazine: {
    id: 'magazine',
    name: 'Magazine',
    description: 'Editorial-style layout with immersive hero sections',
    colorPalette: {
      primary: '#dc2626',
      secondary: '#ef4444',
      accent: '#f87171',
      accentLight: '#fca5a5',
      background: '#ffffff',
      surface: '#f8fafc',
      text: {
        primary: '#111827',
        secondary: '#374151',
        muted: '#6b7280',
      },
      semantic: {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#dc2626',
        info: '#3b82f6',
      },
    },
    typography: {
      fontFamily: 'sans-serif', // CHANGED FROM 'serif' TO 'sans-serif'
      headingWeight: 'bold',
      bodyWeight: 'light',
      scale: 'relaxed',
      lineHeight: 'relaxed',
    },
    layout: {
      heroStyle: 'immersive',
      contentLayout: 'sidebar',
      cardStyle: 'modern',
      spacing: 'spacious',
    },
    components: {
      showProgressBar: true,
      showSocialShare: true,
      showTableOfContents: false,
      showAuthorBio: true,
      showNewsletterSignup: true,
      showRelatedArticles: true,
      animationLevel: 'enhanced',
    },
  },
};

// AI Theme Selection Logic
export class AIThemeSelector {
  /**
   * Analyzes blog post content and selects the most appropriate theme
   */
  static selectThemeForPost(post: BlogPost): BlogTheme {
    const content = `${post.title} ${post.excerpt} ${post.tags?.join(' ') || ''}`.toLowerCase();
    
    // Technical content detection
    const technicalKeywords = [
      'code', 'programming', 'development', 'api', 'framework', 'javascript',
      'react', 'typescript', 'python', 'database', 'algorithm', 'software'
    ];
    
    // Creative content detection
    const creativeKeywords = [
      'design', 'creative', 'art', 'inspiration', 'visual', 'branding',
      'color', 'typography', 'ui', 'ux', 'aesthetic', 'style'
    ];
    
    // Magazine-style content detection
    const magazineKeywords = [
      'story', 'interview', 'feature', 'exclusive', 'behind', 'journey',
      'personal', 'experience', 'lifestyle', 'trend', 'culture'
    ];
    
    const technicalScore = this.calculateKeywordScore(content, technicalKeywords);
    const creativeScore = this.calculateKeywordScore(content, creativeKeywords);
    const magazineScore = this.calculateKeywordScore(content, magazineKeywords);
    
    // Determine theme based on highest score
    const maxScore = Math.max(technicalScore, creativeScore, magazineScore);
    
    if (maxScore === 0) {
      return AI_THEMES.professional; // Default fallback
    }
    
    if (technicalScore === maxScore) {
      return AI_THEMES.technical;
    } else if (creativeScore === maxScore) {
      return AI_THEMES.creative;
    } else if (magazineScore === maxScore) {
      return AI_THEMES.magazine;
    }
    
    return AI_THEMES.professional;
  }
  
  private static calculateKeywordScore(content: string, keywords: string[]): number {
    return keywords.reduce((score, keyword) => {
      const matches = (content.match(new RegExp(keyword, 'g')) || []).length;
      return score + matches;
    }, 0);
  }
  
  /**
   * Generates a custom color palette based on content mood
   */
  static generateColorPalette(mood: 'energetic' | 'calm' | 'professional' | 'creative'): ColorPalette {
    const palettes = {
      energetic: {
        primary: '#f59e0b',
        secondary: '#fbbf24',
        accent: '#fcd34d',
        accentLight: '#fde68a',
        background: '#fffbeb',
        surface: '#fef3c7',
      },
      calm: {
        primary: '#0891b2',
        secondary: '#06b6d4',
        accent: '#22d3ee',
        accentLight: '#67e8f9',
        background: '#f0f9ff',
        surface: '#e0f7fa',
      },
      professional: {
        primary: '#1f2937',
        secondary: '#374151',
        accent: '#6b7280',
        accentLight: '#9ca3af',
        background: '#ffffff',
        surface: '#f9fafb',
      },
      creative: {
        primary: '#7c2d12',
        secondary: '#9a3412',
        accent: '#c2410c',
        accentLight: '#ea580c',
        background: '#fff7ed',
        surface: '#fed7aa',
      },
    };
    
    const basePalette = palettes[mood];
    
    return {
      ...basePalette,
      text: {
        primary: '#111827',
        secondary: '#374151',
        muted: '#6b7280',
      },
      semantic: {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
    };
  }
}

// CSS Variable Generator
export class ThemeVariableGenerator {
  /**
   * Generates CSS custom properties from theme configuration
   */
  static generateCSSVariables(theme: BlogTheme): Record<string, string> {
    const { colorPalette, typography, layout } = theme;
    
    return {
      // Color variables
      '--ai-primary-color': colorPalette.primary,
      '--ai-secondary-color': colorPalette.secondary,
      '--ai-accent-color': colorPalette.accent,
      '--ai-accent-light': colorPalette.accentLight,
      '--ai-background': colorPalette.background,
      '--ai-surface': colorPalette.surface,
      '--ai-text-primary': colorPalette.text.primary,
      '--ai-text-secondary': colorPalette.text.secondary,
      '--ai-text-muted': colorPalette.text.muted,
      
      // Semantic colors
      '--ai-success': colorPalette.semantic.success,
      '--ai-warning': colorPalette.semantic.warning,
      '--ai-error': colorPalette.semantic.error,
      '--ai-info': colorPalette.semantic.info,
      
      // Typography variables
      '--font-weight-heading': this.getFontWeight(typography.headingWeight),
      '--font-weight-body': this.getFontWeight(typography.bodyWeight),
      '--line-height-scale': this.getLineHeight(typography.lineHeight),
      
      // Layout variables
      '--spacing-scale': this.getSpacingScale(layout.spacing),
    };
  }
  
  private static getFontWeight(weight: string): string {
    const weights = {
      'light': '300',
      'normal': '400',
      'medium': '500',
      'semibold': '600',
      'bold': '700',
      'extrabold': '800',
    };
    return weights[weight as keyof typeof weights] || '400';
  }
  
  private static getLineHeight(height: string): string {
    const heights = {
      'tight': '1.4',
      'normal': '1.6',
      'relaxed': '1.8',
    };
    return heights[height as keyof typeof heights] || '1.6';
  }
  
  private static getSpacingScale(spacing: string): string {
    const scales = {
      'compact': '0.75',
      'normal': '1',
      'spacious': '1.25',
    };
    return scales[spacing as keyof typeof scales] || '1';
  }
  
  /**
   * Applies theme variables to a SCOPED container instead of document root
   * This prevents global interference with other pages
   */
  static applyThemeToContainer(theme: BlogTheme, containerId: string = 'blog-container'): void {
    if (typeof window === 'undefined') return;
    
    const container = document.getElementById(containerId) || document.querySelector(`.${containerId}`);
    if (!container) {
      console.warn(`[Blog Theme] Container ${containerId} not found, skipping theme application`);
      return;
    }
    
    const variables = this.generateCSSVariables(theme);
    
    // Apply variables to the scoped container only
    Object.entries(variables).forEach(([property, value]) => {
      container.style.setProperty(property, value);
    });
    
    console.log(`[Blog Theme] Applied scoped theme: ${theme.name} to container`);
  }
  
  /**
   * DEPRECATED: This method causes global interference
   * Use applyThemeToContainer instead
   */
  static applyThemeToDocument(theme: BlogTheme): void {
    console.warn('[Blog Theme] applyThemeToDocument is deprecated and causes global interference');
    console.warn('[Blog Theme] Use applyThemeToContainer instead for proper isolation');
    
    if (typeof window === 'undefined') return;
    
    // Only apply scoped styling - no global document manipulation
    this.applyThemeToContainer(theme, 'blog-container');
  }
  
  /**
   * Cleanup function to remove any blog-specific classes from document body
   * Call this when leaving blog pages to prevent global interference
   */
  static cleanupGlobalStyles(): void {
    if (typeof window === 'undefined') return;
    
    // Remove any blog-specific classes that might have been added to body
    document.body.classList.remove('blog-typography', 'serif', 'mono');
    
    // Remove any blog-specific CSS variables from document root
    const rootStyle = document.documentElement.style;
    const blogVarKeys = [
      '--ai-primary-color', '--ai-secondary-color', '--ai-accent-color',
      '--ai-accent-light', '--ai-background', '--ai-surface',
      '--ai-text-primary', '--ai-text-secondary', '--ai-text-muted',
      '--ai-success', '--ai-warning', '--ai-error', '--ai-info',
      '--font-weight-heading', '--font-weight-body', '--line-height-scale',
      '--spacing-scale'
    ];
    
    blogVarKeys.forEach(key => {
      rootStyle.removeProperty(key);
    });
    
    console.log('[Blog Theme] Cleaned up global styles');
  }
}

// Layout Component Generator
export class LayoutComponentGenerator {
  /**
   * Generates CSS class names based on theme configuration
   */
  static generateLayoutClasses(theme: BlogTheme): {
    hero: string;
    container: string;
    content: string;
    card: string;
  } {
    const { layout } = theme;
    
    return {
      hero: `hero-${layout.heroStyle}`,
      container: layout.contentLayout === 'single-column' 
        ? 'article-container' 
        : layout.contentLayout === 'sidebar' 
        ? 'article-container article-grid' 
        : 'article-container article-wide',
      content: 'article-content',
      card: `card-${layout.cardStyle}`,
    };
  }
  
  /**
   * Determines which components should be rendered
   */
  static getActiveComponents(theme: BlogTheme): ComponentConfig {
    return theme.components;
  }
  
  /**
   * Gets animation class based on theme setting
   */
  static getAnimationClasses(theme: BlogTheme): string[] {
    const { animationLevel } = theme.components;
    
    const animations = {
      none: [],
      subtle: ['fade-in'],
      enhanced: ['fade-in', 'slide-up', 'scale-in'],
    };
    
    return animations[animationLevel];
  }
}

// Utility Functions
export const themeUtils = {
  /**
   * Converts hex color to RGB values
   */
  hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },
  
  /**
   * Generates a contrasting color for text
   */
  getContrastColor(hexColor: string): string {
    const rgb = this.hexToRgb(hexColor);
    if (!rgb) return '#000000';
    
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  },
  
  /**
   * Creates a lighter or darker variant of a color
   */
  adjustColorBrightness(hexColor: string, percent: number): string {
    const rgb = this.hexToRgb(hexColor);
    if (!rgb) return hexColor;
    
    const adjust = (color: number) => {
      const adjusted = color + (255 - color) * (percent / 100);
      return Math.round(Math.min(255, Math.max(0, adjusted)));
    };
    
    const newR = adjust(rgb.r);
    const newG = adjust(rgb.g);
    const newB = adjust(rgb.b);
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  },
};

export default AI_THEMES;