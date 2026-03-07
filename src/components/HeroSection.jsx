import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  Zap, Power, Camera, User, Cpu, Briefcase, Mail, 
  ShieldAlert, Play, Flag, AlertTriangle, RefreshCw, 
  ExternalLink, ChevronLeft, ChevronRight, Maximize2, Minimize2,
  Crosshair, ArrowUpRight, Lock, Unlock, Link as LinkIcon
} from 'lucide-react';

/**
 * THEME OBSERVER HOOK
 * Site-wide synchronization by watching the root element.
 */
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    setIsDarkMode(root.classList.contains('dark'));

    const observer = new MutationObserver(() => {
      setIsDarkMode(root.classList.contains('dark'));
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return { isDarkMode };
};

const CLOUDINARY_PHOTO = "https://res.cloudinary.com/dhigdp9hk/image/upload/v1772884241/me_rljhck.jpg";

// Realistic Car SVGs
const PlayerCarSVG = ({ color = "#ef4444", turn = 0 }) => (
  <motion.svg 
    viewBox="0 0 40 60" 
    className="w-full h-full drop-shadow-xl"
    animate={{ rotate: turn * 15 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <ellipse cx="20" cy="35" rx="15" ry="25" fill="black" fillOpacity="0.3" />
    <path d="M10 5 Q10 0 20 0 Q30 0 30 5 L32 15 Q34 25 34 45 Q34 55 28 58 L12 58 Q6 55 6 45 Q6 25 8 15 Z" fill={color} />
    <path d="M12 18 Q20 12 28 18 L26 28 Q20 24 14 28 Z" fill="#1e293b" />
    <path d="M14 45 Q20 42 26 45 L25 50 Q20 48 15 50 Z" fill="#1e293b" />
    <rect x="8" y="52" width="24" height="4" rx="1" fill="#111" />
    <rect x="9" y="3" width="4" height="6" rx="1" fill="#fef08a" className="animate-pulse" />
    <rect x="27" y="3" width="4" height="6" rx="1" fill="#fef08a" className="animate-pulse" />
    <rect x="9" y="55" width="4" height="2" rx="0.5" fill="#ef4444" />
    <rect x="27" y="55" width="4" height="2" rx="0.5" fill="#ef4444" />
  </motion.svg>
);

const EnemyCarSVG = ({ color = "#3b82f6", type = "sedan" }) => {
  if (type === "truck") {
    return (
      <svg viewBox="0 0 45 70" className="w-full h-full drop-shadow-lg">
        <rect x="8" y="5" width="29" height="60" rx="2" fill={color} />
        <rect x="10" y="8" width="25" height="15" rx="1" fill="#1e293b" />
        <rect x="10" y="30" width="25" height="30" fill="black" fillOpacity="0.2" />
        <rect x="8" y="62" width="5" height="3" fill="#ef4444" />
        <rect x="32" y="62" width="5" height="3" fill="#ef4444" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 60" className="w-full h-full drop-shadow-lg">
      <path d="M10 8 Q10 2 20 2 Q30 2 30 8 L32 20 Q33 30 33 50 Q33 58 20 58 Q7 58 7 50 Q7 30 8 20 Z" fill={color} />
      <path d="M12 20 Q20 15 28 20 L27 30 Q20 27 13 30 Z" fill="#334155" />
      <rect x="9" y="55" width="5" height="2" fill="#991b1b" />
      <rect x="26" y="55" width="5" height="2" fill="#991b1b" />
    </svg>
  );
};

const createAudioEngine = () => {
  if (typeof window === 'undefined') return null;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  const ctx = new AudioContext();
  
  const playUIBlip = (freq = 880, duration = 0.1, volume = 0.1) => {
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + duration);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + duration);
  };

  const playIgnition = () => {
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(40, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.3);
    osc.frequency.exponentialRampToValueAtTime(80, now + 1.2);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.1, now + 1.5);
    gain.gain.linearRampToValueAtTime(0, now + 2);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(now); osc.stop(now + 2);
  };

  const playStamp = () => {
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.2);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.3);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(now + 0.3);
  };

  const playCrash = () => {
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(20, ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.5);
  };
  
  return { playUIBlip, playIgnition, playCrash, playStamp, ctx };
};

