import type { Config } from "tailwindcss";

import colors from "./theme/dist/tailwind/colors.json";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors,
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
    },
  },
} satisfies Config;
