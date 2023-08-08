/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: {
          10: '#f3f1ed',
          30: '#dcd6ca',
          50: '#c5bba8',
          70: '#aea085',
          100: '#8c7851',
        },
        secondary: {
          10: '#ffeef0',
          30: '#ffcbd4',
          50: '#ffa9b7',
          70: '#ff879b',
          100: '#ff5470',
        },
        tertiary: {
          10: '#e9f8f2',
          30: '#bfe9d8',
          50: '#95dabe',
          70: '#6bcca4',
          100: '#2cb67d',
        },
        paragraph: '#fffffe',
        complementary: {
          10: '#e5e8ed',
          30: '#b2bcc9',
          50: '#7f90a6',
          70: '#4c6382',
          100: '#00214d',
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/blob-haikei2.svg')",
      },
      keyframes: {
        'animate-zoom-in': {
          from: {
            opacity: 0,
            transform: 'scale(0.5)',
          },
          to: {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
        'animate-zoom-out': {
          from: {
            opacity: 1,
            transform: 'scale(1)',
          },
          to: {
            opacity: 0,
            transform: 'scale(0.5)',
          },
        },
      },
      animation: {
        'zoom-in': 'animate-zoom-in 0.3s ease-in-out',
        'zoom-out': 'animate-zoom-out 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
}