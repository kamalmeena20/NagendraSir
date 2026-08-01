module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#009E66",
          50: "#E8F8F1",
          100: "#D1F1E3",
          200: "#A3E3C7",
          300: "#75D5AB",
          400: "#47C78F",
          500: "#009E66",
          600: "#007A4F",
          700: "#005C3B",
          800: "#003D28",
          900: "#001F14",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16, 24, 40, 0.04), 0 4px 16px rgba(16, 24, 40, 0.06)",
        elev: "0 8px 30px rgba(16, 24, 40, 0.10)",
        glow: "0 0 0 3px rgba(0, 158, 102, 0.18)",
      },
      backgroundImage: {
        "auth-mesh":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(0, 158, 102, 0.18), transparent), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(0, 158, 102, 0.08), transparent)",
      },
    },
  },
  plugins: [],
}
