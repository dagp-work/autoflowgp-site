/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{njk,md,html}",
      "./src/_includes/**/*.{njk,md,html}"
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            300: "#93C5FD", // liens au survol (thème sombre)
            400: "#60A5FA", // liens (thème sombre)
            600: "#3B82F6", // bleu techs
            700: "#2563EB",
            800: "#1D4ED8"
          },
          dark: "#0F172A"
        }
      }
    },
    plugins: [require("@tailwindcss/typography")]
  };