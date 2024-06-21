/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Tailwind가 스타일을 적용할 파일 경로
    './public/index.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-dark': '#1a1c35',
        'text': '#ffffff',
        'text-gray': '#e3e5e3',
        'accent': '#fee020',
        'bg-task-dark': '#3d3f51',
      }
    },
  },
  plugins: [],
}