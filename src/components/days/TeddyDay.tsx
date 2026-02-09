
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EmojiShower from '../effects/EmojiShower';
import Letter from '../ui/Letter';

const TeddyDay = ({ onComplete }: { onComplete: () => void }) => {
  const [hugCount, setHugCount] = useState(0);
  const [showEffects, setShowEffects] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleHug = () => {
    if (hugCount < 5) {
      setHugCount(prev => prev + 1);
      if (hugCount + 1 === 5) {
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
      <EmojiShower active={showEffects} emojis={['🧸', '🤗', '🤎', '✨', '🍯']} duration={5000} density="high" />
      <Letter
        isOpen={showLetter}
        onClose={handleClose}
        message="My dearest, just like a teddy bear, I want to be your comfort, your warmth, and your safe place forever. When the world feels cold, I promise to hold you close and never let go. You are my softest hug and my sweetest dream come true. Happy Teddy Day, my love! 🧸🤎"
        signature="Your Cuddly Bear, Rajiv"
      />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl sm:text-5xl md:text-7xl text-rose-deep mb-2"
      >
        A Hug For You
      </motion.h2>

      <p className="font-heading text-xl text-muted-foreground italic mb-12">
        Give the teddy 5 warm hugs! 🤗
      </p>

      <motion.div
        className="relative cursor-pointer select-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleHug}
      >
        <div className="text-9xl mb-4">🧸</div>
        {hugCount > 0 && (
           <motion.div 
             key={hugCount}
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1.5, opacity: 0 }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl pointer-events-none"
           >
             🤗
           </motion.div>
        )}
      </motion.div>

      <div className="max-w-[200px] sm:max-w-xs mx-auto mt-8 mb-6">
        <div className="h-2.5 sm:h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-romantic"
            initial={{ width: "0%" }}
            animate={{ width: `${(hugCount / 5) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-heading">
          {hugCount === 5 ? "So Warm! 🥰" : `${hugCount}/5 — Keep hugging!`}
        </p>
      </div>
    </div>
  );
};

export default TeddyDay;
