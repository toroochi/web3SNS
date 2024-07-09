import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // 'カラー名': 'カラーコード'
        "dark-green": "#06bbbc",
        "sns-font": "#23454d",
        "sns-blue": "#668c95",
        "sns-pink": "#d4acaa",
        "sns-gray": "#d1d2d3",
        "sns-error": "#d4504e",
        "sns-white": "#ffffff",
      },
    },
  },
  plugins: [],
};

export default config;
