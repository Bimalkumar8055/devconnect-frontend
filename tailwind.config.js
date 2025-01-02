/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Use imported DaisyUI
  daisyui: {
    themes: ["light", "dark", "cupcake", "lemonade",], // Replace with your desired themes
  },
};
