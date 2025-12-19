/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true, // ✅ Disables hover on touch devices
  },

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      screens: {
        "320px": "320px",
        "360px": "360px",
        "414px": "414px",
        "480px": "480px",
        "600px": "600px",
        "720px": "720px",
        "768px": "768px",
        "800px": "800px",
        "992px": "992px",
        "1024px": "1024px",
        "1070px": "1070px",
        "1100px": "1100px",
        "1200px": "1200px",
        "1280px": "1280px",
        "1366px": "1366px",
        "1440px": "1440px",
        "1600px": "1600px",
        "1920px": "1920px",
      },

      fontFamily: {
        montserrat: ['"Montserrat"'],
        times: ['"Times New Roman"', "Times", "serif"],
        prata: ["var(--font-prata)"],
        'prata-regular': ['"Prata Regular"', "serif"],
      },

      colors: {
        primary: "#c7a652",
        link: "#957433",
        "light-border": "#E9E9E9",
        "active-text": "#C5A44B",
        "dark-border": "#636363",
        "primary-text": "#333333",
      },

      backgroundImage: {
        "content-bg": "url('/images/main-background.webp')",
        "banner-mid-bg": "url('/images/banner/home-statistics.avif')",
        "banner-mid-mobile-bg": "url('/images/banner/home-statistics-mobile.avif')",
        "main-content-bg": "url('/images/banner/mainbg.webp')",
        "team-bg": "url('/images/team.png')",
        "brown-overlay": "url('/images/brown-overlay.png')",
        "quote-header": "url('/images/bg-quote-header-left.avif'), url('/images/bg-quote-header-right.avif')",
        "quote-header-right": "url('/images/bg-quote-header-right.avif')",
        "quote-header-left": "url('/images/bg-quote-header-left.avif')",
        "contact-bg": "url('/images/mainbg-contact.avif')",
      },

      backgroundPosition: {
        "quote-header": "left center, right center",
      },

      keyframes: {
        fade: {
          "0%": { filter: "brightness(0)", opacity: "0" },
          "50%": { filter: "brightness(0.5)", opacity: "0.7" },
          "100%": { filter: "brightness(1)", opacity: "1" },
        },
        'slide-down': {
          'from': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'progress-bar': {
          'from': { width: '100%' },
          'to': { width: '0%' },
        },
      },

      animation: {
        fade: "fade 1.5s ease-in-out",
        'slide-down': 'slide-down 0.3s ease-out forwards',
        'progress-bar': 'progress-bar 5s linear forwards',
      },
    },
  },

  plugins: [],
};