/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface": "#fafaf1",
        "surface-dim": "#d8dccd",
        "surface-bright": "#fafaf1",
        "surface-container": "#edefe2",
        "surface-container-high": "#e7e9dc",
        "surface-container-highest": "#e1e4d5",
        "surface-container-low": "#f3f4e9",
        "surface-container-lowest": "#ffffff",
        "primary": "#526447",
        "primary-container": "#d4e9c4",
        "primary-dim": "#46583c",
        "on-primary": "#ecffdd",
        "on-primary-container": "#45573b",
        "secondary": "#735a42",
        "secondary-container": "#ffdcbd",
        "secondary-dim": "#664f37",
        "on-secondary": "#fff7f3",
        "on-secondary-container": "#654d35",
        "tertiary": "#85532e",
        "tertiary-container": "#febb8e",
        "on-surface": "#30342a",
        "on-surface-variant": "#5c6155",
        "outline": "#787c70",
        "outline-variant": "#b0b4a5",
        "error": "#a73b21",
        "error-container": "#fd795a",
      },
      fontFamily: {
        "headline": ["Plus Jakarta Sans", "sans-serif"],
        "body": ["Lexend", "sans-serif"],
        "label": ["Lexend", "sans-serif"]
      },
      borderRadius: {
        "none": "0px",
        "sm": "0.125rem",
        "DEFAULT": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "full": "9999px"
      }
    },
  },
  plugins: [],
}
