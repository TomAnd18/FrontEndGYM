/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlack: "#fff",
      },
      fontSize: {
        xxs: "0.6rem", // Personaliza el tamaño de fuente, aquí es 10px
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
