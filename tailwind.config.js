/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary": "var(--primary)",
        "danger": "var(--danger)",
        "canvas": "var(--canvas)",
        "text": "var(--text)",
        "light": "var(--light)",
        "dark": "var(--dark)"
      }
    },
  },
  plugins: [],
}