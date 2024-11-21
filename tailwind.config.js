/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "320px": "320px", // Extra extra small devices
        "360px": "360px", // Extra small devices
        "480px": "480px", // Small devices
        "600px": "600px", // Medium devices (large small devices)
        "768px": "768px", // Large small devices (tablets portrait)
        "800px": "800px", // Medium-large devices (tablets landscape)
        "992px": "992px", // Small laptops
        "1024px": "1024px", // Large tablets / medium laptops
        "1200px": "1200px", // Desktops (smaller)
        "1280px": "1280px", // Large laptops / small desktops
        "1366px": "1366px", // Larger laptops and small desktops
        "1600px": "1600px", // Ultra-large devices (ultrawide monitors)
        "1920px": "1920px", // Super large devices (4K displays)
      },

      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        prata: ["var(--font-prata)"],
      },
      colors: {
        primary: "#C7A652", // Primary background color
        "light-border": "#E9E9E9", // Light border color
        "active-text": "#C5A44B", // Text color on hover or active
        "dark-border": "#636363", // Dark border color
        "primary-text": "#333333", // Primary text color
      },
      backgroundImage: (theme) => ({
        "quote-icon": "url('/images/quote.png')",
        "quote-icon-white": "url('/images/quote-white.png')",
      }),
    },
  },
  plugins: [],
};
