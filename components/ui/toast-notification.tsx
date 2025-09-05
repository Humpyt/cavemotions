"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Info, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ToastProps {
  id: string
  title?: string
  description: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  onClose?: () => void
}

interface ToastNotificationProps extends ToastProps {
  onRemove: (id: string) => void
}

const icons = {
  success: Check,
  error: AlertCircle,
  info: Info,
  warning: AlertCircle,
}

const styles = {
  success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300',
  error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300',
  info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300',
}

export function ToastNotification({
  id,
  title,
  description,
  type = 'info',
  duration = 4000,
  onRemove,
}: ToastNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, id, onRemove])

  const Icon = icons[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={cn(
        'relative flex w-full max-w-sm items-center space-x-3 rounded-lg border p-4 shadow-lg',
        styles[type]
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <div className="flex-1">
        {title && (
          <div className="text-sm font-medium">{title}</div>
        )}
        <div className={cn('text-sm', title && 'text-opacity-90')}>
          {description}
        </div>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="absolute right-2 top-2 rounded-md p-1 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

// Toast container component
export function ToastContainer({ 
  toasts, 
  onRemove 
}: { 
  toasts: ToastProps[]
  onRemove: (id: string) => void 
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastNotification
            key={toast.id}
            {...toast}
            onRemove={onRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = (toast: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
    return id
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const success = (description: string, title?: string) => 
    addToast({ type: 'success', description, title })

  const error = (description: string, title?: string) => 
    addToast({ type: 'error', description, title })

  const info = (description: string, title?: string) => 
    addToast({ type: 'info', description, title })

  const warning = (description: string, title?: string) => 
    addToast({ type: 'warning', description, title })

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  }
}