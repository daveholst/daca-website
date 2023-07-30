/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans3: ["var(--font-montserrat)", "Arial"],
      sans2: ["var(--font-bungee)", "Arial"],
      sans: ["var(--font-quicksand)", "Arial"],
    },
    extend: {},
  },
  plugins: [],
};
