
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiShower from '../effects/EmojiShower';
import Letter from '../ui/Letter';

const ChocolateDay = ({ onComplete }: { onComplete: () => void }) => {
  const [chocolates, setChocolates] = useState<{id: number, x: number, y: number, text: string}[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [showEffects, setShowEffects] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  
  const CHOCO_EMOJIS = ['🍫', '🍬', '🍭', '🧁', '🍩', '🍪', '🥨'];

  const spawnChocolate = () => {
    const id = Date.now() + Math.random();
    const x = Math.random() * 80 + 10; // 10-90%
    const y = Math.random() * 60 + 20; // 20-80%
    const text = CHOCO_EMOJIS[Math.floor(Math.random() * CHOCO_EMOJIS.length)];
    
    setChocolates(prev => [...prev, { id, x, y, text }]);
  };

  const popChocolate = (id: number) => {
    setChocolates(prev => prev.filter(c => c.id !== id));
    setPoppedCount(prev => prev + 1);
    
    // Spawn a new one to keep the game going until limit
    if (poppedCount < 5) {
        spawnChocolate();
    }
  };

  useEffect(() => {
    // Initial spawn
    const interval = setInterval(() => {
        if (chocolates.length < 5 && poppedCount < 7) {
            spawnChocolate();
        }
    }, 800);
    return () => clearInterval(interval);
  }, [chocolates.length, poppedCount]);

  const handleFinish = () => {
      setShowEffects(true);
      setTimeout(() => setShowLetter(true), 3000);
  };

   const handleClose = () => {
      setShowLetter(false);
      onComplete();
  };

  return (
    <div className="max-w-xl mx-auto text-center relative min-h-[500px] flex flex-col items-center justify-center overflow-hidden">
      <EmojiShower active={showEffects} emojis={CHOCO_EMOJIS} duration={6000} density="high" />
      <Letter 
        isOpen={showLetter} 
        onClose={handleClose} 
        message="To my sweetest Appuu, on this Chocolate Day, I want things between us to be as sweet as these chocolates, but without any expiration date! You bring a flavor to my life that no candy in the world can replicate. Your smile is sugar, your love is the cocoa that warms my soul. I promise to keep our life filled with sweetness and joy. Happy Chocolate Day! 🍫❤️"
        signature="Your Sweetest, Love"
      />

      <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-rose-deep mb-2">
        Sweet Like You
      </h2>
      <p className="font-heading text-xl text-muted-foreground italic mb-12">
        Catch 5 sweets to reveal a surprise! 🍫
      </p>

      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
            {chocolates.map(choco => (
                <motion.button
                    key={choco.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute text-5xl cursor-pointer pointer-events-auto filter drop-shadow-lg"
                    style={{ left: `${choco.x}%`, top: `${choco.y}%` }}
                    onClick={() => popChocolate(choco.id)}
                >
                    {choco.text}
                </motion.button>
            ))}
        </AnimatePresence>
      </div>
      
      <div className="z-10 bg-white/30 backdrop-blur-md p-4 rounded-xl border border-white/50">
        <p className="text-2xl font-bold text-burgundy">
            Sweets Collected: {poppedCount}/5
        </p>
      </div>

        {poppedCount >= 5 && !showEffects && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 z-10"
            >
                 <p className="text-xl text-rose-600 font-bold mb-4">You are sweeter than all of these! 🥰</p>
                 <button onClick={handleFinish} className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition shadow-lg animate-bounce">
                    Click for Surprise!
                 </button>
            </motion.div>
        )}
    </div>
  );
};

export default ChocolateDay;
