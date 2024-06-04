import type { Config } from "tailwindcss";
import daisyui, { Config as DaisyUIConfig } from "daisyui";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {},
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        "agendachretien-light": {
          "--rounded-btn": "1.9rem",
        },
        "agendachretien-dark": {
          "--rounded-btn": "1.9rem",
        },
      },
    ],
    darkTheme: "agendachretien-dark",
  },
} satisfies Config & { daisyui: DaisyUIConfig };
