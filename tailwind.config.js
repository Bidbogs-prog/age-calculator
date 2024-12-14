/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins400i: ["PoppinsItalic"],
        poppins700: ["PoppinsBold"],
        poppins800i: ["PoppinsExtraBoldItalic"],
      },
      colors: {
        lightgrey: "hsl(0, 1%, 44%)",
        offwhite: "hsl(0, 0%, 94%)",
        smokeygrey: "hsl(0, 1%, 44%)",
        offblack: "hsl(0, 0%, 8%)",
        primaryPurple: "hsl(259, 100%, 65%)",
        primaryRed: "hsl(0, 100.00%, 42.70%)",
      },
    },
  },
  plugins: [],
};
