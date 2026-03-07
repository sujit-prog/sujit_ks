import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";


const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-primary-50 dark:bg-dark-900 transition-colors duration-200">
        <Navbar />
        <div>
          <HeroSection />
          <About />
          <Projects />
          { <Experience /> }
          <Contact />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;