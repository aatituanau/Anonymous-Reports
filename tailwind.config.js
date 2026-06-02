/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a", /* slate-900 */
        secondary: "#2563eb", /* blue-600 */
        accent: "#4f46e5", /* indigo-600 */
        background: "#f8fafc", /* slate-50 */
        surface: "#ffffff",
        "surface-container": "#f1f5f9",
        outline: "#94a3b8",
        "outline-variant": "#cbd5e1",
        "on-surface": "#0f172a",
        "on-surface-variant": "#475569",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      boxShadow: {
        document: "0 20px 40px -15px rgba(0, 0, 0, 0.05)",
      }
    },
  },
  plugins: [],
};
