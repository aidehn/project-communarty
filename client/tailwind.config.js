/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './Components/**/*.{js,ts,jsx,tsx}',
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
      transitionDuration: {
        50: '50ms',
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)',
        ],
      },
      spacing: {
        '2px': '2px',
      },
      height: {
        '65perc': '65%',
      },
    },
  },
  plugins: [],
};
