/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx,scss}"],
  theme: {
    extend: {
      animation: {
        'slide-in': 'sliceIn 0.5s forwards',
        'slide-out': 'slideOut 0.5s forwards',
      },
      keyframes: {
        slideIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideOut: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-30px)',
          },
        },
      }
    },
  },
  plugins: [],
}
