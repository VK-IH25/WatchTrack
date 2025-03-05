import { createTheme } from "@mantine/core";

const myTheme = createTheme({
  colors: {
    brand: [
      "#ebf0ff",
      "#c3d4ff",
      "#9ab8ff",
      "#719cff",
      "#4780ff",
      "#2864e6",
      "#1f4db3",
      "#173680",
      "#10204d",
      "#080a1a",
    ],
  },
  primaryColor: "brand",
  fontFamily: "Poppins, sans-serif",
  headings: { fontFamily: "Poppins, sans-serif" },
});

export default myTheme;
