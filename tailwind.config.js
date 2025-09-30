/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sora: ["Sora", 'sans-serif'],
      },
      colors: {
        // Light mode colors
        primary: {
          50:  '#fffdf9',   // darker mint wash
          100: '#b3dab8',   // muted mint
          200: '#8dcf99',   // leafy pastel
          300: '#6fc47f',   // darker soft green
          400: '#54b268',   // rich mid pastel green
          500: '#419457',   // strong earthy green
          600: '#357a47',   // solid dark olive green
          700: '#2d613a',   // deep forest green
          800: '#244d30',   // iPhone 13 deep green
          900: '#1a3823',   // darkest usable green
        },

        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Dark mode colors
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#3d9cf5',
          800: '#1e293b',
          900: '#181818',
        },
        darkAccent: {
          50: '#f0f9ff',
          100: '#f6eee3ff',
          200: '#f3c087ff',
          300: '#dfa810ff',
          400: '#f8b838ff',
          500: '#e99c0eff',
          600: '#c79c02ff',
          700: '#a17703ff',
          800: '#857007ff',
          900: '#6e520cff',
        },
      },
    },
  },
  plugins: [],
};