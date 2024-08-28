import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0789E2",
          50: '#E8F4FC',
          100: '#B2DAF6',
          300: '#59B0EC',
          500: '#0789E2',
          600: "#067DCE",
          700: '#0561A0',
        },
        'heading': '#1F1D22',
        'paragraph': '#555459',
      },
      backgroundImage: {
        vectorLines: "url('/vector-lines.png')",
      }, 
    },
  },
  plugins: [],
};
export default config;
