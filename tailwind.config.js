module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          light: "#2250f4",
          dark: "#0A1E8D",
          3: "#5CEBDF",
        },
        app: {
          blue: {
            light: "#2250f4",
            dark: "#0A1E8D",
            green: "#5CEBDF",
          },
          dark: "#151A1E",
          yellow: "#FDE74C",
          inputGray: "#3c3c3c",
          inputGrayBorder: "#c8c8c8",
          expenses: {
            income: "#14DE41",
            spend: "#F3D819",
          },
        },
      },
    },
  },

  plugins: [],
};
