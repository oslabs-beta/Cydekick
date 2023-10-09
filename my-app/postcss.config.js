/* eslint @typescript-eslint/no-var-requires: "off" */
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js')],
};
