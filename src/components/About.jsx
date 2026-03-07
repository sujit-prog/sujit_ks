import React from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, Code, Zap, Cpu, Binary, FileJson, 
  GitBranch, Database, Layers, ShieldAlert 
} from 'lucide-react';

const SKILLS = [
  { name: 'Python', icon: <Terminal size={18} />, cat: 'Logic' },
  { name: 'TypeScript', icon: <Code size={18} />, cat: 'System' },
  { name: 'ReactJS', icon: <Cpu size={18} />, cat: 'Interface' },
  { name: 'Node.js', icon: <Zap size={18} />, cat: 'Runtime' },
  { name: 'JavaScript', icon: <Binary size={18} />, cat: 'Logic' },
  { name: 'SQL', icon: <Database size={18} />, cat: 'Data' },
  { name: 'C++', icon: <Cpu size={18} />, cat: 'Low-Level' },
  { name: 'Git', icon: <GitBranch size={18} />, cat: 'Version' },
  { name: 'Django', icon: <Layers size={18} />, cat: 'Framework' },
  { name: 'MongoDB', icon: <FileJson size={18} />, cat: 'NoSQL' },
  { name: 'PostgreSQL', icon: <Database size={18} />, cat: 'SQL' }
];

const About = () => {
  return (
    <section id="about" className="min-h-screen bg-[#050505] text-white font-black py-20 px-6 relative overflow-hidden">
      {/* HUD Scanline Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 border-b-4 border-white/10 pb-8">
          <div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em] mb-2"
            >
              Pilot_Identity_Matrix_v4.2
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none"
            >
              THE_PILOT
            </motion.h2>
          </div>
          <div className="mt-8 md:mt-0 flex flex-col items-end opacity-40 text-right">
            <p className="text-[10px] uppercase tracking-widest">Rank: S-Class Dev</p>
            <p className="text-[10px] uppercase tracking-widest">Clearance: Level_05</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Bio Section */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-zinc-900 border-4 border-black p-8 relative shadow-[12px_12px_0px_0px_rgba(255,0,0,1)]"
            >
              {/* Tactical Corner Accents */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-8 border-l-8 border-red-600" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-8 border-r-8 border-red-600 opacity-20" />
              
              <p className="text-xl md:text-2xl italic font-bold text-white mb-6 leading-relaxed">
                I'm a software developer with a strong emphasis on <span className="text-red-600">performance</span>, <span className="text-red-600">scalability</span>, and <span className="text-red-600">visual clarity</span>. 
              </p>
              
              <p className="text-zinc-400 font-bold italic leading-relaxed text-base">
                My work centers around building responsive interfaces, implementing precise UI behavior, and maintaining clean, maintainable code. 
                I approach each project with attention to detail and a commitment to quality. With experience in both frontend and backend development, 
                I focus on building scalable applications that deliver exceptional user experiences.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-red-600/5 border-2 border-dashed border-red-600/20 p-6 flex items-center gap-4"
            >
               <ShieldAlert className="text-red-600 shrink-0" size={24} />
               <div>
                 <p className="text-[10px] font-black uppercase text-red-600 mb-1">Mission_Objective</p>
                 <p className="text-sm italic font-bold text-zinc-500">
                   "Writing code that is not only functional but also maintainable and well-documented."
                 </p>
               </div>
            </motion.div>
          </div>

          {/* Technical Loadout Sidebar */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.4em]">Tech_Loadout</p>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-red-600 animate-ping" />
                <div className="w-1 h-1 bg-red-600" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {SKILLS.map((skill, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10, backgroundColor: 'rgba(255, 0, 0, 0.1)', borderColor: '#dc2626' }}
                  className="bg-zinc-900 border-2 border-black p-3 flex items-center justify-between group cursor-crosshair transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-red-600 group-hover:scale-125 transition-transform duration-300">
                      {skill.icon}
                    </span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-tighter text-white group-hover:text-red-500 transition-colors">
                        {skill.name}
                      </p>
                      <p className="text-[7px] font-bold uppercase text-zinc-600 group-hover:text-zinc-400 transition-colors">
                        TYPE: {skill.cat}
                      </p>
                    </div>
                  </div>
                  <div className="h-1 w-12 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full bg-red-600/40 group-hover:bg-red-600 transition-colors"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;