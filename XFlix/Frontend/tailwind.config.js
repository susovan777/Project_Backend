/** @type {import('tailwindcss').Config} */
export default {
  // content: Tells Tailwind to scan these files for class names
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // Enable dark mode with class strategy
  darkMode: "class",

  theme: {
    extend: {
      // Custom colors for XFlix theme
      colors: {
        primary: {
          DEFAULT: "#E50914",
          dark: "#B20710",
          light: "#FF0A16",
        },
        // These colors can be used as: bg-dark-bg, bg-dark-card, etc.
        "dark-bg": "#141414",
        "dark-card": "#1F1F1F",
        "dark-border": "#2D2D2D",
        "light-bg": "#FFFFFF",
        "light-card": "#F8F8F8",
        "light-border": "#E5E5E5",
      },

      // Custom font family
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      // Custom box shadows
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 8px 16px rgba(0, 0, 0, 0.2)",
        "card-dark": "0 2px 8px rgba(0, 0, 0, 0.5)",
        "card-hover-dark": "0 8px 16px rgba(0, 0, 0, 0.7)",
      },

      // Custom transitions
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },

      // Custom animations
      animation: {
        "fade-in": "fadeIn 0.3s ease-in",
        "slide-up": "slideUp 0.3s ease-out",
        "spin-slow": "spin 3s linear infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
