import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Github, Linkedin, Instagram, Send,
  ShieldAlert, Globe, MessageSquare, Zap, Terminal
} from 'lucide-react';

const CONTACT_CHANNELS = [
  {
    text: 'E-mail',
    href: 'mailto:10sujitkumarsha@gmail.com',
    icon: <Mail size={20} />,
    id: 'SIG_01',
    status: 'ACTIVE'
  },
  {
    text: 'GitHub',
    href: 'https://github.com/sujit-prog',
    icon: <Github size={20} />,
    id: 'SIG_02',
    status: 'ENCRYPTED'
  },
  {
    text: 'LinkedIn',
    href: 'https://linkedin.com/in/Sujit-Kumar-Sha-',
    icon: <Linkedin size={20} />,
    id: 'SIG_03',
    status: 'STABLE'
  },
  {
    text: 'Instagram',
    href: 'https://instagram.com/sujit_shahaha',
    icon: <Instagram size={20} />,
    id: 'SIG_04',
    status: 'VISIBLE'
  },
];

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen bg-slate-50 dark:bg-[#050505] text-zinc-900 dark:text-white font-black py-20 px-6 relative overflow-hidden transition-colors duration-700">
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
              Comms_Terminal_Initialized
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl sm:text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none"
            >
              OPEN_COMMS
            </motion.h2>
          </div>
          <div className="mt-8 md:mt-0 flex flex-col items-end opacity-40 text-right">
            <p className="text-[10px] uppercase tracking-widest">Protocol: Direct_Signal</p>
            <p className="text-[10px] uppercase tracking-widest">Latency: 22ms</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Signal Transmission Section */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-100 dark:bg-zinc-900 border-4 border-black p-6 sm:p-8 relative shadow-[8px_8px_0px_0px_rgba(255,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(255,0,0,1)] transition-colors"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-8 border-l-8 border-red-600" />

              <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">GET_IN_TOUCH</h3>
              <p className="text-zinc-400 font-bold italic leading-relaxed text-base mb-8">
                Have a project in mind or want to collaborate? The terminal is open for transmission.
                Expect a response within standard operating cycles.
              </p>

              <div className="grid gap-4">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="SENDER_ID"
                    className="w-full bg-white dark:bg-black border-2 border-zinc-200 dark:border-zinc-800 p-4 text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white outline-none focus:border-red-600 transition-colors"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                    <Terminal size={14} />
                  </div>
                </div>

                <div className="relative group">
                  <textarea
                    rows="4"
                    placeholder="TRANSMISSION_CONTENT"
                    className="w-full bg-white dark:bg-black border-2 border-zinc-200 dark:border-zinc-800 p-4 text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white outline-none focus:border-red-600 transition-colors resize-none"
                  />
                  <div className="absolute right-4 top-4 opacity-20 group-focus-within:opacity-100 transition-opacity">
                    <MessageSquare size={14} />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-red-600 text-white font-black uppercase p-5 tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-red-500 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                >
                  <Send size={18} />
                  INITIALIZE_UPLOAD
                </motion.button>
              </div>
            </motion.div>

            <div className="bg-red-600/5 border-2 border-dashed border-red-600/20 p-6 flex items-center gap-4">
              <ShieldAlert className="text-red-600 shrink-0" size={24} />
              <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest leading-relaxed">
                All signals are processed through secure gateways. No unauthorized interception detected.
              </p>
            </div>
          </div>

          {/* Signal Channels Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.4em]">Signal_Channels</p>
              <Zap size={14} className="text-yellow-400" />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {CONTACT_CHANNELS.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10, backgroundColor: 'rgba(255, 0, 0, 0.1)', borderColor: '#dc2626' }}
                  className="bg-zinc-100 dark:bg-zinc-900 border-2 border-black p-5 flex items-center justify-between group cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-red-600 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                      {link.icon}
                    </span>
                    <div>
                      <p className="text-sm font-black uppercase tracking-tighter text-zinc-900 dark:text-white group-hover:text-red-500 transition-colors">
                        {link.text}
                      </p>
                      <p className="text-[7px] font-bold uppercase text-zinc-600">
                        UID: {link.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="flex gap-0.5">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className={`w-1 h-1 ${i === 2 ? 'bg-red-600 animate-pulse' : 'bg-red-600/20'}`} />
                      ))}
                    </div>
                    <p className="text-[8px] font-black text-emerald-500 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      {link.status}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="pt-8 opacity-20 group">
              <div className="flex items-center gap-4">
                <Globe size={16} />
                <div className="h-[2px] flex-1 bg-gradient-to-r from-white to-transparent" />
              </div>
              <p className="text-[8px] font-black uppercase tracking-[1em] mt-4">Global_Transmission_Node</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;