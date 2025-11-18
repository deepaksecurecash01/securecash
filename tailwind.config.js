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
        // Keeping key mobile/tablet breakpoints
        "480px": "480px",
        "600px": "600px",
        "768px": "768px",

        // Keeping key desktop/layout breakpoints
        "992px": "992px",
        "1024px": "1024px",
        "1200px": "1200px",
        "1440px": "1440px",
        "1600px": "1600px",
        // Default Tailwind sizes cover 320, 360, 414, 1280 (lg), 1536 (2xl) implicitly.
        // Removed highly redundant sizes for cleaner output.
      },

      fontFamily: {
        // Uses next/font variables, critical for FOUT prevention.
        montserrat: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        prata: ["var(--font-prata)", "Georgia", "serif"],
        "prata-regular": ["var(--font-prata)", "Georgia", "serif"],
        times: ['"Times New Roman"', "Times", "serif"],
      },

      colors: {
        // Design colors remain untouched as per guidelines
        primary: "#c7a652",
        link: "#957433",
        "light-border": "#E9E9E9",
        "active-text": "#C5A44B",
        "dark-border": "#636363",
        "primary-text": "#333333",
      },

      // 💥 OPTIMIZATION FIX: All static background images removed.
      // These must now be implemented using the Next.js <Image> component 
      // within the relevant components for format optimization and lazy loading.

      backgroundPosition: {
        "quote-header": "left center, right center",
      },

      keyframes: {
        fade: {
          "0%": { filter: "brightness(0)", opacity: "0" },
          "50%": { filter: "brightness(0.5)", opacity: "0.7" },
          "100%": { filter: "brightness(1)", opacity: "1" },
        },
      },

      animation: {
        fade: "fade 1.5s ease-in-out",
      },
    },
  },

  plugins: [],
};