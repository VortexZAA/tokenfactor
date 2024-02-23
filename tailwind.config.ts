import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "black":"#000",
      "transparent":"transparent",
      "white":"#fff",
      "celticBlue": "#2671BC",
      "cornflower": "#8ECAE6",
      "selectiveYellow":"#FFB703",
      "fulvous":"#E97700",
      "sinopia":"#D1470B",
      "maasblue":"#051A2D",
      "ghost-white":"#F7F7FF",
      "green":"#16a34a"
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
