/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            keyframes: ({ theme }) => ({
                "keyframes-flip-from-back": {
                    "0%": { transform: "rotateX(180deg)", filter: "brightness(0.3)" },
                    "100%": { transform: "rotateX(0deg)", filter: "brightness(1)" },
                },
                "keyframes-flip-from-front": {
                    "0%": { transform: "rotateX(0deg)", filter: "brightness(1)" },
                    "100%": { transform: "rotateX(180deg)", filter: "brightness(0.3)" },
                },
            }),
            animation: {
                "flip-from-back": "keyframes-flip-from-back var(--animation-duration-flip) ease-out",
                "flip-from-front": "keyframes-flip-from-front var(--animation-duration-flip) ease-out",
            },
            animationFillMode: {
                none: "none",
                forwards: "forwards",
                backwards: "backwards",
                both: "both",
            },
        },
    },
    plugins: [
        require("tailwindcss/plugin")(function ({ addUtilities, matchUtilities, theme }) {
            addUtilities({
                ".backface-visible": {
                    "backface-visibility": "visible",
                    "-moz-backface-visibility": "visible",
                    "-webkit-backface-visibility": "visible",
                    "-ms-backface-visibility": "visible",
                },
                ".backface-hidden": {
                    "backface-visibility": "hidden",
                    "-moz-backface-visibility": "hidden",
                    "-webkit-backface-visibility": "hidden",
                    "-ms-backface-visibility": "hidden",
                },
            });

            matchUtilities({ "fill-mode": value => ({ animationFillMode: value }) }, { values: theme("animationFillMode") });
        }),
    ],
};

