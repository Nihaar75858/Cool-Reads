/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        custombg: '#f5e0c5',
        logobg: '#283e50',
        navtext: '#b5ecdf',
        borderbg: '#4d2e19',
      },
    },
  },
  plugins: [],
}

