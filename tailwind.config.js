// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        '2xl': ['1.5rem', '2rem'], // Titel
        xl: ['1.25rem', '1.75rem'], // Fragen
        base: ['1rem', '1.5rem'], // Antworten
      },
    },
  },
  plugins: [],
}
