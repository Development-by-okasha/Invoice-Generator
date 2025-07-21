/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        zinc: {
          900: "#18181b", // Replaces oklch-based zinc-900
          700: "#3f3f46", // Replaces oklch-based zinc-700
          600: "#52525b", // Replaces oklch-based zinc-600
        },
        gray: {
          200: "#e5e7eb", // Replaces oklch-based gray-200
        },
        blue: {
          600: "#2563eb", // Replaces oklch-based blue-600
          700: "#1d4ed8", // Replaces oklch-based blue-700
        },
        white: "#ffffff", // Explicit hex for white
      },
    },
  },
  plugins: [],
};
