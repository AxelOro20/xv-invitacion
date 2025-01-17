/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        burtonBlack: "#0d0d0d",
        burtonPurple: "#4a154b",
      },
      fontFamily: {
        harry: ['"Harry P"', 'serif'],
      },
    },
  },
  plugins: [],
}

