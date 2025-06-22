import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'yellow-600': '#B58900', // For 3.3v power
        'red-600': '#DC322F',    // For 5v power
        'green-600': '#859900',  // For GPIO
        'blue-600': '#268BD2',   // For I2C
        'pink-600': '#D33682',   // For SPI
        'indigo-600': '#6C71C4', // For UART
        'teal-600': '#2AA198',   // For PCM
      },
    },
  },
  plugins: [],
} satisfies Config;
