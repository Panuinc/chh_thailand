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
        default: "#E4E4E4",
        primary: "#000000",
        secondary: "#000000",
      },
      fontFamily: {
        kanit: ["var(--kanit)"],
        nunito: ["var(--nunito)"],
      },
    },
  },
  plugins: [heroui()],
};

//         while: "#FFFFFF",
//         dark: "#1B1A1D",
//         default: "#E4E4E4",
//         primary: "#F8FF00",
//         secondary: "#303234",
//         bg: "#F0F0F0",
