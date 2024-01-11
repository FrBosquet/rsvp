import { Forum, Jost, WindSong } from 'next/font/google'

import '@/styles/globals.css'

export const metadata = {
  title: 'Jana Y Odette',
  description: 'Invitación a la boda de Jana y Odette',
}

const jost = Jost({
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
    <html lang="en" className={jost.className}>
      <body className={`dark min-h-screen bg-zinc-600 ${jost.className} ${script.variable} ${serif.variable}`}>{children}</body>
    </html>
  )
}
