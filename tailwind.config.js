/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'cyber-cyan':   '#00F0FF',
        'cyber-pink':   '#FF003C',
        'cyber-yellow': '#FFE600',
        'cyber-purple': '#7B2FBE',
        'cyber-dark':   '#050510',
        'cyber-dark2':  '#0a0a1a',
        'cyber-green':  '#00FF88',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter:    ['Inter', 'sans-serif'],
        mono:     ['"Share Tech Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}