module.exports = {
   content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",

      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         colors: {
            DarkGray: "#657786",
            LightGray: "#AAB8C2",
            Red: "#E50914;",
            Gray: "#B3B3B3",
            GrayTwo: "rgb(118, 118, 118)",
            Button: "rgba(51,51,51,0.5)",
            NetWhite: "#e6e6e6",
            Black: "rgba(37,37,37,0.61)",
            BlackTwo: "#111",
         },
      },
      fontFamily: {
         Raleway: ["Raleway, sans-serif"],
      },
      screens: {
         sm: "320px",
         md: "768px",
         lg: "976px",
         xl: "1440px",
      },
   },
   plugins: [
      require("tailwind-scrollbar-hide"),
      // ...
   ],
};
