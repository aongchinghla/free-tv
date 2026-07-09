/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: "#05070D",
          900: "#0A0D16",
          800: "#10141F",
          700: "#171C2B",
          600: "#232A3D",
        },
        floodlight: {
          400: "#FFC94A",
          500: "#FBB020",
          600: "#E8930A",
        },
        pitch: {
          400: "#3DDC84",
          500: "#22C55E",
        },
        signal: {
          500: "#EF4444",
          600: "#DC2626",
        },
        dusk: {
          500: "#7C5CFF",
          600: "#6339F5",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "stadium-grad":
          "linear-gradient(135deg, #171C2B 0%, #0A0D16 55%, #05070D 100%)",
        "card-sunset":
          "linear-gradient(160deg, #3A2A6B 0%, #7C3F5C 45%, #C9622C 100%)",
        "card-dusk":
          "linear-gradient(160deg, #1E2A5E 0%, #4A2E6B 50%, #B0472C 100%)",
        "card-forest":
          "linear-gradient(160deg, #163A34 0%, #1F5C4A 45%, #D98A2C 100%)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.8" },
          "80%": { transform: "scale(1.8)", opacity: "0" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        sweep: {
          "0%": { transform: "translateX(-120%) skewX(-15deg)" },
          "100%": { transform: "translateX(220%) skewX(-15deg)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.4,0,0.6,1) infinite",
        sweep: "sweep 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
