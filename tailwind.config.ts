import type { Config } from "tailwindcss";
import daisyui, { Config as DaisyUIConfig } from "daisyui";

const colors = {
  main: {
    DEFAULT: "#3d5a80",
    100: "#0c1219",
    200: "#192433",
    300: "#25364c",
    400: "#314866",
    500: "#3d5a80",
    600: "#5279ab",
    700: "#7d9ac0",
    800: "#a8bcd5",
    900: "#d4ddea",
  },
  alt: {
    DEFAULT: "#ee6c4d",
    100: "#3a1005",
    200: "#74200b",
    300: "#ae3010",
    400: "#e73f16",
    500: "#ee6c4d",
    600: "#f28b71",
    700: "#f5a895",
    800: "#f8c5b8",
    900: "#fce2dc",
  },
};

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
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        "agendachretien-light": {
          "color-scheme": "light",
          primary: colors.main.DEFAULT,
          secondary: colors.alt.DEFAULT,
          "base-100": colors.main["900"],
          "base-content": colors.main["100"],
          "--rounded-btn": "1.9rem",
        },
        "agendachretien-dark": {
          "color-scheme": "dark",
          primary: colors.main.DEFAULT,
          secondary: colors.alt["600"],
          "base-100": colors.main["200"],
          "base-content": colors.main["900"],
          "--rounded-btn": "1.9rem",
        },
      },
    ],
    darkTheme: "agendachretien-dark",
  },
} satisfies Config & { daisyui: DaisyUIConfig };
