/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    screens: {
      // Add custom height breakpoints
      'h-sm': { 'raw': '(min-height: 400px)' },
      'h-md': { 'raw': '(min-height: 625px)' },
      'h-sm': { 'raw': '(min-width: 400px)' },
      'h-md': { 'raw': '(min-width: 625px)' },
      
    },
    extend: {},
  },
  plugins: [],
}

