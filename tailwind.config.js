/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          eggplant: "#4A154B",     // Deep Royal Eggplant Purple
          eggplantDark: "#360E37",
          lilac: "#BDB2FF",        // Soft Lavender Lilac
          lilacLight: "#F3EFFF",
          shamrock: "#9EC142",     // Vibrant Shamrock Green
          shamrockDark: "#82A430",
          lace: "#F7F5FA",         // Delicate Off-white Lace Cream
          laceCard: "#FFFFFF",
          laceBorder: "#E8E2F0",
        },
        // Alias mappings for seamless compatibility
        pastel: {
          bg: "#F7F5FA",           // Lace
          bgCard: "#FFFFFF",
          bgSoft: "#F3EFFF",       // Lilac Light
          red: "#4A154B",          // Primary Eggplant
          redDark: "#360E37",
          dark: "#4A154B",         // Eggplant
          darkCard: "#360E37",
          peach: "#9EC142",        // Shamrock
          sand: "#BDB2FF",         // Lilac
          rose: "#4A154B",         // Eggplant
          sage: "#9EC142",         // Shamrock
          sageLight: "#B5D65A",
          creamBorder: "#E8E2F0",
          gold: "#D97706"
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'eggplant-gradient': 'linear-gradient(135deg, #4A154B 0%, #360E37 100%)',
        'shamrock-gradient': 'linear-gradient(135deg, #9EC142 0%, #82A430 100%)',
        'lilac-gradient': 'linear-gradient(135deg, #BDB2FF 0%, #9F91FC 100%)',
        'lace-gradient': 'linear-gradient(135deg, #F7F5FA 0%, #EFEBF5 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'gradient-shift': 'gradientShift 5s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' },
        },
        gradientShift: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
