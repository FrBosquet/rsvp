const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        script: ['var(--font-script)'],
        serif: ['var(--font-serif)'],
        dancing: ['var(--font-dancing-script)'],
        noto: ['var(--font-noto-serif)'],
        fira: ['var(--font-fira-sans)'],
      },
      fontSize: {
        'xs': 'calc(var(--letter-size) * 0.5)',
        'sm': 'calc(var(--letter-size) * 0.75)',
        'base': 'calc(var(--letter-size))',
        'md': 'calc(var(--letter-size))',
        'lg': 'calc(var(--letter-size) * 1.3)',
        'xl': 'calc(var(--letter-size) * 1.6)',
        '2xl': 'calc(var(--letter-size) * 2)',
        '3xl': 'calc(var(--letter-size) * 3)',
        '4xl': 'calc(var(--letter-size) * 4)',
        '5xl': 'calc(var(--letter-size) * 5)',
        '6xl': 'calc(var(--letter-size) * 6)',
        '6xl': 'calc(var(--letter-size) * 6)',
        '7xl': 'calc(var(--letter-size) * 7)',
        reset: '1rem',
      },
      spacing: {
        'c100': 'calc(40 * var(--letter-size) / 100)',
        'c80': 'calc(40 * var(--letter-size) / 80)',
        'c75': 'calc(40 * var(--letter-size) / 75)',
        'c50': 'calc(40 * var(--letter-size) / 50)',
        'c40': 'calc(40 * var(--letter-size) / 40)',
        'c20': 'calc(40 * var(--letter-size) / 20)',
        'c30': 'calc(40 * var(--letter-size) / 30)',
        'c10': 'calc(40 * var(--letter-size) / 10)',
        'c8': 'calc(40 * var(--letter-size) / 8)',
        'c5': 'calc(40 * var(--letter-size) / 5)',
        'c1': 'calc(40 * var(--letter-size))',
        's-screen': ['100svh', '100vh'],
        'l-screen': ['100lvh', '100vh'],
        'd-screen': ['100dvh', '100vh'],
      },
      boxShadow: {
        heavy: '0 0 var(--letter-size) rgba(0, 0, 0, 0.5)',
      },
      lineHeight: {
        '08': '0.8',
      },
      letterSpacing: {
        'xl': '0.5rem',
        '2xl': '1rem',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        olive: {
          DEFAULT: '#758e54',
          '50': '#f4f6ef',
          '100': '#e5ebdc',
          '200': '#cedabc',
          '300': '#afc294',
          '400': '#92aa71',
          '500': '#758e54',
          '600': '#5a7040',
          '700': '#475734',
          '800': '#3b472d',
          '900': '#333d29',
          '950': '#192013',
        },

      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          "80%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        click: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.2)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'click': 'click 0.6s alternate infinite',
        'fade-in': 'fade-in 4s linear 1'
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
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
        '.text-inset': {
          'text-shadow': '0px 0px 2px rgba(0, 0, 0, 0.3)'
        },

        '.size-screen': {
          width: '100svw',
          height: '100svh',
        }
      })

      addComponents({
        '.card': {
          '--ratio': '1.8',
          '--available-height': ['100vh', '100dvh'],
          '--card-width': 'min(calc(min(90vw, calc((var(--available-height) / var(--ratio)) - 2rem))), calc(1020px / var(--ratio)))',
          '--card-height': 'calc(var(--card-width) * var(--ratio))',
          '--letter-size': 'calc(var(--card-height) / 40)',
          'display': 'flex',
          'padding': 'var(--letter-size)',
          'transform-style': 'preserve-3d',
          'width': 'var(--card-width)',
          'aspect-ratio': '1 / var(--ratio)',
          'transition': 'transform 2s ease-in-out, top 1s ease-in-out, opacity 150ms ease-in-out',
          'backface-visibility': 'hidden',
        },
        '.button-fill-base': {
          'background-size': '0%',
          'background-repeat': 'no-repeat',
          'background-image': 'linear-gradient(var(--bg-color), var(--bg-color))'
        },
        '.button-fill-hover': {
          'background-size': '100%'
        },

        '.acceptance-card': {
          'aspect-ratio': 'unset',
          height: 'calc(var(--available-height) * 0.7)',
          overflow: 'auto',
          transform: 'translateZ(0) rotateX(-10deg) translateY(100lvh)',
          transition: 'transform 650ms ease-in-out',
        },
        '.acceptance-card-visible': {
          'transform-origin': 'top center',
          transform: 'rotateX(4deg) translateY(calc(var(--available-height)*0.15))',
        },

        '.accepted-card': {
          transform: 'translateZ(calc(var(--letter-size) * 8)) rotateX(10deg) translateY(100svh)',
        },
        '.accepted-card-visible': {
          transform: 'translateZ(10px) rotateX(0deg) translateY(calc(var(--card-height) * 0.01))',
        },
      })
    })
  ],
  darkMode: 'class'
}

