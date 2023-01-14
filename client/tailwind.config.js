/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cobalt: '#4285f4',
        offwhite: '#F5F5F5',
      },
      borderWidth: {
        3: '3px',
      },
      boxShadow: {
        around: 'rgba(0, 0, 0, 0.4) 0px 30px 90px;',
      },
    },
  },
  plugins: [],
};
