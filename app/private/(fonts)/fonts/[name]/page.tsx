'use client'

import { fonts } from '@/lib/invitation-config/fonts'
import { useFontLoader } from '@/lib/invitation-config/use-font-loader'

interface Route {
  params: {
    name: string
  }
}

export default function FontPage({ params }: Route) {
  const { name } = params

  const font = fonts.find((font) => font.short === name)

  useFontLoader(font?.name)

  if (!font) {
    return (
      <div>
        <h1>Font not found</h1>
      </div>
    )
  }

  const style = {
    '--card-unit': '2.2vh',
    '--card-font-serif': font.value
  } as React.CSSProperties

  return (
    <div
      className="flex items-center justify-center bg-zinc-300 text-zinc-800 size-screen"
      style={style}
    >
      <h1 className="text-center text-card-big font-card-serif">{font.name}</h1>
    </div>
  )
}
