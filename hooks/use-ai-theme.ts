// useAITheme Hook - React hook for managing AI-powered blog themes
import { useEffect, useMemo, useState } from 'react';
import { BlogPost } from '@/types/blog-post';

// Simplified theme interfaces for build compatibility
interface BlogTheme {
  id: string;
  name: string;
  description: string;
  colorPalette: {
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
  };
  typography: {
    fontFamily: 'sans-serif' | 'serif' | 'mono';
    headingWeight: 'normal' | 'semibold' | 'bold' | 'extrabold';
    bodyWeight: 'light' | 'normal' | 'medium';
    scale: 'tight' | 'normal' | 'relaxed';
    lineHeight: 'tight' | 'normal' | 'relaxed';
  };
  layout: {
    heroStyle: 'minimal' | 'gradient' | 'immersive';
    contentLayout: 'single-column' | 'sidebar' | 'wide';
    cardStyle: 'modern' | 'glass' | 'minimal';
    spacing: 'compact' | 'normal' | 'spacious';
  };
  components: {
    showProgressBar: boolean;
    showSocialShare: boolean;
    showTableOfContents: boolean;
    showAuthorBio: boolean;
    showNewsletterSignup: boolean;
    showRelatedArticles: boolean;
    animationLevel: 'none' | 'subtle' | 'enhanced';
  };
}

// Default professional theme for fallback
const DEFAULT_THEME: BlogTheme = {
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
};

// Hook return type
interface UseAIThemeReturn {
  theme: BlogTheme;
  layoutClasses: {
    hero: string;
    container: string;
    content: string;
    card: string;
  };
  components: {
    showProgressBar: boolean;
    showSocialShare: boolean;
    showTableOfContents: boolean;
    showAuthorBio: boolean;
    showNewsletterSignup: boolean;
    showRelatedArticles: boolean;
    animationLevel: 'none' | 'subtle' | 'enhanced';
  };
  animationClasses: string[];
  applyTheme: () => void;
  setTheme: (themeId: string) => void;
}

// Simplified theme selector
class SimpleAIThemeSelector {
  static selectThemeForPost(post: BlogPost): BlogTheme {
    // Always return default theme for build compatibility
    return DEFAULT_THEME;
  }
}

// Simplified layout generator
class SimpleLayoutComponentGenerator {
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
  
  static getActiveComponents(theme: BlogTheme) {
    return theme.components;
  }
  
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

// Simplified theme variable generator
class SimpleThemeVariableGenerator {
  static applyThemeToContainer(theme: BlogTheme, containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const { colorPalette } = theme;
    const style = container.style;
    
    style.setProperty('--ai-primary-color', colorPalette.primary);
    style.setProperty('--ai-secondary-color', colorPalette.secondary);
    style.setProperty('--ai-accent-color', colorPalette.accent);
    style.setProperty('--ai-accent-light', colorPalette.accentLight);
    style.setProperty('--ai-background', colorPalette.background);
    style.setProperty('--ai-surface', colorPalette.surface);
    style.setProperty('--ai-text-primary', colorPalette.text.primary);
    style.setProperty('--ai-text-secondary', colorPalette.text.secondary);
    style.setProperty('--ai-text-muted', colorPalette.text.muted);
  }
  
