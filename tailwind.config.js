/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#002f6c",
        secondary: "#115cb9",
        background: "#f7f9fb",
        surface: "#ffffff",
        "surface-container": "#eceef0",
        outline: "#747781",
        "outline-variant": "#c4c6d2",
        "on-surface": "#191c1e",
        "on-surface-variant": "#434750",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      boxShadow: {
        document: "0 10px 40px -15px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
