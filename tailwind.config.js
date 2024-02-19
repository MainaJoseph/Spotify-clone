/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        wave: "wave 1.5s ease-in-out infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.5)",
            opacity: "0.5",
          },
        },
      },
    },
  },
  plugins: [],
};
