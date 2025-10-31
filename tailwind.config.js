/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // ✅ ADDED: Enable JIT mode for smaller CSS output
  mode: 'jit',

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
        montserrat: ['"Montserrat"', 'system-ui', 'sans-serif'],  // ✅ Added fallbacks
        times: ['"Times New Roman"', "Times", "serif"],
        prata: ["var(--font-prata)", 'Georgia', 'serif'],  // ✅ Added fallbacks
        'prata-regular': ['"Prata Regular"', "serif"],
      },

      colors: {
        primary: "#c7a652",
        "link": "#957433",
        "light-border": "#E9E9E9",
        "active-text": "#C5A44B",
        "dark-border": "#636363",
        "primary-text": "#333333",
      },

      backgroundImage: (theme) => ({
        "quote-icon": "url('/images/quote.png')",
        "quote-icon-white": "url('/images/quote-white.png')",
        "content-bg": "url('/images/main-background.webp')",
        "banner-mid-bg": "url('/images/banner/home-statistics.jpg')",
        "banner-mid-mobile-bg": "url('/images/banner/home-statistics-mobile.jpg')",
        "main-content-bg": "url('/images/banner/mainbg.webp')",
        "team-bg": "url('/images/team.webp')",
        "brown-overlay": "url('/images/brown-overlay.png')",
        'quote-header': "url('/images/bg-quote-header-left.png'), url('/images/bg-quote-header-right.png')",
        'quote-header-right': "url('/images/bg-quote-header-right.png')",
        'quote-header-left': "url('/images/bg-quote-header-left.png')",
        'contact-bg': "url('/images/mainbg-contact.jpg')",
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

      animation: {
        fade: "fade 1.5s ease-in-out"
      },
    },
  },

  plugins: [],

  // ✅ ADDED: Purge unused CSS in production
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    options: {
      // Keep classes that are dynamically generated or used in animations
      safelist: [
        'animate-fade',
        'animate-pulse',
        'animate-spin',
        'opacity-0',
        'opacity-100',
        'hidden',
        'block',
        // Add any other dynamic classes here
      ],
    },
  },
};