import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiShower from '../effects/EmojiShower';
import Letter from '../ui/Letter';
import { useNames } from '../../lib/name-context';

const HugDay = ({ onComplete }: { onComplete: () => void }) => {
  const { boy, girl } = useNames(); // <-- dynamic names

  const [hugs, setHugs] = useState(0);
  const [showEffects, setShowEffects] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleHug = () => {
    if (hugs < 5) {
      setHugs(prev => prev + 1);
      if (hugs + 1 === 5) {
        setShowEffects(true);
        setTimeout(() => setShowLetter(true), 2500);
      }
    }
  };

  const handleClose = () => {
    setShowLetter(false);
    onComplete();
  };

  return (
    <div className="max-w-xl mx-auto text-center relative p-8">
      <EmojiShower active={showEffects} emojis={['🫂', '🤗', '💖', '✨', '🧸']} duration={5000} density="high" />
      <Letter
        isOpen={showLetter}
        onClose={handleClose}
        message={`My dearest ${girl}, they say a hug is a silent way of saying 'you matter to me'. So today, I'm sending you the biggest, warmest, and most sincere hug through this screen. I wish I could hold you in my arms right now and never let go. You are my comfort, my peace, and my home. Happy Hug Day, my beautiful baby! 🫂❤️`}
        signature={`Always Yours, ${boy}`}
      />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl sm:text-5xl md:text-7xl text-rose-deep mb-2"
      >
        Infinite Warmth
      </motion.h2>

      <p className="font-heading text-sm sm:text-base md:text-lg text-muted-foreground italic mb-8 sm:mb-12">
        Click to send 5 warm hugs to my heart 🫂
      </p>

      <div className="relative h-64 flex items-center justify-center">
        <motion.div
          className="text-9xl cursor-pointer select-none relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleHug}
        >
          ❤️
          <AnimatePresence>
            {hugs > 0 && hugs < 5 && (
              <motion.div
                key={hugs}
                initial={{ scale: 0.5, opacity: 0, y: 0 }}
                animate={{ scale: 2, opacity: 1, y: -100 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center text-6xl pointer-events-none"
              >
                🫂
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="max-w-[200px] sm:max-w-xs mx-auto mt-8 mb-6">
        <div className="h-2.5 sm:h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-romantic"
            initial={{ width: "0%" }}
            animate={{ width: `${(hugs / 5) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-heading">
          {hugs === 5 ? "So much love! 🥰" : `${hugs}/5 — More hugs needed!`}
        </p>
      </div>
    </div>
  );
};

export default HugDay;
