# devfolio-vite

devfolio-vite is a modern, interactive React portfolio website built with Vite and styled with Tailwind CSS. It showcases projects with smooth animations and responsive design using GSAP, Framer Motion, Ant Design components, and more.

## Features

- Built with React 18 and Vite for lightning-fast performance
- Styled with Tailwind CSS and Ant Design components
- Animations powered by Framer Motion and GSAP
- Lazy-loading sections with Intersection Observer
- Smooth scrolling with react-scroll
- Fully responsive and mobile-friendly

## Table of Contents

- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/neelshha/devfolio-vite.git
   ```
2. Change directory:
   ```bash
   cd devfolio-vite
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

In the project directory, you can run:

- `npm run dev` — Starts the development server at `http://localhost:5173/`.
- `npm run build` — Bundles the app for production to the `dist` folder.
- `npm run preview` — Previews the production build locally.
- `npm run lint` — Runs ESLint on the codebase.

## Project Structure

```
devfolio-vite/
├── public/                 # Static assets and index.html
├── src/
│   ├── assets/             # Images, icons, fonts, etc.
│   ├── components/         # Reusable React components
│   ├── pages/              # Page-level components
│   ├── styles/             # Global CSS/Tailwind imports
│   ├── App.jsx             # Root React component
│   └── main.jsx            # App entry point
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── vite.config.js          # Vite configuration
├── package.json
└── README.md
```

## Technologies Used

**Dependencies:**
- React ^18.2.0
- React DOM ^18.2.0
- Vite ^5.4.10
- Tailwind CSS ^3.4.1
- Ant Design ^5.21.5
- Framer Motion ^11.11.9
- GSAP ^3.12.5
- react-intersection-observer ^9.13.1
- react-scroll ^1.9.0
- lucide-react ^0.344.0
- react-icons ^5.3.0

**Dev Dependencies:**
- @vitejs/plugin-react
- ESLint and React plugins
- PostCSS and Autoprefixer

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Created by Neel Shah 
