"use client"

import { useState, useEffect } from "react"

/**
 * This component prevents its children from rendering on the server and during the initial client-side hydration pass.
 * It then enables rendering on the client via a `useEffect` hook.
 * This is a common workaround for hydration mismatch errors caused by browser extensions that modify the DOM.
 */
export default function HydrationSafeWrapper({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return <>{isClient ? children : null}</>
}