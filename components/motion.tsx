"use client"

import type React from "react"

export const motion = {
  div: "div",
  span: "span",
  button: "button",
  a: "a",
  ul: "ul",
  li: "li",
  p: "p",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  section: "section",
  article: "article",
  nav: "nav",
  aside: "aside",
  header: "header",
  footer: "footer",
  main: "main",
}

// Add Motion export to fix import errors
export const Motion = motion

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}
