import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  // Smooth scroll function
  const smoothScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="hero" className="min-h-screen bg-primary-50 dark:bg-dark-900 flex items-center justify-center relative overflow-hidden transition-colors duration-200">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000011_1px,transparent_1px),linear-gradient(to_bottom,#00000011_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative inline-block mb-8"
          >
            <div className="absolute inset-0 border border-primary-200 dark:border-dark-700">
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary-200 dark:bg-dark-700"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-200 dark:bg-dark-700"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary-200 dark:bg-dark-700"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary-200 dark:bg-dark-700"></div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-900 dark:text-dark-50 font-sora px-8 py-4">
              Sujit Kumar Sha
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-xl md:text-2xl text-primary-700/80 dark:text-dark-200/80 font-sora uppercase tracking-widest">
              <span className="border-b border-primary-200 dark:border-dark-700 pb-1">Software Developer</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-primary-600/60 dark:text-dark-300/60 font-sora max-w-2xl mx-auto mb-12"
          >
            Developing fast, scalable interfaces with an emphasis on performance, maintainability, and modern web standards.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex justify-center space-x-8"
          >
            <motion.a
              href="#work"
              className="text-primary-700/80 dark:text-dark-200/80 hover:text-primary-900 dark:hover:text-dark-50 font-sora text-sm uppercase tracking-widest"
              whileHover={{ x: 5 }}
            >
              View Work →
            </motion.a>
            <motion.a
              href="#contact"
              className="text-primary-700/80 dark:text-dark-200/80 hover:text-primary-900 dark:hover:text-dark-50 font-sora text-sm uppercase tracking-widest"
              whileHover={{ x: 5 }}
            >
              Contact →
            </motion.a>
            <motion.a
              href="https://drive.google.com/file/d/12CBQeKGNe2DqMBJAbf45IC6B5zNSCFT3/view?usp=sharing"
              className="text-primary-700/80 dark:text-dark-200/80 hover:text-primary-900 dark:hover:text-dark-50 font-sora text-sm uppercase tracking-widest"
              whileHover={{ x: 5 }}
            >
              Resume →
            </motion.a>
            <motion.a
              href="https://sujitkumarshaportfolio.framer.website/"
              className="text-primary-700/80 dark:text-dark-200/80 hover:text-primary-900 dark:hover:text-dark-50 font-sora text-sm uppercase tracking-widest"
              whileHover={{ x: 5 }}
            >
              AKA  →
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-2 h-2 bg-primary-200 dark:bg-dark-700 rounded-full" />
      </motion.div>
    </section>
  );
};

export default HeroSection;