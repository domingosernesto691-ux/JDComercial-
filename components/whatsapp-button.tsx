"use client"

import { MessageCircle } from 'lucide-react'
import { WHATSAPP_LINK } from '@/lib/store'

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform animate-pulse-glow"
      aria-label="Contactar via WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </a>
  )
}
