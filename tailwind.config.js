const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ['var(--font-script)'],
        serif: ['var(--font-serif)'],
      },
      fontSize: {
        'xs': 'calc(var(--letter-size) * 0.5)',
        'sm': 'calc(var(--letter-size) * 0.75)',
        'base': 'calc(var(--letter-size))',
        'lg': 'calc(var(--letter-size) * 1.3)',
        'xl': 'calc(var(--letter-size) * 1.6)',
        '2xl': 'calc(var(--letter-size) * 2)',
        '3xl': 'calc(var(--letter-size) * 3)',
        '4xl': 'calc(var(--letter-size) * 4)',
        '5xl': 'calc(var(--letter-size) * 5)',
        '6xl': 'calc(var(--letter-size) * 6)',
        '6xl': 'calc(var(--letter-size) * 6)',
        '7xl': 'calc(var(--letter-size) * 7)'
      },
      spacing: {
        'c100': 'calc(20 * var(--letter-size) / 100)',
        'c80': 'calc(20 * var(--letter-size) / 80)',
        'c75': 'calc(20 * var(--letter-size) / 75)',
        'c50': 'calc(20 * var(--letter-size) / 50)',
        'c20': 'calc(20 * var(--letter-size) / 20)',
        'c10': 'calc(20 * var(--letter-size) / 10)',
        'c8': 'calc(20 * var(--letter-size) / 8)',
        'c5': 'calc(20 * var(--letter-size) / 5)',
        'c1': 'calc(20 * var(--letter-size))',
      },
      animation: {
        'click': 'click 0.6s alternate infinite',
        'fade-in': 'fade-in 4s linear 1'
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents, theme }) {

      addUtilities({
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.perspective': {
          'perspective': '1600px',
        },
        '.flipped-front': {
          'transform': 'rotateY(180deg) rotateX(-15deg) translatey(calc(-1 * var(--card-height) / 10))',
        },
        '.flipped-non-front': {
          'transform': 'rotateY(0deg)',
        },
        '.flipped-back': {
          'transform': 'rotateY(360deg)',
        },
        '.flipped-non-back': {
          'transform': 'rotateY(180deg) rotateX(15deg) translatey(calc(-1 * var(--card-height) / 10))',
        },
        '.bg-color-emerald': {
          '--bg-color': 'rgba(16, 185, 129, 0.10)'
        },
        '.bg-color-rose': {
          '--bg-color': 'rgba(248, 113, 113, 0.10)'
        },
      })

      addComponents({
        '.card': {
          '--ratio': '1.8',
          '--card-width': 'min(calc(min(90vw, calc((100vh / var(--ratio)) - 2rem))), calc(1020px / var(--ratio)))',
          '--card-height': 'calc(var(--card-width) * var(--ratio))',
          '--letter-size': 'calc(var(--card-width) / 20)',
          'display': 'flex',
          'padding': 'var(--letter-size)',
          'transform-style': 'preserve-3d',
          'width': 'var(--card-width)',
          'aspect-ratio': '1 / var(--ratio)',
          'transition': 'transform 2s ease-in-out',
        },
        '.button-fill-base': {
          'background-size': '0%',
          'background-repeat': 'no-repeat',
          'background-image': 'linear-gradient(var(--bg-color), var(--bg-color))'
        },
        '.button-fill-hover': {
          'background-size': '100%'
        },
      })
    })
  ],
  darkMode: 'class'
}

