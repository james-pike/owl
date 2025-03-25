/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
import flowbitePlugin from 'flowbite/plugin';


module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-qwik/**/*.{cjs,mjs}",
    "./src/**/*.{html,js,jsx,ts,tsx,mdx}"
  ],  theme: {
    extend: {
          '4.5xl': ['2.625rem', { lineHeight: '2.75rem' }],
      colors: {
        primary: colors.red,
          secondary: {
          50: '#E6FAF5',
          100: '#C7F5EA',
          200: '#A0F0E0',
          300: '#49EACB',
          400: '#4DD9C4',
          500: '#70C7BA',
          600: '#5AA9A0',
          700: '#468C85',
          800: '#346F68',
          900: '#23544F',
        },
      },
      fontFamily: {
        sans: ["'Inter Variable'", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '4.5xl': ['2.625rem', { lineHeight: '2.75rem' }],
      },
      animation: {
        'from-left': 'slideFromLeft 0.2s 1',
        'from-right': 'slideFromRight 0.2s 1',
        'accordion-up': 'collapsible-up 0.2s ease-out 0s 1 normal forwards',
        'accordion-down': 'collapsible-down 0.2s ease-out 0s 1 normal forwards',
        'fade-up': 'fadeUp 0.5s ease-in forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)' 
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)' 
          },
        },
        slideFromLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideFromRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--qwikui-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--qwikui-collapsible-content-height)' },
          to: { height: '0' },
        },
    },
  },
  },
  plugins: [require("@tailwindcss/typography"),
    require('tailwindcss-animate'),
    require('tailwindcss-motion'),
    require('tailwindcss-intersect'),
     [flowbitePlugin]],
  darkMode: "class",
};
