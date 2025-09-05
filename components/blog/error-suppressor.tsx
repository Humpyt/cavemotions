'use client'

import { useEffect } from 'react'

/**
 * Component to suppress Chrome extension errors that are not related to our application
 * These errors come from browser extensions and should not affect the user experience
 */
export function ErrorSuppressor() {
  useEffect(() => {
    // Store original console.error
    const originalConsoleError = console.error
    
    // Override console.error to filter out extension-related errors
    console.error = (...args) => {
      const message = args.join(' ')
      
      // List of error patterns to suppress (Chrome extension related)
      const suppressPatterns = [
        'enable_click_download',
        'Access to storage is not allowed from this context',
        'chrome-extension://',
        'contentScript.bundle.js',
        'Unchecked runtime.lastError'
      ]
      
      // Check if the error message contains any suppression patterns
      const shouldSuppress = suppressPatterns.some(pattern => 
        message.toLowerCase().includes(pattern.toLowerCase())
      )
      
      // Only log errors that are not from extensions
      if (!shouldSuppress) {
        originalConsoleError.apply(console, args)
      }
    }
    
    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const message = event.reason?.message || event.reason || ''
      
      // Suppress extension-related promise rejections
      if (typeof message === 'string') {
        const suppressPatterns = [
          'enable_click_download',
          'Access to storage is not allowed from this context',
          'chrome-extension://'
        ]
        
        const shouldSuppress = suppressPatterns.some(pattern => 
          message.toLowerCase().includes(pattern.toLowerCase())
        )
        
        if (shouldSuppress) {
          event.preventDefault()
          return
        }
      }
    }
    
    // Handle general errors
    const handleError = (event: ErrorEvent) => {
      const message = event.message || ''
      
      // Suppress extension-related errors
      const suppressPatterns = [
        'enable_click_download',
        'Access to storage is not allowed from this context',
        'chrome-extension://',
        'contentScript.bundle.js'
      ]
      
      const shouldSuppress = suppressPatterns.some(pattern => 
        message.toLowerCase().includes(pattern.toLowerCase())
      )
      
      if (shouldSuppress) {
        event.preventDefault()
        return
      }
    }
    
    // Add event listeners
    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    window.addEventListener('error', handleError)
    
    // Cleanup function
    return () => {
      console.error = originalConsoleError
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.removeEventListener('error', handleError)
    }
  }, [])
  
  return null // This component doesn't render anything
}

/**
 * Hook to suppress extension errors in functional components
 */
export function useErrorSuppression() {
  useEffect(() => {
    // Create a more targeted error handler for WordPress blog errors
    const handleWordPressError = (error: any) => {
      // Log WordPress-related errors for debugging
      if (error?.message?.includes('wordpress') || error?.message?.includes('wp-json')) {
        console.warn('WordPress API Error (handled):', error)
        return true // Handled
      }
      return false // Not handled
    }
    
    return () => {
      // Cleanup if needed
    }
  }, [])
}