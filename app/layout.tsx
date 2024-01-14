import { Forum, Jost, WindSong } from 'next/font/google'

import '@/styles/globals.css'
import { esES } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'Jana Y Odette',
  description: 'Invitación a la boda de Jana y Odette',
}

const sans = Jost({
  weight: ['200', '400', '600'],
  subsets: ['latin'],
  display: 'swap',
})

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="en" className={sans.className}>
        <body className={`dark min-h-screen bg-zinc-600 ${sans.className} ${script.variable} ${serif.variable}`}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
