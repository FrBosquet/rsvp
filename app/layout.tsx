import { Amatic_SC, Jost } from 'next/font/google'

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

const amatic = Amatic_SC({
  weight: ['400', '700'],
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
      <body className={`dark min-h-screen bg-orange-200 ${jost.className} ${amatic.variable}`}>{children}</body>
    </html>
  )
}
