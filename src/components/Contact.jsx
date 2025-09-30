import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const contactLinks = [
    {
      text: 'E-mail',
      href: 'mailto:10sujitkumarsha@gmail.com',
    },
    {
      text: 'GitHub',
      href: 'https://github.com/sujit-prog',
    },
    {
      text: 'LinkedIn',
      href: 'https://linkedin.com/in/Sujit-Kumar-Sha-',
    },
    {
      text: 'Instagram',
      href: 'https://instagram.com/sujit_shahaha',
    },
  ];

  const newLinks = [
    {
      text: 'E-mail',
      href: 'mailto:10sujitkumarsha@gmail.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
        </svg>
      ),
    },
    {
      text: 'GitHub',
      href: 'https://github.com/sujit-prog',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .5C5.7.5.5 5.7.5 12a11.5 11.5 0 008 11c.5.1.7-.2.7-.5v-2c-3.3.7-4-1.6-4-1.6a3 3 0 00-1.3-1.7c-1-.7.1-.7.1-.7a2.5 2.5 0 011.9 1.3 2.5 2.5 0 003.4 1 2.5 2.5 0 01.8-1.6c-2.7-.3-5.5-1.3-5.5-6A4.5 4.5 0 017.5 6a4 4 0 01.1-3s1-.3 3.3 1.3a11 11 0 016 0C16.4 3 17.5 3 17.5 3a4 4 0 01.1 3 4.5 4.5 0 011.2 3c0 4.7-2.8 5.7-5.5 6a2.8 2.8 0 01.9 2v3c0 .3.2.6.7.5A11.5 11.5 0 0023.5 12C23.5 5.7 18.3.5 12 .5z" />
        </svg>
      ),
    },
    {
      text: 'LinkedIn',
      href: 'https://linkedin.com/in/Sujit-Kumar-Sha-',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 002.48 2.5A2.5 2.5 0 007.5 6a2.5 2.5 0 00-2.52-2.5zM3 8.98h3.96v12H3v-12zM9.95 8.98H14v1.7h.06c.56-1.1 1.9-2.26 3.94-2.26 4.2 0 4.97 2.76 4.97 6.35v7.91H19v-7.02c0-1.67-.03-3.8-2.3-3.8-2.3 0-2.65 1.8-2.65 3.67v7.15H9.95v-12z" />
        </svg>
      ),
    },
    {
      text: 'Instagram',
      href: 'https://instagram.com/sujit_shahaha',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-2a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="min-h-screen bg-primary-50 dark:bg-dark-900 pt-20 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-dark-50 mb-12 font-sora">
            <span className="border-b-2 border-primary-200 dark:border-dark-700 pb-2">Contact</span>
          </h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h3 className="text-2xl font-bold text-primary-900 dark:text-dark-50 mb-6 font-sora">
              <span className="border-b border-primary-200 dark:border-dark-700 pb-1">GET IN TOUCH</span>
            </h3>
            <p className="text-primary-600/60 dark:text-dark-300/60 font-sora mb-12 text-lg">
              Have a project in mind or want to collaborate? Feel free to reach out.
            </p>

            {/* <div className="space-y-6">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary-700/80 dark:text-dark-200/80 hover:text-primary-900 dark:hover:text-dark-50 font-sora text-sm uppercase tracking-widest transition-colors duration-300"
                  whileHover={{ x: 10 }}
                >
                  {link.text}
                </motion.a>
              ))}
            </div> */}

            <div className="space-y-6">
              {newLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary-700/80 dark:text-dark-200/80 hover:text-primary-900 dark:hover:text-dark-50 font-sora text-sm uppercase tracking-widest transition-colors duration-300"
                  whileHover={{ x: 10 }}
                >
                  {link.icon}
                  {link.text}
                </motion.a>
              ))}
            </div>


          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;