const HeroSection = () => {
  const containerRef = useRef(null);
  const { isDarkMode } = useTheme();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [stampSequence, setStampSequence] = useState('idle'); // idle, slamming, done
  
  // Physics for Name/Header
  const headerX = useMotionValue(0);
  const headerY = useMotionValue(0);
  const headerRotateX = useTransform(headerY, [-100, 100], [10, -10]);
  const headerRotateY = useTransform(headerX, [-100, 100], [-10, 10]);
  const springHeaderX = useSpring(headerRotateX, { stiffness: 150, damping: 20 });
  const springHeaderY = useSpring(headerRotateY, { stiffness: 150, damping: 20 });

  // Shake logic for stamping
  const [isShaking, setIsShaking] = useState(false);

  // Game Logic
  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playerLane, setPlayerLane] = useState(1);
  const [prevLane, setPrevLane] = useState(1);
  const [enemies, setEnemies] = useState([]);
  const [roadOffset, setRoadOffset] = useState(0);

  const audio = useMemo(() => createAudioEngine(), []);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const gameInterval = setInterval(() => {
      const gameSpeed = 10 + Math.floor(score / 40);
      setScore(s => s + 1);
      setRoadOffset(prev => (prev + gameSpeed) % 80);
      setEnemies(prev => {
        const next = prev.map(e => ({ ...e, y: e.y + (gameSpeed - 3) })).filter(e => e.y < 500);
        if (next.length < 4 && Math.random() > 0.94) {
          const types = ["sedan", "sports", "truck"];
          const colors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#f43f5e", "#64748b"];
          next.push({ 
            id: Math.random(), 
            lane: Math.floor(Math.random() * 3), 
            y: -150, 
            type: types[Math.floor(Math.random() * types.length)], 
            color: colors[Math.floor(Math.random() * colors.length)] 
          });
        }
        const collision = next.find(e => e.y > 330 && e.y < 440 && e.lane === playerLane);
        if (collision) {
          setGameState('crashed');
          audio?.playCrash();
          if (score > highScore) setHighScore(score);
          return [];
        }
        return next;
      });
    }, 16);
    return () => clearInterval(gameInterval);
  }, [gameState, playerLane, score, highScore, audio]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setEnemies([]);
    setPlayerLane(1);
    audio?.playUIBlip(440, 0.2, 0.1);
  };

  const switchLane = (lane) => {
    if (gameState !== 'playing') return;
    setPrevLane(playerLane);
    setPlayerLane(lane);
    audio?.playUIBlip(600, 0.05, 0.05);
  };

  const handleIgnition = () => {
    audio?.playIgnition();
    setIsUnlocked(true);
    
    // Trigger Stamping Sequence
    setTimeout(() => {
        setStampSequence('slamming');
        audio?.playStamp();
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 200);
        setTimeout(() => setStampSequence('done'), 1000);
    }, 800);
  };

  const bgColor = isDarkMode ? 'bg-[#050505]' : 'bg-slate-50';
  const textColor = isDarkMode ? 'text-white' : 'text-zinc-900';

  return (
    <section 
      id="hero"
      ref={containerRef}
      className={`relative min-h-screen w-full ${bgColor} ${textColor} overflow-hidden font-black flex flex-col items-center justify-center transition-colors duration-700 select-none ${isShaking ? 'animate-[shake_0.2s_ease-in-out_infinite]' : ''}`}
    >
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div exit={{ opacity: 0, scale: 1.1 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl">
            <div className="flex flex-col items-center gap-12">
              <div className="text-center">
                <p className="text-red-600 text-[10px] font-bold tracking-[0.6em] mb-2 uppercase text-center">Ignition System Offline</p>
                <h3 className="text-white text-3xl italic tracking-tighter uppercase text-center">Sujit Kumar Sha</h3>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.9 }} 
                onClick={handleIgnition} 
                className="relative group w-56 h-56 flex items-center justify-center"
              >
                <div className="absolute inset-0 rounded-full border-[12px] border-zinc-900 shadow-[0_0_50px_rgba(255,0,0,0.3)]" />
                <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-red-600 to-red-900 border-4 border-black flex flex-col items-center justify-center group-hover:from-red-500 transition-all">
                  <Power size={42} className="text-white mb-2" />
                  <p className="text-white text-[14px] font-black tracking-widest leading-none">START</p>
                </div>
              </motion.button>
              <p className="text-zinc-500 text-[9px] font-bold tracking-[0.4em] uppercase text-center">Engage Drive System</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUnlocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full min-h-screen flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 z-[60] pointer-events-none opacity-[0.04] dark:opacity-[0.08] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />

            {/* STAMPING EFFECT */}
            <AnimatePresence>
                {stampSequence === 'slamming' && (
                    <motion.div 
                        initial={{ scale: 8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", damping: 12, stiffness: 300 }}
                        className="fixed inset-0 z-[160] flex items-center justify-center pointer-events-none"
                    >
                        <div className="border-[16px] border-red-600 bg-red-600/10 px-12 py-6 rotate-[-12deg] shadow-[0_0_100px_rgba(220,38,38,0.5)]">
                            <span className="text-red-600 text-8xl font-black italic uppercase tracking-tighter text-center">PILOT_VERIFIED</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* INCREASED SIZE LICENSE Card */}
            {stampSequence !== 'idle' && (
                <RaceLicense initialPos={{ top: '25%', right: '5%' }} isDark={isDarkMode} audio={audio} />
            )}

            <div className={`absolute top-0 left-0 w-full bg-red-600 border-b-4 border-black py-1 overflow-hidden z-[70]`}>
              <motion.div animate={{ x: [0, -1000] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap gap-12 items-center">
                {[...Array(10)].map((_, i) => <span key={i} className="text-white text-[9px] font-bold uppercase tracking-[0.4em] flex items-center gap-4"><ShieldAlert size={12} /> RACING CIRCUIT ONLINE • SCORE: {score} • TOP SPEED: {highScore} • PILOT: SUJIT KUMAR SHA • </span>)}
              </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col items-center">
                {/* Header with Tilt Physics */}
                <motion.div 
                  className="text-center mb-16 relative w-full perspective-1000"
                  style={{ rotateX: springHeaderX, rotateY: springHeaderY }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    headerX.set(e.clientX - rect.left - rect.width / 2);
                    headerY.set(e.clientY - rect.top - rect.height / 2);
                  }}
                  onMouseLeave={() => { headerX.set(0); headerY.set(0); }}
                >
                  <h1 className={`text-[10vw] leading-none tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b ${isDarkMode ? 'from-zinc-800 to-zinc-950' : 'from-zinc-200 to-zinc-300'} opacity-30 italic font-black`}>ELITE_SQUAD</h1>
                  <h2 className={`text-[9vw] leading-none tracking-tighter ${textColor} mt-[-6vw] relative z-10 italic drop-shadow-2xl`}>SUJIT <span className={'text-red-600'}>KUMAR SHA</span></h2>

                  <div className="flex flex-col items-center gap-8 mt-12">
                     <div className="flex items-center gap-16">
                        <div className="text-center">
                          <p className="text-[10px] uppercase text-zinc-500 font-bold mb-1 text-left">MPH</p>
                          <p className={`text-6xl font-black italic tabular-nums text-red-500`}>{Math.round(score / 2 + 100)}</p>
                        </div>
                        <div className={`h-20 w-[1px] ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
                        <div className="text-center">
                          <p className="text-[10px] uppercase text-zinc-500 font-bold mb-1 text-left">Meters</p>
                          <p className="text-6xl font-black italic tabular-nums">{score}</p>
                        </div>
                     </div>

                     <div className="relative w-full max-sm:scale-90">
                        {gameState === 'idle' || gameState === 'crashed' ? (
                          <motion.button 
                            onClick={startGame} 
                            whileHover={{ scale: 1.05, rotate: -1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white px-10 py-4 flex items-center gap-4 group mx-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                          >
                             <Flag size={20} className={'text-red-500'} />
                             <span className="text-sm font-black uppercase tracking-[0.2em]">{gameState === 'crashed' ? 'RETRY CIRCUIT' : 'START RACING'}</span>
                          </motion.button>
                        ) : (
                          <div className="relative flex flex-col items-center">
                            {/* ENHANCED ROAD HUD */}
                            <div className="relative h-80 w-72 bg-zinc-900 border-4 border-black overflow-hidden flex mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg">
                               {/* Side Scenery movement */}
                               <div className="absolute left-0 top-0 bottom-0 w-4 bg-zinc-800 border-r-2 border-zinc-700">
                                  <div className="absolute w-full h-full" style={{ transform: `translateY(${roadOffset}px)` }}>
                                    {[...Array(6)].map((_, i) => <div key={i} className="h-8 w-full border-y border-zinc-950 opacity-20" />)}
                                  </div>
                               </div>
                               <div className="absolute right-0 top-0 bottom-0 w-4 bg-zinc-800 border-l-2 border-zinc-700">
                                  <div className="absolute w-full h-full" style={{ transform: `translateY(${roadOffset}px)` }}>
                                    {[...Array(6)].map((_, i) => <div key={i} className="h-8 w-full border-y border-zinc-950 opacity-20" />)}
                                  </div>
                               </div>

                               <div className="absolute inset-0 border-x-4 border-zinc-700 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%)] bg-[size:10px:10px]" />
                               <div className="absolute inset-0 flex px-4">
                                 <div className="flex-1 border-r-4 border-dashed border-white/10 relative overflow-hidden">
                                    <div className="absolute w-full h-full" style={{ transform: `translateY(${roadOffset}px)` }}>
                                      {[...Array(8)].map((_, i) => <div key={i} className="w-1.5 h-12 bg-white/20 mx-auto my-10" />)}
                                    </div>
                                 </div>
                                 <div className="flex-1 border-r-4 border-dashed border-white/10 relative overflow-hidden">
                                    <div className="absolute w-full h-full" style={{ transform: `translateY(${roadOffset}px)` }}>
                                      {[...Array(8)].map((_, i) => <div key={i} className="w-1.5 h-12 bg-white/20 mx-auto my-10" />)}
                                    </div>
                                 </div>
                               </div>

                               {enemies.map(e => (
                                 <motion.div 
                                    key={e.id} 
                                    style={{ left: `${e.lane * 33.3}%`, top: e.y }} 
                                    className="absolute w-1/3 h-20 flex items-center justify-center"
                                 >
                                    <div className="w-14 h-22">
                                      <EnemyCarSVG color={e.color} type={e.type} />
                                    </div>
                                 </motion.div>
                               ))}
                               
                               <motion.div animate={{ left: `${playerLane * 33.3}%` }} className="absolute bottom-10 w-1/3 h-24 flex items-center justify-center z-10">
                                  <motion.div className="w-14 h-24 relative">
                                     <PlayerCarSVG turn={playerLane - prevLane} />
                                     <motion.div 
                                        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
                                        transition={{ repeat: Infinity, duration: 0.08 }}
                                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-8 bg-gradient-to-t from-red-600 to-orange-400 blur-sm rounded-full" 
                                     />
                                  </motion.div>
                               </motion.div>
                               
                               <div className="absolute top-2 left-2 text-[7px] text-white/30 uppercase font-black tracking-widest bg-black/40 px-2 py-1">Manual_Override_Active</div>
                            </div>
                            
                            <div className="flex gap-4 mt-6 w-full justify-center">
                              {[0, 1, 2].map((lane) => (
                                <motion.button 
                                  key={lane}
                                  whileTap={{ scale: 0.9 }} 
                                  onClick={() => switchLane(lane)} 
                                  className={`w-14 h-14 border-4 border-black flex items-center justify-center transition-all ${playerLane === lane ? 'bg-red-600 text-white shadow-none translate-y-1' : 'bg-zinc-800 text-zinc-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
                                >
                                  {lane === 0 ? <ChevronLeft size={24} /> : lane === 2 ? <ChevronRight size={24} /> : <div className="w-3 h-3 rounded-full bg-current" />}
                                </motion.button>
                              ))}
                            </div>
                            <p className="text-[9px] uppercase font-bold text-zinc-500 mt-3 tracking-widest text-center w-full">Select Lane to Dodge</p>
                          </div>
                        )}
                        {gameState === 'crashed' && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-2 text-[14px] italic font-black shadow-2xl border-2 border-white skew-x-[-12deg] z-[100]">
                             CRITICAL DAMAGE: {score} METERS
                          </motion.div>
                        )}
                     </div>
                  </div>
                </motion.div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl relative z-50 px-4 mt-12 pb-12">
                  <DashCard href="#projects" title="GARAGE" subtitle="My Lab" color="bg-yellow-400" icon={<Maximize2 size={22} />} />
                  <DashCard href="#about" title="PILOT" subtitle="Profile" color="bg-emerald-500" icon={<User size={22} />} />
                  <DashCard href="#experience" title="TRACK" subtitle="History" color="bg-purple-600" icon={<Briefcase size={22} />} />
                  <DashCard href="#contact" title="COMMS" subtitle="Connect" color="bg-red-600" icon={<Mail size={22} />} />
                  <DashCard href="https://sujitkumarshaportfolio.framer.website/" title="ALSO" subtitle="Me" color="bg-blue-600" icon={<LinkIcon size={22} />} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}} />
    </section>
  );
};

