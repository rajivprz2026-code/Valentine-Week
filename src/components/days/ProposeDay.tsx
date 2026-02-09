
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiShower from '../effects/EmojiShower';
import Letter from '../ui/Letter';

const ProposeDay = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const [showEffects, setShowEffects] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  
  const handleNextStep = () => {
    if (step < 5) {
      setStep(prev => prev + 1);
      if (step + 1 === 5) {
        setShowEffects(true);
        setTimeout(() => setShowLetter(true), 3000);
      }
    }
  };

  const handleClose = () => {
      setShowLetter(false);
      onComplete();
  };

  return (
    <div className="max-w-xl mx-auto text-center relative p-8">
      <EmojiShower active={showEffects} emojis={['💍', '✨', '💖', '👰', '💎', '🤍']} duration={6000} density="high" />
      <Letter 
        isOpen={showLetter} 
        onClose={handleClose} 
        message="To my beloved Kanchuu, on this Propose Day, I don't just want to ask you for your hand, but for your heart, your laughter, your tears, and your forever. I promise to be the one who wipes your tears, shares your joys, and walks beside you through every storm and sunshine. Will you let me make you the happiest woman in the world? Use this ring as a symbol of my unending commitment to you. I love you, now and forever. 💍❤️"
        signature="Yours Always, Rajiv"
      />

      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl sm:text-5xl md:text-7xl text-rose-deep mb-2"
      >
        My Promise To You
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-heading text-sm sm:text-base md:text-lg text-muted-foreground italic mb-8 sm:mb-12"
      >
        Let me slide this ring of love onto your heart 💍
      </motion.p>

      <div className="relative w-full max-w-[280px] sm:max-w-[320px] mx-auto mb-8 sm:mb-10">
        <div className="relative h-[250px] sm:h-[300px] flex items-center justify-center">
            {/* Ring Scale Animation based on steps */}
            <motion.div 
                className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full pointer-events-none"
                style={{ 
                    background: "radial-gradient(circle, rgba(203, 140, 77, 0.3), transparent 70%)" 
                }}
                animate={{ scale: 1 + (step * 0.2) }}
            />
            
            <motion.div 
                className="text-6xl sm:text-7xl md:text-8xl relative z-10 select-none"
                animate={{ 
                    scale: 1 + (step * 0.15),
                    rotate: step * 10 
                }}
            >
                💍
            </motion.div>
            
            {/* Letters appearing around */}
            <AnimatePresence>
                {step >= 1 && <motion.div initial={{opacity:0, x:-80, y:-50}} animate={{opacity:1}} className="absolute text-2xl font-display text-rose-500">L</motion.div>}
                {step >= 2 && <motion.div initial={{opacity:0, x:80, y:-50}} animate={{opacity:1}} className="absolute text-2xl font-display text-rose-500">O</motion.div>}
                {step >= 3 && <motion.div initial={{opacity:0, x:-80, y:50}} animate={{opacity:1}} className="absolute text-2xl font-display text-rose-500">V</motion.div>}
                {step >= 4 && <motion.div initial={{opacity:0, x:80, y:50}} animate={{opacity:1}} className="absolute text-2xl font-display text-rose-500">E</motion.div>}
            </AnimatePresence>
        </div>
      </div>

      <div className="max-w-[200px] sm:max-w-xs mx-auto mb-6">
        <div className="h-2.5 sm:h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div 
            className="h-full rounded-full gradient-romantic"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-heading">
            {step === 5 ? "Forever Yours! ❤️" : `${step}/5 — Keep going, babe!`}
        </p>
      </div>

      {step < 5 && (
        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextStep}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full gradient-romantic text-primary-foreground font-heading text-base sm:text-lg shadow-romantic cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
            ✨ Add a Sparkle
        </motion.button>
      )}
      
       {step === 5 && !showLetter && (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-display text-rose-deep mt-4"
        >
            Will you be mine?
        </motion.div>
      )}
    </div>
  );
};

export default ProposeDay;
