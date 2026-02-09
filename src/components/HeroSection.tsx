
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Petals configuration
  const petals = Array.from({ length: 20 });

  return (
    <section 
        ref={containerRef} 
        className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Dynamic Background Image - Parallax Effect */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
            style={{ 
                backgroundImage: "url('/src/assets/hero-rose.jpg')" 
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy/70 via-burgundy/50 to-background" />
      </motion.div>

      {/* Floating Petals Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {petals.map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-300/60"
            initial={{
              x: Math.random() * 100 + "vw",
              y: -100,
              rotate: 0,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: "100vh",
              x: `calc(${Math.random() * 100}vw + ${Math.random() * 200 - 100}px)`,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 20,
            }}
            style={{
                fontSize: `${Math.random() * 20 + 20}px`
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-6"
        >
             <span className="inline-block py-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium tracking-wider animate-bounce-slow">
                7th - 14th February
             </span>
        </motion.div>

        <motion.h1 
            className="text-5xl sm:text-7xl md:text-8xl font-display font-bold text-white drop-shadow-lg tracking-tight leading-loose mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
        >
          Valentine's Week
        </motion.h1>
        
        <motion.p 
            className="text-lg sm:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed font-body mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
        >
            For My Appuu
        </motion.p>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
        >
            <button 
                onClick={() => document.getElementById('valentine-week')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-rose-600 hover:bg-rose-700 text-white rounded-full transition-all duration-300 overflow-hidden shadow-lg hover:shadow-rose-500/40 hover:scale-105"
            >
                <span className="text-lg font-medium tracking-wide relative z-10">Explore Surprise</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform relative z-10">→</span>
            </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent mx-auto mb-2" />
        <span className="text-[10px] uppercase tracking-widest opacity-70">Scroll</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;