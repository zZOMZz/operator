/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx,scss}"],
  theme: {
    extend: {
      animation: {
        'slide-in': 'sliceIn 0.5s forwards',
        'slide-out': 'slideOut 0.5s forwards',
      },
      colors: {
        "input-border": "hsl(222 0% 86% / 38%)"
      },
      borderColor: {
        "input-border": "hsl(222 0% 86% / 38%)"
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, hsl(40 18% 97%), hsla(0, 0%, 100%, 0))',
      },
    },
  },
  plugins: [],
}
