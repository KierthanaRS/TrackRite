/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
     "./<custom directory>/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: { 
      colors: {
        primary: "#28282B",
        secondary: {
          DEFAULT: "#CFB53B",
          100: "#C5B358",
          200: "#D4AF37",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        silver: {
          100: "#C0C0C0",
        },
      },
      fontFamily: {
       pdBlack: ["PlayfairDisplay-Black"],
        pdBlackItalic: ["PlayfairDisplay-BlackItalic"],
        pdBold: ["PlayfairDisplay-Bold"],
        pdBoldItalic: ["PlayfairDisplay-BoldItalic"],
        pdExtraBold: ["PlayfairDisplay-ExtraBold"],
        pdExtraBoldItalic: ["PlayfairDisplay-ExtraBoldItalic"],
        pdItalic: ["PlayfairDisplay-Italic"],
        pdMedium: ["PlayfairDisplay-Medium"],
        pdMediumItalic: ["PlayfairDisplay-MediumItalic"],
        pdRegular: ["PlayfairDisplay-Regular"],
        pdSemiBold: ["PlayfairDisplay-SemiBold"],
        pdSemiBoldItalic: ["PlayfairDisplay-SemiBoldItalic"],

      },
    },
  
  },
  plugins: [],
}

