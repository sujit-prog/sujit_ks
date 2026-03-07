import React, { useState, useEffect, createContext } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Lock, Unlock, ShieldAlert, Zap, ChevronRight, Gauge } from 'lucide-react';

const navLinks = [
  { id: 'hero', label: 'IGNITION', gear: 'P' },
  { id: 'about', label: 'PILOT', gear: '1' },
  { id: 'projects', label: 'GARAGE', gear: '2' },
  { id: 'experience', label: 'TRACK_HIS', gear:'3'},
  { id: 'contact', label: 'COMMS', gear: '4' },
  
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  // Internal Theme State (Fallback for preview environments)
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Scroll Progress Logic (RPM Gauge Style)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Intersection Logic for Active Section
      const scrollPosition = window.scrollY + 200;
      const sections = navLinks.map(link => document.getElementById(link.id));
      
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
    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('hero');
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-[150] transition-all duration-500 ${
        isScrolled 
          ? 'py-0 bg-black/95 border-b-2 border-red-600/30' 
          : 'py-4 bg-transparent'
      }`}
    >
      {/* RPM / SCROLL PROGRESS BAR */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-red-600 origin-left z-[160] shadow-[0_0_15px_rgba(220,38,38,0.8)]"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* BRAND BADGE (Logo) */}
          <motion.a
            href="#hero"
            onClick={(e) => { 
              e.preventDefault(); 
              smoothScrollTo('hero'); 
            }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-12 h-8 bg-zinc-900 border-2 border-red-600 skew-x-[-20deg] flex items-center justify-center overflow-hidden shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)]">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
                <Zap size={18} className="text-white fill-red-600 relative z-10" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-xl tracking-tighter italic uppercase text-left">
                SUJIT<span className="text-red-600">.</span>KS
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest">Core_Online</span>
              </div>
            </div>
          </motion.a>

          {/* DESKTOP GEARBOX MENU */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center p-1 bg-zinc-900/80 border border-zinc-800 rounded-lg">
              {navLinks.map(({ id, label, gear }) => (
                <button
                  key={id}
                  onClick={() => smoothScrollTo(id)}
                  className={`relative px-5 py-2 flex flex-col items-center group transition-all ${
                    activeSection === id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <span className={`text-[8px] font-black mb-1 transition-colors ${activeSection === id ? 'text-red-500' : 'text-zinc-700'}`}>
                    GEAR_{gear}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] font-mono italic">
                    {label}
                  </span>
                  
                  {activeSection === id && (
                    <motion.div 
                      layoutId="navGlow"
                      className="absolute inset-0 bg-red-600/5 border-b-2 border-red-600 z-0"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* KEY FOB TOGGLE */}
            <div className="h-10 w-[1px] bg-zinc-800" />
            <motion.button
              onClick={toggleTheme}
              whileHover={{ y: -2 }}
              className={`group relative w-12 h-16 rounded-xl border-2 border-black flex flex-col items-center justify-between p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
                isDarkMode ? 'bg-zinc-900' : 'bg-zinc-200'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-red-900' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse'}`} />
              {isDarkMode ? <Lock size={14} className="text-zinc-700" /> : <Unlock size={14} className="text-blue-600" />}
              <div className="text-[6px] font-black uppercase text-zinc-500 group-hover:text-red-500 transition-colors">
                {isDarkMode ? 'SAFE' : 'RUN'}
              </div>
            </motion.button>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 border-2 border-zinc-800 rounded flex items-center justify-center ${isDarkMode ? 'text-zinc-500' : 'text-blue-500 bg-white shadow-lg'}`}
            >
              {isDarkMode ? <Lock size={18} /> : <Unlock size={18} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center text-red-600"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE EXPANDED HUD */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-y-0 right-0 w-72 bg-zinc-950 border-l-4 border-red-600 shadow-2xl z-[200] lg:hidden"
          >
            <div className="p-8 flex flex-col h-full">
              <div className="flex justify-between items-center mb-12">
                <span className="text-[10px] font-black text-zinc-600 tracking-[0.4em] uppercase">Navigation_Matrix</span>
                <button onClick={() => setIsMenuOpen(false)}><X className="text-red-600" /></button>
              </div>
              
              <div className="flex flex-col gap-6">
                {navLinks.map(({ id, label, gear }) => (
                  <motion.button
                    key={id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { smoothScrollTo(id); setIsMenuOpen(false); }}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-[8px] font-black text-red-600/40 uppercase mb-1">Subsystem_0{gear}</span>
                      <span className={`text-3xl font-black italic tracking-tighter uppercase transition-colors ${activeSection === id ? 'text-red-600' : 'text-white'}`}>
                        {label}
                      </span>
                    </div>
                    <ChevronRight size={20} className={activeSection === id ? 'text-red-600' : 'text-zinc-800'} />
                  </motion.button>
                ))}
              </div>

              <div className="mt-auto border-t border-zinc-900 pt-8 flex flex-col gap-4">
                 <div className="flex items-center gap-3 text-zinc-700">
                    <ShieldAlert size={14} />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest italic">User_Session: Pilot_Sujit</span>
                 </div>
                 <div className="h-1 w-full bg-zinc-900 overflow-hidden">
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }} 
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      className="h-full w-1/2 bg-red-600"
                    />
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;