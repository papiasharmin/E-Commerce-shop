/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveleft: {
          '0%': { transform: 'translateX(-450px)' },
          '75%': { transform: 'translateX(0) scale(1)' },
          '85%': {transform: 'scale(1.2)'},
          '100%': {transform: 'scale(1)'},
        },
        moveright: {
          '0%': { transform: 'translateX(550px)' },
          '75%': { transform: 'translateX(0) scale(1)' },
          '85%': {transform: 'scale(1.2)'},
          '100%': {transform: 'scale(1)'},
        },
        movedown: {
          '0%': { transform: 'translateY(550px)' },
          '75%': { transform: 'translateY(0) scale(1)' },
          '85%': {transform: 'scale(1.2)'},
          '100%': {transform: 'scale(1)'},
        },
        changingbg:{
          '0%': { filter: '-hue-rotate(90deg)'},
          '25%': { filter: ' saturate(.5)' },
          '50%': {filter: 'sepia(100%)'},
          '75%': {filter: 'grayscale(100%)'},

        },
        resize:{
          '0%': { transform: 'translateY(550px)' },
          '75%': { transform: 'translateY(0) scale(1)' },
          '85%': {transform: 'scale(1.2)'},
          '100%': {transform: 'scale(1)'},

        },
      },
  

      animation: {
        moveleft: 'moveleft 4s ease-in-out',
        moveright: 'moveright 4s ease-in-out',
        movedown: 'movedown 4s ease-in-out',
        changingbg: 'changingbg 8s linear infinite',
      },
    
    },
  },
  plugins: [],
}
