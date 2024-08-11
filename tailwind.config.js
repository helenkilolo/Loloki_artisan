/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#f97316', // Tailwind's default orange-500
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Add Poppins as the primary font
      },
    },
  },
  plugins: [],
};


