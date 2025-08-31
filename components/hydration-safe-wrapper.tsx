"use client"

import { useEffect } from "react"

/**
 * HydrationSafeWrapper component that handles browser extension attributes
 * that can cause hydration mismatches (like bis_skin_checked from BitDefender)
 */
export default function HydrationSafeWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Clean up browser extension attributes that cause hydration mismatches
    const cleanupBrowserExtensionAttributes = () => {
      // Common browser extension attributes that cause hydration issues
      const extensionAttributes = [
        'bis_skin_checked', // BitDefender
        'data-adblock-key', // AdBlock
        'data-lastpass-icon-root', // LastPass
        'data-1p-ignore', // 1Password
        'data-gramm', // Grammarly
        'data-gramm_editor', // Grammarly
        'spellcheck', // Various extensions
      ]

      // Remove these attributes from all elements
      extensionAttributes.forEach(attr => {
        const elements = document.querySelectorAll(`[${attr}]`)
        elements.forEach(element => {
          element.removeAttribute(attr)
        })
      })
    }

    // Run cleanup after hydration
    cleanupBrowserExtensionAttributes()

    // Set up a MutationObserver to handle dynamically added extension attributes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const target = mutation.target as Element
          const attributeName = mutation.attributeName
          
          // Remove problematic extension attributes as they're added
          if (attributeName && (
            attributeName.includes('bis_skin_checked') ||
            attributeName.includes('data-adblock') ||
            attributeName.includes('data-lastpass') ||
            attributeName.includes('data-1p-ignore') ||
            attributeName.includes('data-gramm')
          )) {
            target.removeAttribute(attributeName)
          }
        }
      })
    })

    // Observe the entire document for attribute changes
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: [
        'bis_skin_checked',
        'data-adblock-key',
        'data-lastpass-icon-root',
        'data-1p-ignore',
        'data-gramm',
        'data-gramm_editor',
      ]
    })

    // Cleanup observer on unmount
    return () => {
      observer.disconnect()
    }
  }, [])

  return <>{children}</>
}