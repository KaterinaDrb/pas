/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#1a1a1a',

        light: '#f3f4f6',
      },
    },
  },
  experimental: {
    optimizeUniversalDefaults: true,
  },
};