const DashCard = ({ href, title, subtitle, color, icon }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [15, -15]);
  const rotateY = useTransform(x, [-50, 50], [-15, 15]);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 15 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 15 });

  return (
    <motion.a 
      href={href} 
      style={{ rotateX: springX, rotateY: springY, perspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`${color} p-4 sm:p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group relative overflow-hidden h-32 sm:h-40 flex flex-col justify-end transition-all active:shadow-none active:translate-x-1 active:translate-y-1`}
    >
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 group-hover:scale-125 transition-all text-white/90">{icon}</div>
      <div className="relative z-10 text-white text-left">
        <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest opacity-80 mb-0.5 sm:mb-1 text-left">{subtitle}</p>
        <h3 className="text-xl sm:text-3xl font-black uppercase italic leading-none tracking-tighter text-left">{title}</h3>
      </div>
    </motion.a>
  );
};

const RaceLicense = ({ initialPos, isDark, audio }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  const springX = useSpring(rotateX);
  const springY = useSpring(rotateY);

  const toggleExpand = (e) => {
    e.stopPropagation();
    audio?.playUIBlip(400, 0.2, 0.05);
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5, x: 200 }}
      animate={{ 
        opacity: 1, 
        scale: isExpanded ? 1.25 : 1, 
        x: 0,
        zIndex: isExpanded ? 150 : 120
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      drag 
      dragMomentum={false}
      style={{ ...initialPos, rotateX: springX, rotateY: springY, perspective: 1000 }}
      onMouseMove={(e) => {
        if (isExpanded) return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      // INCREASED CONTAINER WIDTH
      className={`absolute w-80 md:w-[400px] cursor-grab active:cursor-grabbing perspective-1000 hidden md:block`}
    >
      <motion.div 
        animate={{ rotateY: isFlipped ? 180 : 0 }} 
        transition={{ type: "spring", stiffness: 260, damping: 20 }} 
        // INCREASED INNER HEIGHT
        className="relative w-full preserve-3d h-60 group"
      >
        {/* Front */}
        <div className={`absolute inset-0 backface-hidden ${isDark ? 'bg-zinc-900 border-white/20 text-white' : 'bg-white border-black/10 text-black'} border-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 font-mono flex flex-col`}>
          <div className="flex justify-between items-center border-b-2 border-zinc-800 pb-3 mb-4">
            <p className="text-[11px] font-black uppercase text-red-600 italic tracking-[0.2em]">PILOT_AUTH_v3.2</p>
            <div className="flex items-center gap-2">
               <button onClick={toggleExpand} className="p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors" title={isExpanded ? "Collapse" : "Expand"}>
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
               <button onClick={(e) => { e.stopPropagation(); setIsFlipped(true); audio?.playUIBlip(); }} className="p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors" title="Flip Card">
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
          <div className="flex gap-6 text-left flex-1">
            {/* INCREASED IMAGE SIZE */}
            <div className="relative w-28 h-36 bg-black overflow-hidden border-2 border-zinc-800 flex-shrink-0">
              <img src={CLOUDINARY_PHOTO} className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" alt="Pilot" />
              <div className="absolute inset-0 bg-red-600/10 pointer-events-none group-hover:bg-transparent transition-colors" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div className="space-y-1">
                <p className="text-[7px] text-zinc-500 uppercase tracking-widest leading-none text-left">ID_PILOT_VERIFIED</p>
                <p className="text-[18px] font-black italic uppercase tracking-tighter text-left leading-tight">S. Kumar Sha</p>
                <p className="text-[10px] font-bold text-yellow-400 italic uppercase text-left tracking-widest">S-CLASS_FULL_STACK</p>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 opacity-40">
                    <div className="h-1 flex-1 bg-zinc-700" />
                    <span className="text-[6px] font-bold uppercase">System_Active</span>
                </div>
                <motion.a 
                  href="https://drive.google.com/file/d/1t6gU6EOviWox8imUg9vMJfQOwzzAnbxR/view?usp=sharing"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-between bg-red-600 text-white px-3 py-2 text-[9px] font-black uppercase italic tracking-tighter border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  <span>Access_Dossier</span>
                  <ArrowUpRight size={10} />
                </motion.a>
              </div>
              <p className="text-[6px] text-zinc-600 italic mt-2 text-left opacity-50 uppercase tracking-[0.3em]">SECURE_MOD_ENABLED</p>
            </div>
          </div>
        </div>
        
        {/* Back */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 ${isDark ? 'bg-zinc-950 border-red-600 text-white' : 'bg-slate-100 border-blue-600 text-black'} border-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col justify-between`}>
           <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
             <p className="text-[10px] font-black uppercase italic tracking-widest">Subsystem Access</p>
             <button onClick={() => setIsFlipped(false)} className="p-1 hover:bg-zinc-800 rounded transition-colors"><RefreshCw size={16} /></button>
           </div>
           <div className="flex flex-col gap-3 py-4">
             <a href="#projects" className="bg-zinc-900 border border-zinc-800 p-3 text-[11px] font-black italic text-center text-white hover:border-red-500 transition-colors uppercase tracking-[0.2em]">Open_Garage_Logs</a>
             <a href="#experience" className="bg-zinc-900 border border-zinc-800 p-3 text-[11px] font-black italic text-center text-white hover:border-red-500 transition-colors uppercase tracking-[0.2em]">Open_Track_Hist</a>
             <a href="#contact" className="bg-zinc-900 border border-zinc-800 p-3 text-[11px] font-black italic text-center text-white hover:border-red-500 transition-colors uppercase tracking-[0.2em]">Open_Comms_Feed</a>
           </div>
           <div className="mt-auto flex justify-between items-center opacity-30 border-t border-zinc-800 pt-3">
                <span className="text-[7px] font-mono uppercase tracking-[0.3em]">Sector_0x7f</span>
                <ShieldAlert size={12} />
           </div>
        </div>
      </motion.div>
      <style dangerouslySetInnerHTML={{ __html: `.preserve-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; } .rotate-y-180 { transform: rotateY(180deg); }`}} />
    </motion.div>
  );
};

export default HeroSection;