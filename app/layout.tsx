import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk'
})

export const metadata: Metadata = {
  title: 'JDComercial - Ecossistema Digital Angolano',
  description: 'Plataforma 100% angolana para aprendizagem, venda de produtos digitais, blog, freelancing e ferramentas online. Aprende, vende e cresce com JDComercial.',
  keywords: ['Angola', 'cursos online', 'produtos digitais', 'freelance', 'programação', 'ecommerce', 'Luanda'],
  authors: [{ name: 'JDComercial' }],
  openGraph: {
    title: 'JDComercial - Ecossistema Digital Angolano',
    description: 'Plataforma 100% angolana para aprendizagem, venda de produtos digitais, blog, freelancing e ferramentas online.',
    locale: 'pt_AO',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className={`${inter.variable} ${spaceGrotesk.variable} dark bg-background`}>
      <body className="font-sans antialiased min-h-screen bg-gradient-to-b from-[#1a0f0a] via-[#2d1810] to-[#1a0f0a]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
