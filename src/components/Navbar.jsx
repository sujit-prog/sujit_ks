import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  // { id: 'blog', label: 'Blog' },
  // { id: 'values', label: 'Values' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Check which section is in view
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // If we're at the top of the page, no section is active
      if (window.scrollY < 100) {
        setActiveSection(null);
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && scrollPosition >= sections[i].offsetTop) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gradient-to-b from-primary-100 to-transparent dark:from-dark-900 dark:to-transparent' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('hero');
            }}
            whileHover={{ scale: 1.07 }}
            className="text-primary-900 dark:text-dark-50 font-sora text-xl tracking-wider cursor-pointer font-semibold"
          >
            Sujit_ks
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ id, label }) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(id);
                }}
                className={`relative text-primary-700/80 hover:text-primary-900 dark:text-dark-200/80 dark:hover:text-dark-50 font-sora text-sm uppercase tracking-widest ${
                  activeSection === id ? 'text-primary-900 dark:text-dark-50' : ''
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {label}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-px bg-primary-700 dark:bg-dark-200"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  animate={{ scaleX: activeSection === id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              className="text-primary-900 dark:text-dark-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-primary-100/80 dark:bg-dark-800/80 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4 py-4">
              {navLinks.map(({ id, label }) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo(id);
                    setIsMenuOpen(false);
                  }}
                  className="block py-2 text-primary-700/80 hover:text-primary-900 dark:text-dark-200/80 dark:hover:text-dark-50 font-sora text-sm uppercase tracking-widest"
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;