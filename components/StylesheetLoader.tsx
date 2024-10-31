'use client'

import { useEffect } from 'react'
import '../app/globals.css'

export default function StylesheetLoader() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/globals.css'
    link.media = 'print'
    link.onload = () => {
      link.media = 'all'
    }
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])
  
  return null
} 