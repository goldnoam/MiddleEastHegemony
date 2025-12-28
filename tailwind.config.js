
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'glitch': 'glitch 0.3s cubic-bezier(.25,.46,.45,.94) both infinite',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)', clipPath: 'inset(44% 0 56% 0)' },
          '20%': { transform: 'translate(-2px, 2px)', clipPath: 'inset(12% 0 88% 0)' },
          '40%': { transform: 'translate(-2px, -2px)', clipPath: 'inset(62% 0 38% 0)' },
          '60%': { transform: 'translate(2px, 2px)', clipPath: 'inset(21% 0 79% 0)' },
          '80%': { transform: 'translate(2px, -2px)', clipPath: 'inset(89% 0 11% 0)' },
          '100%': { transform: 'translate(0)', clipPath: 'inset(54% 0 46% 0)' },
        }
      }
    },
  },
  plugins: [],
}
