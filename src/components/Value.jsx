import React from 'react';
import { motion } from 'framer-motion';

const values = [
  {
    title: 'EXCELLENCE',
    description: 'Striving for the highest quality in every project, ensuring clean code and optimal performance.',
    icon: '✨'
  },
  {
    title: 'INNOVATION',
    description: 'Embracing new technologies and creative solutions to solve complex problems.',
    icon: '🚀'
  },
  {
    title: 'COLLABORATION',
    description: 'Working effectively with teams to create impactful solutions through shared knowledge.',
    icon: '🤝'
  },
  {
    title: 'GROWTH',
    description: 'Continuously learning and improving to stay at the forefront of technology.',
    icon: '📈'
  }
];

const Value = () => {
  return (
    <section id="values" className="min-h-screen bg-primary-50 dark:bg-dark-900 py-20 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-dark-50 mb-12 font-sora">
            <span className="border-b-2 border-primary-200 dark:border-dark-700 pb-2">VALUES</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.8 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 border border-primary-200 dark:border-dark-700 group-hover:border-primary-300 dark:group-hover:border-dark-600 transition-colors duration-300">
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary-200 dark:bg-dark-700 group-hover:bg-primary-300 dark:group-hover:bg-dark-600 transition-colors duration-300"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-200 dark:bg-dark-700 group-hover:bg-primary-300 dark:group-hover:bg-dark-600 transition-colors duration-300"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary-200 dark:bg-dark-700 group-hover:bg-primary-300 dark:group-hover:bg-dark-600 transition-colors duration-300"></div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary-200 dark:bg-dark-700 group-hover:bg-primary-300 dark:group-hover:bg-dark-600 transition-colors duration-300"></div>
                </div>

                <div className="p-8">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-primary-900 dark:text-dark-50 mb-4 font-sora">
                    {value.title}
                  </h3>
                  <p className="text-primary-600/60 dark:text-dark-300/60 font-sora text-sm">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Value;
