import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import EmojiShower from '../effects/EmojiShower';
import Letter from '../ui/Letter';
import { useNames } from '../../lib/name-context';

const PromiseDay = ({ onComplete }: { onComplete: () => void }) => {
  const { boy, girl } = useNames(); // <-- dynamic names

  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showEffects, setShowEffects] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (holding && progress < 100) {
      timerRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timerRef.current!);
            setShowEffects(true);
            setTimeout(() => setShowLetter(true), 2500);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progress < 100) setProgress(0); // Reset if released too early
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [holding, progress]);

  const handleClose = () => {
    setShowLetter(false);
    onComplete();
  };

  return (
    <div className="max-w-xl mx-auto text-center relative p-8">
      {/* Promise glow */}
      <motion.div
        className="absolute inset-0 -inset-x-16 -inset-y-16 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #e91e63, #f48fb1, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: holding ? [0.2, 0.4, 0.2] : 0.15 }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <EmojiShower active={showEffects} emojis={['🤝', '✨', '💖', '🔐', '🌸']} duration={5000} density="high" />

      <Letter
        isOpen={showLetter}
        onClose={handleClose}
        message={`My dearest ${girl}, on this Promise Day, I promise to be your strength when you are weak, your laughter when you are sad, and your constant support through all of life's ups and downs. I promise to cherish you, respect you, and love you more with every passing second. Our love is a sacred bond, and I will protect it with all my soul. Happy Promise Day, my forever girl! 🤝❤️`}
        signature={`Yours Forever, ${boy}`}
      />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl sm:text-5xl md:text-7xl text-rose-deep mb-2"
      >
        A Pinky Promise
      </motion.h2>

      <p className="font-heading text-sm sm:text-base md:text-lg text-muted-foreground italic mb-8 sm:mb-12">
        Hold the button to make a forever promise 🤝
      </p>

      <div className="relative flex flex-col items-center justify-center py-12">
        {/* Pulsing hearts when holding */}
        {holding && progress < 100 && (
          <motion.div
            className="absolute text-4xl"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💕
          </motion.div>
        )}
        
        <motion.div
          className="text-8xl sm:text-9xl mb-8 select-none relative z-10"
          animate={holding ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {progress >= 100 ? '💖' : '🤝'}
        </motion.div>

        <div className="w-full max-w-xs mx-auto mb-10">
          <div className="h-3 bg-secondary rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-600"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground font-heading">
            {progress >= 100 ? "Promise Sealed! ✨" : holding ? `Holding strong... ${progress}%` : "Press and hold to start"}
          </p>
          {holding && progress > 0 && progress < 100 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-rose-500 font-heading text-base"
            >
              {progress < 30 ? "Keep going, my love! 💕" : progress < 60 ? "You're doing great! ✨" : progress < 90 ? "Almost there! 💖" : "Just a bit more! 🥰"}
            </motion.p>
          )}
        </div>

        {!showEffects && (
          <motion.button
            onMouseDown={() => setHolding(true)}
            onMouseUp={() => setHolding(false)}
            onMouseLeave={() => setHolding(false)}
            onTouchStart={() => setHolding(true)}
            onTouchEnd={() => setHolding(false)}
            className={`w-24 h-24 rounded-full border-4 flex items-center justify-center text-3xl shadow-lg transition-all duration-300 select-none
              ${holding ? 'bg-rose-500 border-rose-200 text-white scale-95' : 'bg-white border-rose-500 text-rose-500 hover:scale-105'}
            `}
            whileTap={{ scale: 0.9 }}
          >
            🤝
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default PromiseDay;
