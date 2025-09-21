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
            600: "#3B82F6", // bleu techs
            700: "#2563EB"
          },
          dark: "#0F172A"
        }
      }
    },
    plugins: []
  };