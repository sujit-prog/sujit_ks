import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  MapPin,
  ShieldAlert,
  Trophy,
  Zap,
  Activity,
  ChevronRight
} from 'lucide-react';

import { useTheme } from '../context/ThemeContext';

const EXPERIENCE_LOGS = [
  {
    company: "INFOSYS SPRINGBOARD",
    role: "JAVA DEVELOPMENT INTERN",
    period: "2026",
    location: "REMOTE_SECTOR",
    description: "Orchestrated high-performance web architectures and managed neural-interface dashboard systems.",
    achievements: ["Created Medivault", "Collaborated with team", "Best project group"],
    gear: "5"
  },
  {
    company: "TALESOUL",
    role: "Backend Developer",
    period: "2025 - 2026",
    location: "SAMBALPUR",
    description: "Developed Admin and User backend interfaces and optimized data-stream processing for real-time tracking.",
    achievements: ["Integrated 12+ APIs", "Optimized Database"],
    gear: "4"
  },
  {
    company: "AICTE Collab MICROSOFT",
    role: "AI AZURE INTERN",
    period: "2025",
    location: "REMOTE",
    description: "Developed AI predictor and optimized data-stream processing for real-time tracking.",
    achievements: ["Completed Azure courses on Microsoft portal", "created AI bike rental prediction model"],
    gear: "3"
  }
];

const Experience = () => {
  const { isDarkMode } = useTheme();

  const bgColor = isDarkMode ? 'bg-[#050505]' : 'bg-slate-50';
  const textColor = isDarkMode ? 'text-white' : 'text-zinc-900';

  return (
    <section id="experience" className={`min-h-screen ${bgColor} ${textColor} p-6 md:p-12 relative overflow-hidden transition-colors duration-700`}>
      {/* HUD Scanline Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* HEADER BLOCK */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 border-b-4 border-zinc-800 pb-8">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-blue-600 dark:text-red-600 text-[10px] font-black uppercase tracking-[0.6em] mb-2"
            >
              System_Track_Records_v3.0
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl sm:text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none"
            >
              WORK_<span className="text-blue-600 dark:text-red-600">HISTORY</span>
            </motion.h2>
          </div>
          <div className="mt-8 md:mt-0 flex flex-col items-end opacity-40">
            <div className="flex gap-2 mb-2">
              {[...Array(5)].map((_, i) => <div key={i} className={`w-1 h-4 ${i < 3 ? 'bg-blue-600 dark:bg-red-600' : 'bg-zinc-800'}`} />)}
            </div>
            <p className="text-[9px] font-mono uppercase tracking-widest">DEV_Rank: S-Class</p>
          </div>
        </div>

        {/* TIMELINE TRACK */}
        <div className="relative">
          {/* Central Rail */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-zinc-800 md:-translate-x-1/2 hidden sm:block">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 1.5 }}
              className="w-full bg-gradient-to-b from-blue-600 dark:from-red-600 to-transparent"
            />
          </div>

          <div className="flex flex-col gap-16">
            {EXPERIENCE_LOGS.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
              >
                {/* Node Point */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-blue-600 dark:bg-red-600 border-4 border-black z-20 md:-translate-x-1/2 hidden sm:block shadow-[0_0_15px_rgba(220,38,38,0.5)]" />

                {/* Content Side */}
                <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`bg-zinc-100 dark:bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] sm:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] p-6 sm:p-8 relative overflow-hidden group transition-colors`}
                  >
                    {/* Decorative Gear Tag */}
                    <div className="absolute top-0 right-0 bg-blue-600 dark:bg-red-600 text-white text-[10px] font-black px-3 py-1 italic skew-x-[-20deg] translate-x-2 -translate-y-1">
                      GEAR_{log.gear}
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 text-blue-600 dark:text-red-600">
                        <Activity size={16} className="animate-pulse" />
                        <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase">Session_Verified</span>
                      </div>

                      <div className="text-left">
                        <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-1">
                          {log.role}
                        </h3>
                        <p className="text-blue-600 dark:text-red-600 text-sm font-black tracking-widest uppercase">
                          @{log.company}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-4 opacity-60 text-[10px] font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-1"><Calendar size={12} /> {log.period}</div>
                        <div className="flex items-center gap-1"><MapPin size={12} /> {log.location}</div>
                      </div>

                      <p className="text-zinc-600 dark:text-zinc-400 text-sm font-bold italic leading-relaxed text-left">
                        {log.description}
                      </p>

                      <div className="flex flex-col gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-4">
                        {log.achievements.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 group/item">
                            <ChevronRight size={14} className="text-blue-600 dark:text-red-600 group-hover/item:translate-x-1 transition-transform" />
                            <span className="text-[11px] font-black uppercase tracking-wider opacity-80">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Background Glow */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/5 dark:bg-red-600/5 blur-3xl rounded-full group-hover:bg-blue-600/10 dark:bg-red-600/10 transition-all duration-500" />
                  </motion.div>
                </div>

                {/* Empty Side for Spacing */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* FOOTER CALLOUT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-1 bg-blue-600 dark:bg-red-600" />
            <ShieldAlert size={20} className="text-blue-600 dark:text-red-600 animate-bounce" />
            <div className="w-12 h-1 bg-blue-600 dark:bg-red-600" />
          </div>
          <p className="text-xs font-mono font-black tracking-[0.4em] uppercase opacity-40 italic">End_Of_Transmission</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;