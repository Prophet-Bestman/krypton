/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0071bd",
        primaryBg: "#242424",
        secondaryBg: "#001529",
        textPrimary: "#fff",
      },
    },
  },
  plugins: [],
};
