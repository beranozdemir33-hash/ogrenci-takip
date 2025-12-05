import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#13ecc8",
                "background-light": "#f6f8f8",
                "background-dark": "#10221f",
                "card-light": "#FFFFFF",
                "card-dark": "#1C1C1E",
                "text-primary-light": "#1C1C1E",
                "text-primary-dark": "#FFFFFF",
                "text-secondary-light": "#8E8E93",
                "text-secondary-dark": "#8E8E93",
                "border-light": "#E5E5EA",
                "border-dark": "#38383A",
            },
            fontFamily: {
                "display": ["var(--font-lexend)", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
        },
    },
    plugins: [],
};
export default config;
