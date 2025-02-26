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
        "414px": "414px", // Small devices
        "480px": "480px", // Small devices
        "600px": "600px", // Medium devices (large small devices)
        "768px": "768px", // Large small devices (tablets portrait)
        "800px": "800px", // Medium-large devices (tablets landscape)
        "992px": "992px", // Small laptops
        "1024px": "1024px", // Large tablets / medium laptops
        "1200px": "1200px", // Desktops (smaller)
        "1280px": "1280px", // Large laptops / small desktops
        "1366px": "1366px", // Larger laptops and small desktops
        "1440px": "1440px", // Larger laptops and small desktops
        "1600px": "1600px", // Ultra-large devices (ultrawide monitors)
        "1920px": "1920px", // Super large devices (4K displays)
      },

      fontFamily: {
        montserrat: ['"Montserrat"'],
        prata: ["var(--font-prata)"], // Ensure exact font name here
        'prata-regular': ['"Prata Regular"', "serif"], // Ensure exact font name here
      },
      colors: {
        primary: "#c7a652", // Primary background color
        "light-border": "#E9E9E9", // Light border color
        "active-text": "#C5A44B", // Text color on hover or active
        "dark-border": "#636363", // Dark border color
        "primary-text": "#333333", // Primary text color
      },
      backgroundImage: (theme) => ({
        "quote-icon": "url('/images/quote.png')",
        "quote-icon-white": "url('/images/quote-white.png')",
        "content-bg": "url('/images/main-background.webp')",
        "banner-mid-bg": "url('/images/banner/home-statistics.jpg')",
        "banner-mid-mobile-bg":
          "url('/images/banner/home-statistics-mobile.jpg')",
        "main-content-bg": "url('/images/banner/mainbg.webp')",
        "team-bg": "url('/images/team.webp')",
        "brown-overlay": "url('/images/brown-overlay.png')",
        'quote-header': "url('/images/bg-quote-header-left.png'), url('/images/bg-quote-header-right.png')",

      }),
      backgroundPosition: {
        'quote-header': 'left center, right center',
      },


      keyframes: {
        fade: {
          "0%": { filter: "brightness(0)", opacity: 0 },
          "50%": { filter: "brightness(0.5)", opacity: 0.7 },
          "100%": { filter: "brightness(1)", opacity: 1 },
        },
      },
      animation: { fade: "fade 1.5s ease-in-out" },
    },
  },
  plugins: [],
};
