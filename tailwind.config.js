/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx, tx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
