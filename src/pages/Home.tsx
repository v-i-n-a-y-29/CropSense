import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Calendar, Leaf, Shield, Map, Cloud, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const navigate = useNavigate();

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const drawArrow = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 1, ease: "easeInOut", delay: 0.3 } 
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-green-200 selection:text-green-900 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 lg:pt-32 lg:pb-40 flex flex-col lg:flex-row items-center gap-16">
        <motion.div 
          className="flex-1 space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeLeft}
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-stone-200 bg-white text-xs font-semibold tracking-wider uppercase text-stone-600 shadow-sm">
            <span className="text-green-700 mr-2">✦</span> Powered by DA&FW Technology
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight text-stone-900">
            Eliminate Stubble Burning with <span className="font-bold text-green-700 italic">Confidence.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl leading-relaxed">
            Connect farmers to nearby CRM machines instantly. Real-time tracking, weather alerts, and MSP data—all in one place.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/farmer')}
              className="group inline-flex items-center justify-center px-8 py-4 bg-green-700 text-white font-medium rounded-xl hover:bg-green-800 transition-colors duration-300 shadow-sm hover:shadow-md active:scale-95 text-lg"
            >
              Enter Portals
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="flex-1 w-full relative flex justify-center lg:justify-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeRight}
        >
          {/* Minimalist Abstract Composition */}
          <div className="relative w-full max-w-md aspect-square">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-stone-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -left-4 w-3/4 h-3/4 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-3/4 h-3/4 bg-stone-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
            <motion.div 
              className="relative h-full w-full border border-stone-200 bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm p-8 flex flex-col items-center justify-center gap-6"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <motion.div 
                className="w-24 h-24 rounded-full bg-green-50 border border-green-100 flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Leaf className="w-10 h-10 text-green-700" />
              </motion.div>
              <div className="flex gap-4">
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Map className="w-6 h-6 text-stone-600" />
                </motion.div>
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Cloud className="w-6 h-6 text-stone-600" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 2. THE "PROBLEM VS SOLUTION" SECTION */}
      <motion.section 
        className="bg-white py-24 border-y border-stone-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-stone-900">
            Machine Tracking Shouldn't Be Guesswork
          </h2>
          
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 relative">
            
            {/* The Problem */}
            <div className="flex-1 bg-stone-50 border border-stone-200 rounded-3xl p-10 shadow-sm relative z-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-stone-300">
              <div className="w-12 h-12 bg-white rounded-full border border-stone-200 flex items-center justify-center mb-6 shadow-sm">
                <AlertTriangle className="w-6 h-6 text-stone-500" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-6 text-stone-800">The Problem</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 mr-3 flex-shrink-0"></span>
                  <span className="text-stone-600 leading-relaxed">Untracked government machinery leading to inefficiencies.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 mr-3 flex-shrink-0"></span>
                  <span className="text-stone-600 leading-relaxed">Persistent stubble burning due to lack of timely alternatives.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 mr-3 flex-shrink-0"></span>
                  <span className="text-stone-600 leading-relaxed">Farmers unable to find available equipment when needed most.</span>
                </li>
              </ul>
            </div>

            {/* Animated Arrow Connector (Hidden on mobile) */}
            <div className="hidden md:flex items-center justify-center w-24 relative z-0">
              <svg width="100%" height="40" viewBox="0 0 100 40" className="text-stone-300 overflow-visible">
                <motion.path
                  d="M 0 20 Q 50 -10 95 20"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  variants={drawArrow}
                />
                <motion.path
                  d="M 85 10 L 95 20 L 85 30"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={drawArrow}
                />
              </svg>
            </div>

            {/* The Solution */}
            <div className="flex-1 bg-green-50/50 border border-green-200/50 rounded-3xl p-10 shadow-sm relative z-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-300">
              <div className="w-12 h-12 bg-white rounded-full border border-green-100 flex items-center justify-center mb-6 shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-6 text-green-900">The Solution</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 mr-3 flex-shrink-0"></span>
                  <span className="text-stone-700 leading-relaxed">Real-time CHC fleet tracking for complete transparency.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 mr-3 flex-shrink-0"></span>
                  <span className="text-stone-700 leading-relaxed">Instant farmer booking connecting supply with demand.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 mr-3 flex-shrink-0"></span>
                  <span className="text-stone-700 leading-relaxed">Data-driven pollution reduction through actionable insights.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </motion.section>

      {/* 3. "HOW IT WORKS" SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-stone-900">How It Works</h2>
          <p className="text-lg text-stone-500">Connecting farmers to machinery in three simple steps.</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connector lines (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-stone-200 z-0"></div>

          {/* Step 1 */}
          <motion.div variants={fadeUp} className="bg-white border border-stone-200 rounded-3xl p-8 relative z-10 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-200">
            <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-xs font-bold text-stone-500 mb-6 absolute top-6 left-6">
              01
            </div>
            <div className="w-20 h-20 bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-center mb-6 mt-4">
              <Search className="w-8 h-8 text-stone-700" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-3 text-stone-900">Find</h3>
            <p className="text-stone-600 leading-relaxed">
              Locate available CRM machines nearby on the interactive map.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div variants={fadeUp} className="bg-white border border-stone-200 rounded-3xl p-8 relative z-10 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-200">
            <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-xs font-bold text-stone-500 mb-6 absolute top-6 left-6">
              02
            </div>
            <div className="w-20 h-20 bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-center mb-6 mt-4">
              <Calendar className="w-8 h-8 text-stone-700" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-3 text-stone-900">Book</h3>
            <p className="text-stone-600 leading-relaxed">
              Contact the CHC operator directly and secure the equipment.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div variants={fadeUp} className="bg-white border border-stone-200 rounded-3xl p-8 relative z-10 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-200">
            <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-xs font-bold text-stone-500 mb-6 absolute top-6 left-6">
              03
            </div>
            <div className="w-20 h-20 bg-green-50 rounded-2xl border border-green-100 flex items-center justify-center mb-6 mt-4">
              <Leaf className="w-8 h-8 text-green-700" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-3 text-stone-900">Harvest</h3>
            <p className="text-stone-600 leading-relaxed">
              Manage crop residue sustainably without burning.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. TRUST & FEATURES SECTION (Footer Area) */}
      <section className="bg-white border-t border-stone-200 py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side */}
          <motion.div 
            className="space-y-8 pr-0 lg:pr-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeLeft}
          >
            <div className="w-16 h-16 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-center shadow-sm">
              <Shield className="w-8 h-8 text-stone-700" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
              Trust in Every Acre.
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              CropSense is built to align with government schemes, ensuring transparent and reliable agricultural data.
            </p>
            <button 
              onClick={() => navigate('/gov')}
              className="inline-flex items-center justify-center px-6 py-3 bg-white border border-stone-300 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-colors duration-300 shadow-sm active:scale-95"
            >
              View Dashboard
            </button>
          </motion.div>

          {/* Right Side - Features Stack */}
          <motion.div 
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} className="bg-stone-50/50 border border-stone-200 rounded-2xl p-6 flex items-start gap-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-white hover:border-green-200">
              <div className="w-12 h-12 bg-white border border-stone-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Map className="w-5 h-5 text-stone-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900 mb-1">Live Tracking</h4>
                <p className="text-stone-600 leading-relaxed">No IoT hardware required—CHC operators update status instantly.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-stone-50/50 border border-stone-200 rounded-2xl p-6 flex items-start gap-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-white hover:border-green-200">
              <div className="w-12 h-12 bg-white border border-stone-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Cloud className="w-5 h-5 text-stone-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900 mb-1">Weather & Alerts</h4>
                <p className="text-stone-600 leading-relaxed">7-day localized forecasts and crop advisories.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-stone-50/50 border border-stone-200 rounded-2xl p-6 flex items-start gap-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-white hover:border-green-200">
              <div className="w-12 h-12 bg-white border border-stone-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <FileText className="w-5 h-5 text-stone-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900 mb-1">Official MSP Data</h4>
                <p className="text-stone-600 leading-relaxed">Real-time government pricing and active schemes.</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-stone-100 border-t border-stone-200 py-8 text-center px-6">
        <p className="text-stone-500 text-sm font-medium">
          © 2026 CropSense. Built for the Climate Action Hackathon (SDG 13).
        </p>
      </footer>

    </div>
  );
}
