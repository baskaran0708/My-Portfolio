/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: { 200: "#D5DAE1" },
        black: {
          DEFAULT: "#000",
          500: "#1D2235",
          100: "#000319",
          200: "#0D0D2B",
          300: "#1A1A3E",
        },
        blue: { 500: "#2b77e7" },
        purple: "#CBACF9",
        "white-100": "#BEC1DD",
        "white-200": "#C1C2D3",
      },
      fontFamily: {
        worksans: ["Work Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
      },
      keyframes: {
        spotlight: {
          "0%": { opacity: 0, transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: 1, transform: "translate(-50%, -40%) scale(1)" },
        },
        scroll: {
          to: { transform: "translate(calc(-50% - 0.5rem))" },
        },
      },
      animation: {
        spotlight: "spotlight 2s ease 0.75s 1 forwards",
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
    },
  },
  plugins: [],
};
