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
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#006FEE",
        secondary: "#7828c8",
        success: "#17c964",
        warning: "#f5a524",
        danger: "#f31260",

        light: {
          background: "#ffffff",
          border: "#e4e4e7",
          text: "#11181C",
          default: "#e4e4e7",
        },

        dark: {
          background: "#000000",
          border: "#3f3f46",
          text: "#ECEDEE",
          default: "#3f3f46",
        },
      },
      fontFamily: {
        kanit: ["var(--kanit)"],
        nunito: ["var(--nunito)"],
      },
    },
  },
  plugins: [heroui()],
};
