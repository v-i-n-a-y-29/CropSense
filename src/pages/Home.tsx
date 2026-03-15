import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Search, Calendar, Leaf, Shield, Map, Cloud, FileText, AlertTriangle, CheckCircle2, Users, Building2, Tractor, Wind, Flame, BarChart3, Globe, ChevronRight, Sprout, MonitorSmartphone, LayoutDashboard, Eye, Phone, TrendingDown, Zap, Target, Award } from 'lucide-react';
import { motion, useInView } from 'motion/react';

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (startOnView && !isInView) return;
    if (hasStarted.current) return;
    hasStarted.current = true;
    
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, isInView, startOnView]);

  return { count, ref };
}

export default function Home() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const staggerFast = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // Counters for impact stats
  const stat1 = useCounter(15, 2000);
  const stat2 = useCounter(9, 2000);
  const stat3 = useCounter(48, 2000);
  const stat4 = useCounter(30, 2000);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-green-200 selection:text-green-900 overflow-hidden">
      
      {/* STICKY NAVBAR */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-stone-100' : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-green-700 rounded-xl flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900">CropSense</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#problem" className="text-sm font-medium text-stone-600 hover:text-green-700 transition-colors">The Problem</a>
            <a href="#platform" className="text-sm font-medium text-stone-600 hover:text-green-700 transition-colors">Platform</a>
            <a href="#how-it-works" className="text-sm font-medium text-stone-600 hover:text-green-700 transition-colors">How It Works</a>
            <a href="#impact" className="text-sm font-medium text-stone-600 hover:text-green-700 transition-colors">Impact</a>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/farmer')}
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-stone-700 hover:text-green-700 transition-colors"
            >
              Farmer Portal
            </button>
            <button 
              onClick={() => navigate('/gov')}
              className="inline-flex items-center px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition-colors shadow-sm"
            >
              Gov Dashboard
            </button>
          </div>
        </div>
      </motion.nav>

      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-40 lg:pb-32 flex flex-col lg:flex-row items-center gap-16">
        {/* Background gradient orbs */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-green-100/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-stone-100/60 rounded-full blur-3xl pointer-events-none"></div>

        <motion.div 
          className="flex-1 space-y-8 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeLeft}
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-green-200 bg-green-50 text-xs font-semibold tracking-wider uppercase text-green-800 shadow-sm">
            <Target className="w-3 h-3 mr-2 text-green-600" />
            SDG 13 · Climate Action
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.05] tracking-tight text-stone-900">
            Eliminate Stubble{' '}
            <br className="hidden lg:block" />
            Burning with{' '}
            <span className="relative">
              <span className="font-bold text-green-700 italic">Confidence.</span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-3 bg-green-100/60 rounded-full -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-600 max-w-xl leading-relaxed">
            A unified digital platform connecting <strong className="text-stone-800">farmers</strong>, <strong className="text-stone-800">CHC operators</strong>, and <strong className="text-stone-800">government officials</strong> to manage Crop Residue Management machinery in real-time.
          </p>
          
          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/farmer')}
              className="group inline-flex items-center justify-center px-8 py-4 bg-green-700 text-white font-medium rounded-xl hover:bg-green-800 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] text-lg"
            >
              <Users className="w-5 h-5 mr-2" />
              Farmer Portal
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/gov')}
              className="group inline-flex items-center justify-center px-8 py-4 bg-white text-stone-800 font-medium rounded-xl border border-stone-200 hover:border-green-300 hover:bg-green-50/50 transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98] text-lg"
            >
              <LayoutDashboard className="w-5 h-5 mr-2 text-green-700" />
              Gov Dashboard
              <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform text-green-700" />
            </button>
          </div>

          {/* Mini trust badges */}
          <div className="pt-4 flex items-center gap-6 text-sm text-stone-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Gemini AI Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Real-time Tracking</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Bilingual (EN/HI)</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="flex-1 w-full relative flex justify-center lg:justify-end z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeRight}
        >
          {/* Hero visual - Interactive platform preview */}
          <div className="relative w-full max-w-lg">
            {/* Main card */}
            <motion.div 
              className="relative bg-white border border-stone-200 rounded-3xl shadow-xl p-8 overflow-hidden"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              {/* Top bar */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-3 text-xs text-stone-400 font-mono">cropsense.app</span>
              </div>
              
              {/* Mock dashboard preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                      <Tractor className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-800">Live Fleet Status</p>
                      <p className="text-xs text-stone-500">Punjab Region</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-semibold text-green-700">LIVE</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
                    <p className="text-2xl font-black text-green-700">12</p>
                    <p className="text-[10px] font-semibold text-green-600 uppercase tracking-wider">Active</p>
                  </div>
                  <div className="bg-stone-50 rounded-xl p-3 text-center border border-stone-100">
                    <p className="text-2xl font-black text-stone-700">5</p>
                    <p className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">Available</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100">
                    <p className="text-2xl font-black text-amber-700">2</p>
                    <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider">Idle</p>
                  </div>
                </div>

                {/* Mock map area */}
                <div className="bg-stone-50 rounded-2xl h-32 border border-stone-100 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-6 left-8 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                    <div className="absolute top-6 left-8 w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="absolute top-16 right-12 w-3 h-3 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-16 right-12 w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="absolute bottom-8 left-1/2 w-3 h-3 bg-green-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-8 left-1/2 w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-bold text-stone-700 border border-stone-200 flex items-center gap-1.5">
                    <Map className="w-3 h-3 text-green-600" />
                    Live Map · Ludhiana
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating notification cards */}
            <motion.div 
              className="absolute -left-12 top-20 bg-white rounded-2xl shadow-lg border border-stone-100 p-4 w-52 hidden lg:block"
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-800">Machine Booked</p>
                  <p className="text-[10px] text-stone-500">Happy Seeder · 2 min ago</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="absolute -right-8 bottom-16 bg-white rounded-2xl shadow-lg border border-stone-100 p-4 w-48 hidden lg:block"
              animate={{ y: [0, 8, 0], x: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Cloud className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-800">Weather Alert</p>
                  <p className="text-[10px] text-stone-500">Clear skies · 28°C</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 2. IMPACT STATS BANNER */}
      <section className="bg-stone-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(21,128,61,0.15),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-green-400 text-sm font-semibold tracking-wider uppercase mb-3">The Crisis We're Solving</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Stubble Burning in Numbers</h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="text-center" ref={stat1.ref}>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Flame className="w-6 h-6 text-orange-400" />
              </div>
              <p className="text-4xl md:text-5xl font-black text-white tracking-tight">{stat1.count}M+</p>
              <p className="text-stone-400 text-sm mt-2 font-medium">Tonnes of stubble burned annually in India</p>
            </motion.div>
            <motion.div variants={fadeUp} className="text-center" ref={stat2.ref}>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Wind className="w-6 h-6 text-red-400" />
              </div>
              <p className="text-4xl md:text-5xl font-black text-white tracking-tight">{stat2.count}x</p>
              <p className="text-stone-400 text-sm mt-2 font-medium">AQI spike during Oct-Nov burning season</p>
            </motion.div>
            <motion.div variants={fadeUp} className="text-center" ref={stat3.ref}>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-4xl md:text-5xl font-black text-white tracking-tight">{stat3.count}M</p>
              <p className="text-stone-400 text-sm mt-2 font-medium">Farmers in Punjab & Haryana affected</p>
            </motion.div>
            <motion.div variants={fadeUp} className="text-center" ref={stat4.ref}>
              <div className="flex items-center justify-center gap-1 mb-2">
                <TrendingDown className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-4xl md:text-5xl font-black text-white tracking-tight">{stat4.count}%</p>
              <p className="text-stone-400 text-sm mt-2 font-medium">CRM machines sit idle due to poor tracking</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. THE PROBLEM VS SOLUTION */}
      <motion.section 
        id="problem"
        className="bg-white py-24 border-b border-stone-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-green-700 text-sm font-semibold tracking-wider uppercase mb-3">Why CropSense?</p>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900">
              Machine Tracking Shouldn't Be <span className="italic text-green-700">Guesswork</span>
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 relative">
            
            {/* The Problem */}
            <motion.div 
              className="flex-1 bg-red-50/30 border border-red-100/50 rounded-3xl p-10 shadow-sm relative z-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-red-100 rounded-2xl border border-red-200 flex items-center justify-center mb-6 shadow-sm">
                <AlertTriangle className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2 text-red-900">The Problem</h3>
              <p className="text-sm text-red-600/70 font-medium mb-6">Why farmers burn stubble</p>
              <ul className="space-y-5">
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  </span>
                  <span className="text-stone-700 leading-relaxed">Government CRM machines exist but <strong>farmers can't locate them</strong> when needed.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  </span>
                  <span className="text-stone-700 leading-relaxed"><strong>No centralized tracking</strong> system—machines sit idle while fields burn.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  </span>
                  <span className="text-stone-700 leading-relaxed">Officials lack <strong>real-time data</strong> to measure utilization and AQI impact.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  </span>
                  <span className="text-stone-700 leading-relaxed">Short <strong>15-20 day window</strong> between harvest and next sowing leaves no time.</span>
                </li>
              </ul>
            </motion.div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center w-20 relative z-0">
              <motion.div
                className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
              >
                <ArrowRight className="w-6 h-6 text-green-700" />
              </motion.div>
            </div>

            {/* The Solution */}
            <motion.div 
              className="flex-1 bg-green-50/50 border border-green-200/50 rounded-3xl p-10 shadow-sm relative z-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-green-100 rounded-2xl border border-green-200 flex items-center justify-center mb-6 shadow-sm">
                <Zap className="w-7 h-7 text-green-700" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2 text-green-900">CropSense Solution</h3>
              <p className="text-sm text-green-600/70 font-medium mb-6">Technology meets agriculture</p>
              <ul className="space-y-5">
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  </span>
                  <span className="text-stone-700 leading-relaxed"><strong>Real-time map</strong> showing all available CRM machines near the farmer.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  </span>
                  <span className="text-stone-700 leading-relaxed"><strong>Direct connection</strong> to CHC operators for instant booking.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  </span>
                  <span className="text-stone-700 leading-relaxed"><strong>AI-powered analytics</strong> correlating machine usage with AQI trends.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  </span>
                  <span className="text-stone-700 leading-relaxed"><strong>Weather alerts + MSP data</strong> helping farmers plan better.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 4. PLATFORM OVERVIEW - WHO USES CROPSENSE */}
      <section id="platform" className="py-24 max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <p className="text-green-700 text-sm font-semibold tracking-wider uppercase mb-3">Three Portals, One Mission</p>
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-stone-900">Who Uses CropSense?</h2>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto">A unified ecosystem connecting every stakeholder in the fight against stubble burning.</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Farmer */}
          <motion.div 
            variants={fadeUp} 
            className="group bg-white border border-stone-200 rounded-3xl p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-green-200 cursor-pointer relative overflow-hidden"
            onClick={() => navigate('/farmer')}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-green-100 transition-colors"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-green-50 rounded-2xl border border-green-100 flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
                <MonitorSmartphone className="w-8 h-8 text-green-700" />
              </div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-50 text-[10px] font-bold text-green-700 uppercase tracking-wider mb-4 border border-green-100">
                Farmer Portal
              </div>
              <h3 className="text-xl font-bold mb-3 text-stone-900">For Farmers</h3>
              <p className="text-stone-600 leading-relaxed mb-6">
                Find nearby CRM machines on an interactive map, check weather forecasts, access MSP prices, and connect with CHC operators instantly.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-stone-600">
                  <Map className="w-4 h-4 text-green-600" />
                  Interactive machine finder
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-600">
                  <Cloud className="w-4 h-4 text-green-600" />
                  Weather & crop advisories
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-600">
                  <FileText className="w-4 h-4 text-green-600" />
                  Schemes & MSP data
                </li>
              </ul>
              <div className="flex items-center text-green-700 font-medium text-sm group-hover:gap-2 transition-all gap-1">
                Open Farmer Portal <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* CHC Operator */}
          <motion.div 
            variants={fadeUp} 
            className="group bg-white border border-stone-200 rounded-3xl p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-amber-200 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-100 transition-colors"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-center mb-6 group-hover:bg-amber-100 transition-colors">
                <Tractor className="w-8 h-8 text-amber-700" />
              </div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-50 text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-4 border border-amber-100">
                CHC Operator
              </div>
              <h3 className="text-xl font-bold mb-3 text-stone-900">For CHC Centers</h3>
              <p className="text-stone-600 leading-relaxed mb-6">
                Custom Hiring Centres manage their fleet, update machine availability, and connect with farmers who need their equipment.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-stone-600">
                  <Tractor className="w-4 h-4 text-amber-600" />
                  Fleet management
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-600">
                  <Phone className="w-4 h-4 text-amber-600" />
                  Direct farmer contact
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-600">
                  <Eye className="w-4 h-4 text-amber-600" />
                  Status updates in real-time
                </li>
              </ul>
              <div className="flex items-center text-amber-700 font-medium text-sm">
                <span className="text-stone-400 italic text-xs">Coming in Phase 2</span>
              </div>
            </div>
          </motion.div>

          {/* Government */}
          <motion.div 
            variants={fadeUp} 
            className="group bg-white border border-stone-200 rounded-3xl p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 cursor-pointer relative overflow-hidden"
            onClick={() => navigate('/gov')}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                <Building2 className="w-8 h-8 text-blue-700" />
              </div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-4 border border-blue-100">
                Admin Dashboard
              </div>
              <h3 className="text-xl font-bold mb-3 text-stone-900">For Government</h3>
              <p className="text-stone-600 leading-relaxed mb-6">
                DA&FW officials monitor fleet utilization, track AQI correlation data, and generate reports for evidence-based policymaking.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-stone-600">
                  <Map className="w-4 h-4 text-blue-600" />
                  Live fleet tracking
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-600">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  Analytics & AQI reports
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-600">
                  <Shield className="w-4 h-4 text-blue-600" />
                  Policy dashboards
                </li>
              </ul>
              <div className="flex items-center text-blue-700 font-medium text-sm group-hover:gap-2 transition-all gap-1">
                Open Gov Dashboard <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <p className="text-green-700 text-sm font-semibold tracking-wider uppercase mb-3">Simple & Effective</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-stone-900">How It Works</h2>
            <p className="text-lg text-stone-500">From field to action in three simple steps.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px z-0">
              <div className="h-full bg-gradient-to-r from-stone-200 via-green-300 to-green-200"></div>
            </div>

            {/* Step 1 */}
            <motion.div variants={fadeUp} className="bg-stone-50 border border-stone-200 rounded-3xl p-8 relative z-10 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-green-200 hover:bg-white">
              <div className="w-12 h-12 rounded-2xl bg-green-700 flex items-center justify-center text-white font-black text-lg mb-6 shadow-md">
                1
              </div>
              <div className="w-20 h-20 bg-white rounded-2xl border border-stone-200 flex items-center justify-center mb-6 shadow-sm">
                <Search className="w-8 h-8 text-stone-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-stone-900">Discover</h3>
              <p className="text-stone-600 leading-relaxed">
                Farmer opens the portal and sees all CRM machines on an interactive map with real-time availability status.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={fadeUp} className="bg-stone-50 border border-stone-200 rounded-3xl p-8 relative z-10 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-green-200 hover:bg-white">
              <div className="w-12 h-12 rounded-2xl bg-green-700 flex items-center justify-center text-white font-black text-lg mb-6 shadow-md">
                2
              </div>
              <div className="w-20 h-20 bg-white rounded-2xl border border-stone-200 flex items-center justify-center mb-6 shadow-sm">
                <Phone className="w-8 h-8 text-stone-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-stone-900">Connect</h3>
              <p className="text-stone-600 leading-relaxed">
                Contact the CHC operator directly via phone. Confirm availability and schedule the machine for their field.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={fadeUp} className="bg-stone-50 border border-stone-200 rounded-3xl p-8 relative z-10 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-green-200 hover:bg-white">
              <div className="w-12 h-12 rounded-2xl bg-green-700 flex items-center justify-center text-white font-black text-lg mb-6 shadow-md">
                3
              </div>
              <div className="w-20 h-20 bg-green-50 rounded-2xl border border-green-100 flex items-center justify-center mb-6 shadow-sm">
                <Leaf className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-stone-900">Sustain</h3>
              <p className="text-stone-600 leading-relaxed">
                Manage crop residue sustainably using CRM machines. No burning, better soil health, cleaner air for everyone.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. TECH & SDG ALIGNMENT */}
      <section id="impact" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - SDG & Impact */}
          <motion.div 
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeLeft}
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-green-200 bg-green-50 text-xs font-semibold tracking-wider uppercase text-green-800">
              <Globe className="w-3 h-3 mr-2 text-green-600" />
              UN Sustainable Development Goals
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
              Aligned with <span className="text-green-700 italic">SDG 13</span>
              <br />Climate Action.
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              CropSense directly contributes to India's climate commitments by reducing agricultural emissions, improving air quality, and promoting sustainable farming practices through technology.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                <TrendingDown className="w-6 h-6 text-green-700 mb-3" />
                <p className="text-2xl font-black text-green-800">↓ AQI</p>
                <p className="text-sm text-green-700 mt-1">Reduced pollution through CRM adoption</p>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
                <Leaf className="w-6 h-6 text-stone-700 mb-3" />
                <p className="text-2xl font-black text-stone-800">↑ Soil</p>
                <p className="text-sm text-stone-600 mt-1">Better soil health via residue management</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Tech Stack Cards */}
          <motion.div 
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} className="bg-white border border-stone-200 rounded-2xl p-6 flex items-start gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-200">
              <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Map className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900 mb-1">Live Tracking (No IoT Needed)</h4>
                <p className="text-stone-600 leading-relaxed">CHC operators update machine status via the app—no expensive hardware required. Uses Leaflet maps for real-time visualization.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white border border-stone-200 rounded-2xl p-6 flex items-start gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-200">
              <div className="w-12 h-12 bg-purple-50 border border-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900 mb-1">Gemini AI Integration</h4>
                <p className="text-stone-600 leading-relaxed">Google Gemini powers intelligent crop advisory, weather analysis, and natural language interactions in both English and Hindi.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white border border-stone-200 rounded-2xl p-6 flex items-start gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-200">
              <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Cloud className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900 mb-1">Weather & Scheme Data</h4>
                <p className="text-stone-600 leading-relaxed">7-day localized forecasts, real-time government MSP pricing, and active subsidy scheme information for farmers.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white border border-stone-200 rounded-2xl p-6 flex items-start gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-200">
              <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900 mb-1">Analytics & AQI Correlation</h4>
                <p className="text-stone-600 leading-relaxed">Data-driven dashboards showing machine utilization trends correlated with air quality improvements for evidence-based policy.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="bg-green-700 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        <motion.div 
          className="max-w-4xl mx-auto px-6 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Award className="w-12 h-12 text-green-200 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
            Ready to See CropSense in Action?
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore our working prototype — from the farmer finding a machine to the government tracking fleet utilization in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/farmer')}
              className="group inline-flex items-center justify-center px-8 py-4 bg-white text-green-800 font-bold rounded-xl hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] text-lg"
            >
              <Users className="w-5 h-5 mr-2" />
              Enter Farmer Portal
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/gov')}
              className="group inline-flex items-center justify-center px-8 py-4 bg-green-800/50 text-white font-bold rounded-xl border border-green-500/30 hover:bg-green-800/70 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] text-lg backdrop-blur-sm"
            >
              <LayoutDashboard className="w-5 h-5 mr-2" />
              Gov Dashboard
              <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-stone-900 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-green-700 rounded-xl flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">CropSense</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-stone-400">
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-green-500" />
                SDG 13 · Climate Action
              </span>
              <span>•</span>
              <span>Built with React + Vite + Gemini AI</span>
              <span>•</span>
              <span>DA&FW Initiative</span>
            </div>
            <p className="text-stone-500 text-sm font-medium">
              © 2026 CropSense
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