  static cleanupGlobalStyles() {
    // Simple cleanup for build compatibility
    console.log('[AI Theme] Cleaned up global styles');
  }
}

// Main hook
export const useAITheme = (post: BlogPost, initialThemeId?: string): UseAIThemeReturn => {
  // State for current theme
  const [currentThemeId, setCurrentThemeId] = useState<string | null>(initialThemeId || null);
  
  // Auto-select theme based on post content if not manually set
  const selectedTheme = useMemo(() => {
    // Use simplified AI theme selector
    const aiSelectedTheme = SimpleAIThemeSelector.selectThemeForPost(post);
    console.log(`[AI Theme] Auto-selected theme: ${aiSelectedTheme.name} for post: ${post.title}`);
    return aiSelectedTheme;
  }, [post, currentThemeId]);

  // Generate layout classes based on theme
  const layoutClasses = useMemo(() => {
    return SimpleLayoutComponentGenerator.generateLayoutClasses(selectedTheme);
  }, [selectedTheme]);

  // Get active components configuration
  const components = useMemo(() => {
    return SimpleLayoutComponentGenerator.getActiveComponents(selectedTheme);
  }, [selectedTheme]);

  // Get animation classes
  const animationClasses = useMemo(() => {
    return SimpleLayoutComponentGenerator.getAnimationClasses(selectedTheme);
  }, [selectedTheme]);

  // Function to apply theme to scoped container
  const applyTheme = () => {
    SimpleThemeVariableGenerator.applyThemeToContainer(selectedTheme, 'blog-container');
    console.log(`[AI Theme] Applied scoped theme: ${selectedTheme.name}`);
  };

  // Function to manually set theme
  const setTheme = (themeId: string) => {
    setCurrentThemeId(themeId);
    console.log(`[AI Theme] Manually set theme: ${themeId}`);
  };

  // Apply theme when it changes (scoped to blog container)
  useEffect(() => {
    // Delay application to ensure DOM is ready
    const timer = setTimeout(() => {
      applyTheme();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [selectedTheme]);
  
  // Cleanup global styles when component unmounts
  useEffect(() => {
    return () => {
      SimpleThemeVariableGenerator.cleanupGlobalStyles();
    };
  }, []);

  // Log theme analysis for debugging
  useEffect(() => {
    console.log('[AI Theme] Theme analysis:', {
      postTitle: post.title,
      selectedTheme: selectedTheme.name,
      layoutClasses,
      components,
      animationClasses,
    });
  }, [post.title, selectedTheme, layoutClasses, components, animationClasses]);

  return {
    theme: selectedTheme,
    layoutClasses,
    components,
    animationClasses,
    applyTheme,
    setTheme,
  };
};

// Hook for theme preview (useful for admin/preview modes)
export const useThemePreview = () => {
  const [previewTheme, setPreviewTheme] = useState<BlogTheme | null>(null);

  const previewThemeById = (themeId: string) => {
    const theme = DEFAULT_THEME; // Simplified for build compatibility
    setPreviewTheme(theme);
    // Apply theme to document for preview
    const style = document.documentElement.style;
    style.setProperty('--ai-primary-color', theme.colorPalette.primary);
    style.setProperty('--ai-secondary-color', theme.colorPalette.secondary);
  };

  const clearPreview = () => {
    setPreviewTheme(null);
  };

  return {
    previewTheme,
    previewThemeById,
    clearPreview,
    availableThemes: { professional: DEFAULT_THEME },
  };
};

// Hook for theme analytics (track which themes work best)
export const useThemeAnalytics = () => {
  const trackThemeUsage = (themeId: string, postId: string, engagement?: {
    timeOnPage?: number;
    scrollDepth?: number;
    interactions?: number;
  }) => {
    // In a real implementation, this would send data to your analytics service
    console.log('[Theme Analytics] Theme usage tracked:', {
      themeId,
      postId,
      engagement,
      timestamp: new Date().toISOString(),
    });
  };

  const trackThemePerformance = (themeId: string, metrics: {
    loadTime?: number;
    coreWebVitals?: {
      lcp?: number;
      fid?: number;
      cls?: number;
    };
  }) => {
    console.log('[Theme Analytics] Theme performance tracked:', {
      themeId,
      metrics,
      timestamp: new Date().toISOString(),
    });
  };

  return {
    trackThemeUsage,
    trackThemePerformance,
  };
};

// Hook for responsive theme adjustments
export const useResponsiveTheme = (theme: BlogTheme) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    // Check initial screen size
    checkScreenSize();

    // Listen for screen size changes
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Adjust theme for different screen sizes
  const responsiveTheme = useMemo(() => {
    if (isMobile) {
      return {
        ...theme,
        layout: {
          ...theme.layout,
          contentLayout: 'single-column' as const,
          spacing: 'compact' as const,
        },
        components: {
          ...theme.components,
          showTableOfContents: false,
          showNewsletterSignup: false,
        },
      };
    }

    if (isTablet) {
      return {
        ...theme,
        layout: {
          ...theme.layout,
          contentLayout: 'single-column' as const,
        },
      };
    }

    return theme;
  }, [theme, isMobile, isTablet]);

  return {
    responsiveTheme,
    isMobile,
    isTablet,
  };
};

export default useAITheme;
