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
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        tertiary: "var(--color-tertiary)",
        "custom-gender": "var(--custom-gender)",
        "custom-gender-dark": "var(--custom-gender-dark)",
        "custom-gender-light": "var(--custom-gender-light)",
        "strong-background": "var(--color-strong-background)",
        "light-background": "var(--color-light-background)",
        "custom-boy": "var(--custom-boy)",
        "custom-girl": "var(--custom-girl)",
        "custom-boy-dark" : "var(--custom-boy-dark)",
        "custom-girl-dark" : "var(--custom-girl-dark)",
      },
    },
  },
  plugins: [],
} satisfies Config;
