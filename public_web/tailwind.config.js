module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#009E66",
          50: "#E8F8F1",
          100: "#D1F1E3",
          400: "#34D399",
          500: "#009E66",
          600: "#007A4F",
          700: "#005C3B",
        },
        ink: {
          DEFAULT: "#0B0F0D",
          soft: "#121816",
          card: "#161D1A",
        },
      },
      fontFamily: {
        sans: ['"Sora"', "system-ui", "sans-serif"],
        display: ['"Instrument Serif"', "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 158, 102, 0.25)",
        soft: "0 10px 40px rgba(0, 0, 0, 0.35)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        floaty: "floaty 5s ease-in-out infinite",
        shimmer: "shimmer 8s ease infinite",
        pulseGlow: "pulseGlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
