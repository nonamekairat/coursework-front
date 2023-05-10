/** @type {(tailwindConfig: object) => object} */


const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': 'box-shadow: 0 10px 30px 0 rgb(0 0 0 / 0.1)',
      }
    },
  },
  plugins: [
      require('@tailwindcss/line-clamp')
  ],
});

