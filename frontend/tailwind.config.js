/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        b: "700px",
      },
      height: {
        45: "175px",
        90: "90%",
      },
      boxShadow: {
        "3xl": "0 20px 45px 20px rgba(0, 0, 0, 0.15)",
        "3xl-l": "0 20px 45px 20px rgba(100, 100, 100, 0.15)",
      },
      margin: {
        25: "25%",
        33: "32.5%",
        50: "50%",
        75: "75%",
      },
      spacing: {
        '0.8': '2.5px',
        '0.9': '3px',
        '7.5': '30px',
      },
    },
  },
  plugins: [],
};
