import type { Config } from "tailwindcss";
import daisyui, { Config as DaisyUIConfig } from "daisyui";

const colors = {
  main: {
    DEFAULT: "#5525d0",
    100: "#0e0623",
    200: "#200e4e",
    300: "#321679",
    400: "#431da5",
    500: "#5525d0",
    600: "#9575e6",
    700: "#b6a0ee",
    800: "#d7cbf6",
    900: "#f8f7fd",
  },
  bis: {
    DEFAULT: "#ee6c4d",
    100: "#3a1005",
    200: "#74200b",
    300: "#ae3010",
    400: "#e73f16",
    500: "#ee6c4d",
    600: "#f28b71",
    700: "#f5a895",
    800: "#f8c5b8",
    900: "#f8f7fd",
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
          secondary: colors.bis.DEFAULT,
          "base-100": colors.main["900"],
          "base-content": colors.main["100"],
          "--rounded-btn": "1.9rem",
        },
        "agendachretien-dark": {
          "color-scheme": "dark",
          primary: colors.main.DEFAULT,
          secondary: colors.bis["600"],
          "base-100": colors.main["100"],
          "base-content": colors.main["900"],
          "--rounded-btn": "1.9rem",
        },
      },
    ],
    darkTheme: "agendachretien-dark",
  },
} satisfies Config & { daisyui: DaisyUIConfig };
