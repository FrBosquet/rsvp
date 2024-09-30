import '@/styles/globals.css'

import { type Viewport } from 'next'
import {
  Dancing_Script,
  Fira_Sans,
  Forum,
  Noto_Serif,
  WindSong
} from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

import { CustomClerkProvider } from '@/components/providers/custom-clerk'
import { QueryProvider } from '@/components/providers/query'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: 'RSVP - Devaux',
  description:
    'Tus invitaciones de boda de forma digital, sencilla y económica. Gestiona tu lista de invitados y recibe confirmaciones de asistencia en tiempo real.'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false
}

const serif = Forum({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif'
})

const script = WindSong({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-script'
})

const dancingScript = Dancing_Script({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing-script'
})

const noto = Noto_Serif({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans'
})

const fira = Fira_Sans({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-sans'
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`min-h-s-screen antialiased ${noto.className} ${script.variable} ${serif.variable} ${dancingScript.variable} ${noto.variable} ${fira.variable}`}
      >
        <QueryProvider>
          <CustomClerkProvider>
            <NextTopLoader color="#5e636e" height={8} showSpinner={false} />
            <Toaster richColors />

            {children}
          </CustomClerkProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
