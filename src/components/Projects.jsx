import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ShieldAlert, Maximize2 } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Student Assessment portal',
    description: 'A modern web application built with Python and Django for academic tracking and performance analytics.',
    technologies: ['Django', 'Python', 'Bootstrap'],
    link: 'https://assessmentportal-seven.vercel.app/',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
    color: 'bg-yellow-400'
  },
 
  {
    title: 'Location Safety Website',
    description: 'Real-time safety assessment based on location data, community reports, and emergency service proximity.',
    technologies: ['Next.js', 'Maps API', 'Tailwind'],
    link: 'https://safe-t-one.vercel.app/',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop',
    color: 'bg-blue-600'
  },
  {
  "title": "MedConnect Portal",
  "description": "A comprehensive healthcare hub enabling seamless doctor-patient interactions, automated appointment scheduling, and secure digital medical record access.",
  "technologies": ["React", "Firebase Auth", "Node.js", "MongoDB"],
  "link": "https://medivault-zeta.vercel.app",
  "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
  "color": "bg-emerald-600"
},
 {
    title: 'Smart_UPI Fraud Detection',
    description: "Detecting fraudulent transactions using advanced machine learning models and real-time verification.",
    technologies: ['Reactjs', 'Django', 'ML'],
    link: 'https://smart-upi-fraud-detection.vercel.app/',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
    color: 'bg-red-600'
  }
];

const Projects = () => {
  return (
    <div id="projects" className="min-h-screen bg-[#050505] text-white font-black p-6 md:p-12 relative overflow-hidden">
      {/* HUD Scanline Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 border-b-4 border-white/10 pb-8">
          <div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em] mb-2"
            >
              Subsystem_Garage_01
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none"
            >
              PROJECT_LOGS
            </motion.h2>
          </div>
          <div className="mt-8 md:mt-0 flex flex-col items-end opacity-40 text-right">
            <p className="text-[10px] uppercase tracking-widest">Active_Modules: 03</p>
            <p className="text-[10px] uppercase tracking-widest">System_Status: Optimal</p>
            <div className="flex gap-1 mt-2">
              <div className="w-2 h-2 bg-red-600 animate-pulse" />
              <div className="w-2 h-2 bg-white/20" />
              <div className="w-2 h-2 bg-white/20" />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -12 }}
              className="group relative bg-zinc-900 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden h-full"
            >
              {/* Image Preview */}
              <div className="relative h-56 w-full border-b-4 border-black overflow-hidden bg-zinc-800">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute top-4 left-4 bg-black text-white text-[8px] font-black px-2 py-1 italic tracking-widest uppercase">
                  MOD_{idx + 700}
                </div>
                <div className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  <Maximize2 size={16} />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none text-white group-hover:text-red-500 transition-colors">
                    {project.title}
                  </h3>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-red-500 transition-all transform hover:rotate-12"
                  >
                    <ArrowUpRight size={24} />
                  </a>
                </div>

                <p className="text-zinc-400 text-sm font-bold leading-relaxed mb-8 flex-1 italic opacity-80 group-hover:opacity-100">
                  {project.description}
                </p>

                {/* Tech Stack Footer */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech} 
                      className="text-[9px] text-zinc-500 border border-zinc-800 px-2 py-1 font-black uppercase tracking-widest bg-black/30 group-hover:border-red-900/50 group-hover:text-red-500 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accented Bottom Bar */}
              <div className={`h-2 w-full ${project.color} transition-all duration-500 group-hover:h-3`} />
            </motion.div>
          ))}
        </div>

        {/* Global Footer Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-20 bg-zinc-800" />
            <ShieldAlert size={16} className="text-red-600 animate-pulse" />
            <div className="h-[1px] w-20 bg-zinc-800" />
          </div>
          
          <motion.button 
            onClick={() => window.open('https://github.com/sujit-prog', '_blank')}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black border-4 border-black px-12 py-5 shadow-[10px_10px_0px_0px_rgba(255,0,0,1)] flex items-center gap-4 group"
          >
            <Github size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-black uppercase tracking-[0.3em]">Query_All_Repos</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;