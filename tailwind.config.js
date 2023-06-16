const daisyui = require("daisyui")

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#884A39",
          secondary: "#C38154",
          accent: "#000000",
          neutral: "#ffffff",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        home: "url('../../public/bg-home.png')",
        login: "url('../../public/assets/img/bg-login.jpg')",
        login_mobile: "url('../../public/assets/img/bg-login-mobile.png')",
        payment: "url('../../public/assets/img/bg-payment.jpg')",
        profile: "url('../../public/assets/img/bg-profile.jpg')",
        chat: "url('../../public/assets/img/bg-chat.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [daisyui],
}
