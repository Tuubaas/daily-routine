/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ["var(--font-inter)"],
      },
      colors: {
        "dominant": "#fefefe",
        "secondary": "#6b8fa7",
        "accent": "#b5a793",
      },
      minWidth: {
        "1/4": "25%",
        "1/3": "33%",
        "1/2": "50%",
        "2/3": "67%",
        "3/4": "75%",
      },
    },
  },
  plugins: [],
};
