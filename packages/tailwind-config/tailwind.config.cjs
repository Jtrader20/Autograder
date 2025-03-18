/** @type {import ( 'tailwindcss' ).Config} */
// tailwind.config.js
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js}"],
    theme: {
      extend: {
        colors: {
          primary: "var(--color-primary)",
          "primary-alt": "var(--color-primary-alt)",
          secondary: "var(--color-secondary)",
          "secondary-alt": "var(--color-secondary-alt)",
          "bg-primary": "var(--color-bg-primary)",
          "bg-secondary": "var(--color-bg-secondary)",
          "bg-secondary-alt": "var(--color-bg-secondary-alt)",
          accent: "var(--color-accent)",
          danger: "var(--color-danger)",
          warning: "var(--color-warning)",
          success: "var(--color-success)",
        },
        fill: {
          primary: "var(--color-primary)",
          "primary-alt": "var(--color-primary-alt)",
          secondary: "var(--color-secondary)",
          "secondary-alt": "var(--color-secondary-alt)",
          accent: "var(--color-accent)",
          danger: "var(--color-danger)",
          warning: "var(--color-warning)",
          success: "var(--color-success)",
        }
      },
    },
    plugins: [],
  }
  