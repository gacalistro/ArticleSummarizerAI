/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        orange: {
          theme: "#F5BC66",
        },
      },
    },
  },
  plugins: [],
};
