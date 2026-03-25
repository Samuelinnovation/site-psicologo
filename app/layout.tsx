import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'


const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Richard - Psicologia e Bem-Estar',
  description: 'Psicólogo Richard - Cuidar da sua mente é o primeiro passo para uma vida melhor. Atendimento em terapia individual, ansiedade, depressão e consultas online.',
  generator: 'v0.app',
  keywords: ['psicólogo', 'terapia', 'ansiedade', 'depressão', 'saúde mental', 'bem-estar'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
