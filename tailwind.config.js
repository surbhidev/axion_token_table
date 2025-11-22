/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  safelist: [
    { pattern: /(bg|text|border)-(blue|emerald|purple|rose)-(400|500)/ },
    { pattern: /(bg|text|border)-(blue|emerald|purple|rose)-(500)\/(10|20)/ }
  ],

  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        popBounce: {
          "0%": { transform: "scale(0.97)", opacity: "0" },
          "60%": { transform: "scale(1.02)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        rowLift: {
          "0%": { transform: "translateY(0px) scale(1)" },
          "100%": { transform: "translateY(-6px) scale(1.01)" }
        },
        flashFade: {
          "0%": { boxShadow: "0 0 0 6px rgba(16,185,129,0.15)", opacity: "1" },
          "100%": { boxShadow: "0 0 0 0 rgba(16,185,129,0)", opacity: "0" }
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.6" },
          "100%": { transform: "scale(2.5)", opacity: "0" }
        }
      },

      animation: {
        shimmer: "shimmer 1.6s linear infinite",
        popBounce: "popBounce 220ms cubic-bezier(.2,.9,.2,1)",
        rowLift: "rowLift 150ms ease",
        flashFade: "flashFade 600ms ease-out",
        ripple: "ripple 600ms ease-out",
      }
    },
  },

  plugins: [],
};
