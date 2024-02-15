/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "1/24": "4.166666667%", // 100 / 24
        "3/24": "12.5%", // 3 times the width of 1/24
        "14/24": "58.33333333%", // 14 times the width of 1/24
        "6/24": "25%", // 6 times the width of 1/24
        "3/8": "37.5%", // 3/8 = 37.5%
        "5/12": "41.666667%", // 5/12 ≈ 41.67%
        // Add the new widths based on the JSX file
        "4/24": "16.66666667%", // 4 times the width of 1/24
        "5/24": "20.83333333%", // 5 times the width of 1/24
        '1/10': '10%',
        '3/20': '15%',
      },
    },
  },
  plugins: [],
};
