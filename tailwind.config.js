/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4D148C",
        secondary: "#FF6600",
        background: "#F8F9FB",
        card: "#FFFFFF",
        "text-primary": "#1F2937",
        success: "#16A34A",
        warning: "#F59E0B",
        critical: "#DC2626",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
