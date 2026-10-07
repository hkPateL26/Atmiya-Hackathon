/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        govNavy: '#003366',       // Primary — Deep Navy Blue
        govBlue: '#005A9C',       // Secondary — Government Blue
        govSaffron: '#FF9933',    // Accent — Saffron
        govGreen: '#138808',      // Success — India Green
        govBg: '#F5F7FA',         // Background — Off White
        govText: '#1F2937',       // Text — Dark Gray
      },
    },
  },
  plugins: [],
};
