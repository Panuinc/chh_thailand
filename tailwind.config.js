/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "##006FEE",
        secondary: "##7828c8",
        success: "##17c964",
        warning: "##f5a524",
        danger: "##f31260",

        light: {
          background: "#ffffff",
          border: "##000000",
          text: "##000000",
        },

        dark: {
          background: "#000000",
          border: "##ffffff",
          text: "##ffffff",
        },
      },
      fontFamily: {
        kanit: ["var(--kanit)"],
        nunito: ["var(--nunito)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
