import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  Zap, Power, Camera, User, Cpu, Briefcase, Mail,
  ShieldAlert, Play, Flag, AlertTriangle, RefreshCw,
  ExternalLink, ChevronLeft, ChevronRight, Maximize2, Minimize2,
  Crosshair, ArrowUpRight, Lock, Unlock, Link as LinkIcon,
  Download
} from 'lucide-react';

import { useTheme } from '../context/ThemeContext';

const CLOUDINARY_PHOTO = "https://res.cloudinary.com/dhigdp9hk/image/upload/v1772884241/me_rljhck.jpg";

// Realistic Car SVGs
const PlayerCarSVG = ({ turn = 0 }) => (
  <motion.svg
    viewBox="0 0 40 60"
    className="w-full h-full drop-shadow-xl text-blue-600 dark:text-red-600"
    animate={{ rotate: turn * 15 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <ellipse cx="20" cy="35" rx="15" ry="25" fill="black" fillOpacity="0.3" />
    <path d="M10 5 Q10 0 20 0 Q30 0 30 5 L32 15 Q34 25 34 45 Q34 55 28 58 L12 58 Q6 55 6 45 Q6 25 8 15 Z" fill="currentColor" />
    <path d="M12 18 Q20 12 28 18 L26 28 Q20 24 14 28 Z" fill="#1e293b" />
    <path d="M14 45 Q20 42 26 45 L25 50 Q20 48 15 50 Z" fill="#1e293b" />
    <rect x="8" y="52" width="24" height="4" rx="1" fill="#111" />
    <rect x="9" y="3" width="4" height="6" rx="1" fill="#fef08a" className="animate-pulse" />
    <rect x="27" y="3" width="4" height="6" rx="1" fill="#fef08a" className="animate-pulse" />
    <rect x="9" y="55" width="4" height="2" rx="0.5" className="fill-orange-500 dark:fill-red-500" />
    <rect x="27" y="55" width="4" height="2" rx="0.5" className="fill-orange-500 dark:fill-red-500" />
  </motion.svg>
);

const EnemyCarSVG = ({ color = "#3b82f6", type = "sedan" }) => {
  if (type === "truck") {
    return (
      <svg viewBox="0 0 45 70" className="w-full h-full drop-shadow-lg">
        <rect x="8" y="5" width="29" height="60" rx="2" fill={color} />
        <rect x="10" y="8" width="25" height="15" rx="1" fill="#1e293b" />
        <rect x="10" y="30" width="25" height="30" fill="black" fillOpacity="0.2" />
        <rect x="8" y="62" width="5" height="3" className="fill-orange-500 dark:fill-red-500" />
        <rect x="32" y="62" width="5" height="3" className="fill-orange-500 dark:fill-red-500" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 60" className="w-full h-full drop-shadow-lg">
      <path d="M10 8 Q10 2 20 2 Q30 2 30 8 L32 20 Q33 30 33 50 Q33 58 20 58 Q7 58 7 50 Q7 30 8 20 Z" fill={color} />
      <path d="M12 20 Q20 15 28 20 L27 30 Q20 27 13 30 Z" fill="#334155" />
      <rect x="9" y="55" width="5" height="2" className="fill-orange-500 dark:fill-red-500" />
      <rect x="26" y="55" width="5" height="2" className="fill-orange-500 dark:fill-red-500" />
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

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isUnlocked) {
        if (e.code === 'Space' || e.code === 'Enter') handleIgnition();
        return;
      }

      if (gameState === 'idle' || gameState === 'crashed') {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          startGame();
        }
        return;
      }

      if (gameState === 'playing') {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          if (playerLane > 0) switchLane(playerLane - 1);
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          if (playerLane < 2) switchLane(playerLane + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isUnlocked, playerLane]);

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
            <div className="flex flex-col items-center gap-8 sm:gap-12 px-6">
              <div className="text-center">
                <p className="text-blue-600 dark:text-red-600 text-[8px] sm:text-[10px] font-bold tracking-[0.4em] sm:tracking-[0.6em] mb-2 uppercase text-center">Ignition System Offline</p>
                <h3 className="text-white text-2xl sm:text-3xl italic tracking-tighter uppercase text-center">Sujit Kumar Sha</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleIgnition}
                className="relative group w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center"
              >
                <div className="absolute inset-0 rounded-full border-[8px] sm:border-[12px] border-zinc-900 shadow-[0_0_50px_rgba(255,0,0,0.3)]" />
                <div className="relative w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-blue-600 dark:from-red-600 to-blue-900 dark:to-red-900 border-4 border-black flex flex-col items-center justify-center group-hover:from-orange-500 dark:from-red-500 transition-all">
                  <Power size={32} className="text-white mb-1 sm:mb-2" />
                  <p className="text-white text-[10px] sm:text-[14px] font-black tracking-widest leading-none">START</p>
                </div>
              </motion.button>
              <p className="text-zinc-500 text-[8px] sm:text-[9px] font-bold tracking-[0.4em] uppercase text-center">Engage Drive System</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUnlocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full min-h-screen flex flex-col items-center justify-center relative pt-20 pb-12">
            <div className="absolute inset-0 z-[60] pointer-events-none opacity-[0.04] dark:opacity-[0.08] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />

            {/* CRASH FLASH EFFECT */}
            <AnimatePresence>
              {gameState === 'crashed' && (
                <motion.div
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="fixed inset-0 z-[190] bg-red-600 pointer-events-none mix-blend-overlay"
                />
              )}
            </AnimatePresence>

            {/* STAMPING EFFECT - Scaled for mobile */}
            <AnimatePresence>
              {stampSequence === 'slamming' && (
                <motion.div
                  initial={{ scale: 5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", damping: 12, stiffness: 300 }}
                  className="fixed inset-0 z-[160] flex items-center justify-center pointer-events-none px-6"
                >
                  <div className="border-[8px] sm:border-[16px] border-blue-600 dark:border-red-600 bg-blue-600/10 dark:bg-red-600/10 px-6 sm:px-12 py-3 sm:py-6 rotate-[-12deg] shadow-[0_0_100px_rgba(220,38,38,0.5)]">
                    <span className="text-blue-600 dark:text-red-600 text-3xl sm:text-8xl font-black italic uppercase tracking-tighter text-center">DEV_VERIFIED</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* LICENSE Card - Centered on mobile after stamping */}
            {stampSequence !== 'idle' && (
              <RaceLicense
                initialPos={{ top: '25%', right: '5%' }}
                isDark={isDarkMode}
                audio={audio}
              />
            )}

            <div className={`absolute top-0 left-0 w-full bg-blue-600 dark:bg-red-600 border-b-4 border-black py-1 overflow-hidden z-[70]`}>
              <motion.div animate={{ x: [0, -1000] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap gap-12 items-center">
                {[...Array(10)].map((_, i) => <span key={i} className="text-white text-[9px] font-bold uppercase tracking-[0.4em] flex items-center gap-4"><ShieldAlert size={12} /> RACING CIRCUIT ONLINE • SCORE: {score} • TOP SPEED: {highScore} • PILOT: SUJIT KUMAR SHA • </span>)}
              </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10 w-full">
              <div className="flex flex-col items-center">
                {/* Header with Tilt Physics - Responsive Typography */}
                <motion.div
                  className="text-center mb-8 sm:mb-16 relative w-full perspective-1000"
                  style={{ rotateX: springHeaderX, rotateY: springHeaderY }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    headerX.set(e.clientX - rect.left - rect.width / 2);
                    headerY.set(e.clientY - rect.top - rect.height / 2);
                  }}
                  onMouseLeave={() => { headerX.set(0); headerY.set(0); }}
                >
                  <h1 className={`text-[12vw] sm:text-[10vw] leading-none tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b ${isDarkMode ? 'from-zinc-800 to-zinc-950' : 'from-zinc-200 to-zinc-300'} opacity-30 italic font-black`}>ELITE_SQUAD</h1>
                  <h2 className={`text-[10vw] sm:text-[9vw] leading-none tracking-tighter ${textColor} mt-[-7vw] sm:mt-[-6vw] relative z-10 italic drop-shadow-2xl`}>SUJIT <span className={'text-blue-600 dark:text-red-600'}>KUMAR SHA</span></h2>

                  <div className="flex flex-col items-center gap-4 sm:gap-8 mt-6 sm:mt-12">
                    <div className="flex items-center gap-8 sm:gap-16">
                      <div className="text-center">
                        <p className="text-[8px] sm:text-[10px] uppercase text-zinc-500 font-bold mb-1 text-left">MPH</p>
                        <p className={`text-4xl sm:text-6xl font-black italic tabular-nums text-orange-500 dark:text-red-500`}>{Math.round(score / 2 + 100)}</p>
                      </div>
                      <div className={`h-12 sm:h-20 w-[1px] ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
                      <div className="text-center">
                        <p className="text-[8px] sm:text-[10px] uppercase text-zinc-500 font-bold mb-1 text-left">Meters</p>
                        <p className="text-4xl sm:text-6xl font-black italic tabular-nums">{score}</p>
                      </div>
                    </div>

                    <div className="relative w-full max-w-sm sm:max-w-none">
                      {gameState === 'idle' || gameState === 'crashed' ? (
                        <div className="flex flex-col items-center">
                          <motion.button
                            onClick={startGame}
                            whileHover={{ scale: 1.05, rotate: -1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white px-6 sm:px-10 py-3 sm:py-4 flex items-center gap-4 group mx-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                          >
                            <Flag size={18} className={'text-orange-500 dark:text-red-500'} />
                            <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em]">{gameState === 'crashed' ? 'RETRY CIRCUIT' : 'START RACING'}</span>
                          </motion.button>
                          <p className="text-[8px] sm:text-[10px] text-zinc-500 uppercase font-bold text-center mt-4">Press [SPACE] to start</p>
                        </div>
                      ) : (
                        <div className="relative flex flex-col items-center scale-90 sm:scale-100">
                          {/* DYNAMIC PARALLAX GRID (moves based on speed) */}
                          <div className="absolute inset-0 -z-10 w-[200%] h-[200%] left-[-50%] top-[-50%] pointer-events-none opacity-30" style={{ perspective: '1000px' }}>
                            <motion.div
                              animate={{ backgroundPositionY: ['0px', '40px'] }}
                              transition={{ repeat: Infinity, ease: 'linear', duration: Math.max(0.1, 0.4 - (score * 0.0005)) }}
                              className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [transform:rotateX(60deg)_translateZ(-200px)]"
                            />
                          </div>

                          {/* SPEED LINES */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: score > 50 ? 1 : 0 }}
                            className="absolute -inset-x-20 top-0 bottom-0 pointer-events-none overflow-hidden"
                          >
                            <div className="absolute left-0 w-8 h-full bg-[linear-gradient(transparent,rgba(255,255,255,0.8),transparent)] blur-[2px] opacity-20" style={{ transform: `translateY(${roadOffset * 2}px)` }} />
                            <div className="absolute right-0 w-8 h-full bg-[linear-gradient(transparent,rgba(255,255,255,0.8),transparent)] blur-[2px] opacity-20" style={{ transform: `translateY(${roadOffset * 1.5}px)` }} />
                          </motion.div>

                          {/* ENHANCED ROAD HUD */}
                          <div className="relative h-64 sm:h-80 w-64 sm:w-72 bg-zinc-900 border-4 border-black overflow-hidden flex mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg">
                            <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-4 bg-zinc-800 border-r-2 border-zinc-700">
                              <div className="absolute w-full h-full" style={{ transform: `translateY(${roadOffset}px)` }}>
                                {[...Array(6)].map((_, i) => <div key={i} className="h-8 w-full border-y border-zinc-950 opacity-20" />)}
                              </div>
                            </div>
                            <div className="absolute right-0 top-0 bottom-0 w-3 sm:w-4 bg-zinc-800 border-l-2 border-zinc-700">
                              <div className="absolute w-full h-full" style={{ transform: `translateY(${roadOffset}px)` }}>
                                {[...Array(6)].map((_, i) => <div key={i} className="h-8 w-full border-y border-zinc-950 opacity-20" />)}
                              </div>
                            </div>

                            <div className="absolute inset-0 border-x-4 border-zinc-700 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%)] bg-[size:10px:10px]" />
                            <div className="absolute inset-0 flex px-2 sm:px-4">
                              <div className="flex-1 border-r-4 border-dashed border-white/10 relative overflow-hidden">
                                <div className="absolute w-full h-full" style={{ transform: `translateY(${roadOffset}px)` }}>
                                  {[...Array(8)].map((_, i) => <div key={i} className="w-1 sm:w-1.5 h-10 sm:h-12 bg-white/20 mx-auto my-8 sm:my-10" />)}
                                </div>
                              </div>
                              <div className="flex-1 border-r-4 border-dashed border-white/10 relative overflow-hidden">
                                <div className="absolute w-full h-full" style={{ transform: `translateY(${roadOffset}px)` }}>
                                  {[...Array(8)].map((_, i) => <div key={i} className="w-1 sm:w-1.5 h-10 sm:h-12 bg-white/20 mx-auto my-8 sm:my-10" />)}
                                </div>
                              </div>
                            </div>

                            {enemies.map(e => (
                              <motion.div
                                key={e.id}
                                style={{ left: `${e.lane * 33.3}%`, top: e.y }}
                                className="absolute w-1/3 h-16 sm:h-20 flex items-center justify-center"
                              >
                                <div className="w-12 h-18 sm:w-14 sm:h-22">
                                  <EnemyCarSVG color={e.color} type={e.type} />
                                </div>
                              </motion.div>
                            ))}

                            <motion.div animate={{ left: `${playerLane * 33.3}%` }} className="absolute bottom-6 sm:bottom-10 w-1/3 h-20 sm:h-24 flex items-center justify-center z-10">
                              <motion.div className="w-12 h-20 sm:w-14 sm:h-24 relative">
                                <PlayerCarSVG turn={playerLane - prevLane} />
                                <motion.div
                                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
                                  transition={{ repeat: Infinity, duration: 0.08 }}
                                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 sm:w-4 h-6 sm:h-8 bg-gradient-to-t from-blue-600 dark:from-red-600 to-orange-400 blur-sm rounded-full"
                                />
                              </motion.div>
                            </motion.div>
                          </div>

                          <div className="flex gap-4 mt-4 sm:mt-6 w-full justify-center">
                            {[0, 1, 2].map((lane) => (
                              <motion.button
                                key={lane}
                                whileTap={{ scale: 0.8 }}
                                onClick={() => switchLane(lane)}
                                className={`w-12 h-12 sm:w-14 sm:h-14 border-4 border-black flex items-center justify-center transition-all ${playerLane === lane ? 'bg-blue-600 dark:bg-red-600 text-white shadow-none translate-y-1' : 'bg-zinc-800 text-zinc-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
                              >
                                {lane === 0 ? <ChevronLeft size={20} /> : lane === 2 ? <ChevronRight size={20} /> : <div className="w-2.5 h-2.5 rounded-full bg-current" />}
                              </motion.button>
                            ))}
                          </div>
                          <p className="text-[7px] sm:text-[9px] uppercase font-bold text-zinc-500 mt-2 sm:mt-3 tracking-widest text-center w-full">Use Arrow Keys / A / D to Steer</p>
                        </div>
                      )}
                      {gameState === 'crashed' && (
                        <motion.div initial={{ scale: 0, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="absolute -top-8 sm:-top-12 left-1/2 -translate-x-1/2 bg-blue-600 dark:bg-red-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-[14px] italic font-black shadow-2xl border-2 border-white skew-x-[-12deg] z-[100] whitespace-nowrap">
                          CRITICAL DAMAGE: {score} METERS <br />
                          <span className="text-[10px] opacity-80">(Press SPACE to restart)</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Dashboard Grid - Fully Responsive */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full max-w-5xl relative z-50 px-2 sm:px-4 mt-4 sm:mt-12 pb-12">
                  <DashCard href="#projects" title="GARAGE" subtitle="My Projects" color="bg-yellow-400" icon={<Maximize2 size={20} />} />
                  <DashCard href="#about" title="ME" subtitle="Profile" color="bg-emerald-500" icon={<User size={20} />} />
                  <DashCard href="#experience" title="WORK" subtitle="History" color="bg-purple-600" icon={<Briefcase size={20} />} />
                  <DashCard href="#contact" title="COMMS" subtitle="Connect" color="bg-blue-600 dark:bg-red-600" icon={<Mail size={20} />} />
                  <DashCard href="https://sujitkumarshaportfolio.framer.website/" title="ALSO" subtitle="Me" color="bg-blue-600" icon={<LinkIcon size={20} />} />
                  <DashCard href="https://drive.google.com/file/d/1t6gU6EOviWox8imUg9vMJfQOwzzAnbxR/view?usp=sharing" title="RESUME" subtitle="Download" color="bg-orange-600" icon={<Download size={20} />} />
                </div>
              </div>
            </div>
          </motion.div >
        )}
      </AnimatePresence >
      <style dangerouslySetInnerHTML={{
        __html: `
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
    </section >
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
      className={`${color} p-3 sm:p-6 border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group relative overflow-hidden h-28 sm:h-40 flex flex-col justify-end transition-all active:shadow-none active:translate-x-1 active:translate-y-1`}
    >
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 group-hover:scale-110 sm:group-hover:scale-125 transition-all text-white/90">{icon}</div>
      <div className="relative z-10 text-white text-left">
        <p className="text-[6px] sm:text-[8px] font-black uppercase tracking-widest opacity-80 mb-0.5 sm:mb-1 text-left">{subtitle}</p>
        <h3 className="text-base sm:text-3xl font-black uppercase italic leading-none tracking-tighter text-left">{title}</h3>
      </div>
    </motion.a>
  );
};

const RaceLicense = ({ initialPos, isDark, audio }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      initial={{
        opacity: 0,
        scale: 0.5,
        x: isMobile ? "-50%" : 0,
        y: 100
      }}
      animate={{
        opacity: 1,
        scale: isExpanded ? (isMobile ? 1.05 : 1.25) : 1,
        x: isMobile ? "-50%" : 0,
        y: isMobile ? "-50%" : 0,
        zIndex: isExpanded ? 150 : 120,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      drag
      dragMomentum={false}
      style={{
        left: isMobile ? '50%' : 'auto',
        top: isMobile ? '50%' : (initialPos?.top || '25%'),
        right: isMobile ? 'auto' : (initialPos?.right || '5%'),
        rotateX: springX,
        rotateY: springY,
        perspective: 1000
      }}
      onMouseMove={(e) => {
        if (isExpanded) return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`absolute w-[280px] sm:w-80 md:w-[400px] cursor-grab active:cursor-grabbing perspective-1000`}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full preserve-3d h-44 sm:h-60 group"
      >
        {/* Front */}
        <div className={`absolute inset-0 backface-hidden ${isDark ? 'bg-zinc-900 border-white/20 text-white' : 'bg-white border-black/10 text-black'} border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-3 sm:p-6 font-mono flex flex-col`}>
          <div className="flex justify-between items-center border-b-2 border-zinc-800 pb-1.5 sm:pb-3 mb-2 sm:mb-4">
            <p className="text-[8px] sm:text-[11px] font-black uppercase text-blue-600 dark:text-red-600 italic tracking-[0.2em]">DEV_AUTH_v3.2</p>
            <div className="flex items-center gap-1 sm:gap-2">
              <button onClick={toggleExpand} className="p-1 sm:p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors" title={isExpanded ? "Collapse" : "Expand"}>
                {isExpanded ? <Minimize2 size={12} className="sm:w-4 sm:h-4" /> : <Maximize2 size={12} className="sm:w-4 sm:h-4" />}
              </button>
              <button onClick={(e) => { e.stopPropagation(); setIsFlipped(true); audio?.playUIBlip(); }} className="p-1 sm:p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors" title="Flip Card">
                <RefreshCw size={12} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
          <div className="flex gap-3 sm:gap-6 text-left flex-1">
            <div className="relative w-20 h-24 sm:w-28 sm:h-36 bg-black overflow-hidden border-2 border-zinc-800 flex-shrink-0">
              <img src={CLOUDINARY_PHOTO} className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" alt="Pilot" />
              <div className="absolute inset-0 bg-blue-600/10 dark:bg-red-600/10 pointer-events-none group-hover:bg-transparent transition-colors" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-0.5 sm:py-1">
              <div className="space-y-0.5 sm:space-y-1">
                <p className="text-[6px] sm:text-[7px] text-zinc-500 uppercase tracking-widest leading-none text-left">ID_DEV_VERIFIED</p>
                <p className="text-xs sm:text-[18px] font-black italic uppercase tracking-tighter text-left leading-tight">S. Kumar Sha</p>
                <p className="text-[7px] sm:text-[10px] font-bold text-yellow-400 italic uppercase text-left tracking-widest">S-CLASS_DEV</p>
              </div>

              <div className="mt-1 sm:mt-4 space-y-1 sm:space-y-2">
                <div className="flex items-center gap-2 opacity-40">
                  <div className="h-0.5 sm:h-1 flex-1 bg-zinc-700" />
                  <span className="text-[5px] sm:text-[6px] font-bold uppercase">Active</span>
                </div>
                <motion.a
                  href="https://drive.google.com/file/d/1t6gU6EOviWox8imUg9vMJfQOwzzAnbxR/view?usp=sharing"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-between bg-blue-600 dark:bg-red-600 text-white px-2 sm:px-3 py-1 sm:py-2 text-[7px] sm:text-[9px] font-black uppercase italic tracking-tighter border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  <span>Access_Dossier</span>
                  <ArrowUpRight size={8} className="sm:w-2.5 sm:h-2.5" />
                </motion.a>
              </div>
              <p className="text-[5px] sm:text-[6px] text-zinc-600 italic mt-1 sm:mt-2 text-left opacity-50 uppercase tracking-[0.3em]">SECURE_MOD</p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 ${isDark ? 'bg-zinc-950 border-blue-600 dark:border-red-600 text-white' : 'bg-slate-100 border-blue-600 text-black'} border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-3 sm:p-6 flex flex-col justify-between`}>
          <div className="flex justify-between items-center border-b border-zinc-800 pb-1.5 sm:pb-2">
            <p className="text-[8px] sm:text-[10px] font-black uppercase italic tracking-widest">Subsystem Access</p>
            <button onClick={() => setIsFlipped(false)} className="p-1 hover:bg-zinc-800 rounded transition-colors"><RefreshCw size={12} className="sm:w-4 sm:h-4" /></button>
          </div>
          <div className="flex flex-col gap-2 sm:gap-3 py-2 sm:py-4">
            <a href="#projects" className="bg-zinc-900 border border-zinc-800 p-2 sm:p-3 text-[9px] sm:text-[11px] font-black italic text-center text-white hover:border-orange-500 dark:border-red-500 transition-colors uppercase">Garage_Logs</a>
            <a href="#experience" className="bg-zinc-900 border border-zinc-800 p-2 sm:p-3 text-[9px] sm:text-[11px] font-black italic text-center text-white hover:border-orange-500 dark:border-red-500 transition-colors uppercase">Work_Hist</a>
            <a href="#contact" className="bg-zinc-900 border border-zinc-800 p-2 sm:p-3 text-[9px] sm:text-[11px] font-black italic text-center text-white hover:border-orange-500 dark:border-red-500 transition-colors uppercase">Comms_Feed</a>
          </div>
          <div className="mt-auto flex justify-between items-center opacity-30 border-t border-zinc-800 pt-1.5 sm:pt-3">
            <span className="text-[6px] sm:text-[7px] font-mono uppercase tracking-[0.3em]">Sector_0x7f</span>
            <ShieldAlert size={10} className="sm:w-3 sm:h-3" />
          </div>
        </div>
      </motion.div>
      <style dangerouslySetInnerHTML={{ __html: `.preserve-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; } .rotate-y-180 { transform: rotateY(180deg); }` }} />
    </motion.div>
  );
};

export default HeroSection;