/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#013D2F", // Night Turquoise
          light: "#025440",
          dark: "#00281F",
        },
        accent: {
          DEFAULT: "#F05B22", // Orange
          hover: "#D6450F",
          soft: "#FEE4D6",
        },
        neutral: {
          bg: "#F0F3F9", // Light cool grey/blue
          dark: "#0F172A",
          border: "#E5E7EB",
        },
        division: {
          foundations: '#961E1E',
          ground: '#996200',
          infrastructure: '#703000',
          marine: '#005C9B',
          equipment: '#137C1A',
          consulting: '#4B5563',
        }
      },
      fontFamily: {
        sans: ['"JEKO"', 'sans-serif'], // JEKO regular for body copy and extended text
        display: ['"JEKO"', 'sans-serif'], // JEKO extrabold for headlines and strong visual impact
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
