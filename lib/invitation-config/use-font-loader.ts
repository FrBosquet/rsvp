import { useLayoutEffect } from 'react'

import { fonts } from './fonts'

export const useFontLoader = (fontName?: string) => {
  useLayoutEffect(() => {
    const oldStyle = document.getElementById('injected-style')

    if (oldStyle) {
      document.head.removeChild(oldStyle)
    }

    if (!fontName) return

    const font = fonts.find((font) => font.short === fontName)

    if (!font) return

    const style = document.createElement('style')
    style.id = 'injected-style'
    style.innerHTML = `
     ${font.import}

      :root {
        --card-font-serif: ${font.value};
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [fontName])
}
