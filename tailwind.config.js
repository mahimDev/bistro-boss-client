/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        featureImg: "url('https://i.ibb.co.com/pbHJnNZ/featured.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
