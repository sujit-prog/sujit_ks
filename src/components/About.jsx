import React from 'react';
import { motion } from 'framer-motion';
import { SiPython, SiTypescript, SiReact, SiNodedotjs, SiJavascript, SiMysql, SiAstro, SiCplusplus, SiGit, SiDavinciresolve, SiDjango } from 'react-icons/si';

const skills = [
  { name: 'Python', icon: <SiPython /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'ReactJS', icon: <SiReact /> },
  { name: 'Node.js', icon: <SiNodedotjs /> },
  { name: 'JavaScript', icon: <SiJavascript /> },
  { name: 'SQL', icon: <SiMysql /> },
  { name: 'C++', icon: <SiCplusplus /> },
  { name: 'Git', icon: <SiGit /> },
  { name: 'Django', icon: <SiDjango /> },
  
];



const About = () => {
  return (
    <section id="about" className="min-h-screen bg-primary-50 dark:bg-dark-900 py-20 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-dark-50 mb-12 font-sora">
            <span className="border-b-2 border-primary-200 dark:border-dark-700 pb-2">About</span>
          </h2>

          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-lg text-primary-700/80 dark:text-dark-200/80 font-sora leading-relaxed"
            >
              I'm a software developer with a strong emphasis on performance, scalability, and visual clarity. My work centers around building responsive interfaces, implementing precise UI behavior, and maintaining clean, maintainable code. I approach each project with attention to detail and a commitment to quality.
            </motion.p>

            { <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-lg text-primary-700/80 dark:text-dark-200/80 font-sora leading-relaxed"
            >
              With experience in both frontend and backend development, I focus on building scalable 
              applications that deliver exceptional user experiences. I believe in writing code that 
              is not only functional but also maintainable and well-documented.
            </motion.p> }

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-sora">
                <span className="border-b border-gray-800 dark:border-white/20 pb-1">TECHNICAL SKILLS</span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <motion.a
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    // transition={{ delay: 0.1 * index, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 text-gray-800/80 dark:text-white/80 font-sora text-sm uppercase tracking-widest"
                    whileHover={{scale: 1.05}}
                  >
                    <span className="text-xl">{skill.icon}</span>
                    {skill.name}
                  </motion.a>
                ))}
              </div>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;