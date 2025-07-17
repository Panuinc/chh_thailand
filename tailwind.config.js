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
        while: "#FFFFFF",
        dark: "#000000",
        default: "#e4e4e7",
        primary: "#000000",
        secondary: "#000000",
        success: "#00C853",
      },
      fontFamily: {
        kanit: ["var(--kanit)"],
        nunito: ["var(--nunito)"],
      },
    },
  },
  plugins: [heroui()],
};
