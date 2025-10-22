const {heroui} = require('@heroui/theme');
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/spinner.js"
],
  theme: {
    extend: {},
  },
  plugins: [function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",scrollbar-width": "none,"&::-webkit-scrollbar": {
            display: "none",},},};
      addUtilities(newUtilities);
    },heroui()],
};
