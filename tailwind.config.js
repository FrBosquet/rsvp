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
      },
      fontSize: {
        'xs': 'calc(var(--letter-size) * 0.5)',
        'sm': 'calc(var(--letter-size) * 0.75)',
        'text-base': 'calc(var(--letter-size))',
        'xl': 'calc(var(--letter-size) * 1.5)',
        '2xl': 'calc(var(--letter-size) * 2)',
        '3xl': 'calc(var(--letter-size) * 3)',
        '4xl': 'calc(var(--letter-size) * 4)',
        '5xl': 'calc(var(--letter-size) * 5)',
        '6xl': 'calc(var(--letter-size) * 6)',
        '6xl': 'calc(var(--letter-size) * 6)',
        '7xl': 'calc(var(--letter-size) * 7)'
      },
      spacing: {
        'c10': 'calc(var(--card-height) / 10)',
        'c8': 'calc(var(--card-height) / 8)',
        'c5': 'calc(var(--card-height) / 5)',
        'c1': 'calc(var(--card-height))',
      },
      animation: {
        'click': 'click 0.6s alternate infinite',
        'fade-in': 'fade-in 4s linear 1'
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents }) {

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
      })

      addComponents({
        '.card': {
          '--ratio': '2',
          '--card-width': 'min(calc(min(90vw, calc(50vh - 2rem))), 520px)',
          '--card-height': 'calc(var(--card-width) * var(--ratio))',
          '--letter-size': 'calc(var(--card-width) / 40)',
          'display': 'flex',
          'padding': 'var(--letter-size)',
          'transform-style': 'preserve-3d',
          'width': 'var(--card-width)',
          'aspect-ratio': '1 / var(--ratio)',
          'transition': 'transform 2s ease-in-out',
        }
      })
    })
  ],
  darkMode: 'class'
}

