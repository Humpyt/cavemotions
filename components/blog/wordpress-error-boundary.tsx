'use client'

import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface WordPressErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface WordPressErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class WordPressErrorBoundary extends React.Component<
  WordPressErrorBoundaryProps,
  WordPressErrorBoundaryState
> {
  constructor(props: WordPressErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): WordPressErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console (in production, send to logging service)
    console.error('WordPress Blog Error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
    // Force a page refresh to retry loading
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
              <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <AlertTitle className="text-orange-800 dark:text-orange-200">
                Blog Content Unavailable
              </AlertTitle>
              <AlertDescription className="text-orange-700 dark:text-orange-300 mt-2">
                We're having trouble loading the blog content. This might be due to a temporary connection issue.
              </AlertDescription>
            </Alert>
            
            <div className="mt-4 flex gap-2">
              <Button 
                onClick={this.handleRetry}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              
              <Button 
                onClick={() => window.location.href = '/blog'}
                variant="default"
              >
                View Enhanced Blog
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook version for functional components
export function useWordPressErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  const handleError = React.useCallback((error: Error) => {
    console.error('WordPress API Error:', error)
    setError(error)
  }, [])

  const clearError = React.useCallback(() => {
    setError(null)
  }, [])

  return { error, handleError, clearError }
}

// Fallback component for loading states
export function WordPressBlogFallback() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading blog content...</p>
      </div>
    </div>
  )
}