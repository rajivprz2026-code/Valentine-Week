import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiShower from '../effects/EmojiShower';
import Letter from '../ui/Letter';
import { useNames } from '../../lib/name-context';

const KissDay = ({ onComplete }: { onComplete: () => void }) => {
  const { boy, girl } = useNames(); // <-- dynamic names

  const [kisses, setKisses] = useState<{ id: number; x: number; y: number }[]>([]);
  const [count, setCount] = useState(0);
  const [showEffects, setShowEffects] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [heartParticles, setHeartParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleScreenTap = (e: React.MouseEvent | React.TouchEvent) => {
    if (count >= 10) return;

    const id = Date.now();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }

    setKisses(prev => [...prev, { id, x, y }]);

    // Spawn heart particles around the kiss
    const particles = Array.from({ length: 5 }, (_, i) => ({
      id: id + i + 1000,
      x: x + (Math.random() - 0.5) * 60,
      y: y + (Math.random() - 0.5) * 60,
    }));
    setHeartParticles(prev => [...prev, ...particles]);

    setCount(prev => {
      const newCount = prev + 1;
      if (newCount === 10) {
        setShowEffects(true);
        setTimeout(() => setShowLetter(true), 2500);
      }
      return newCount;
    });

    // Remove kiss after animation
    setTimeout(() => {
      setKisses(prev => prev.filter(k => k.id !== id));
    }, 1000);

    // Remove particles after animation
    setTimeout(() => {
      setHeartParticles(prev => prev.filter(p => !particles.find(pa => pa.id === p.id)));
    }, 1500);
  };

  const handleClose = () => {
    setShowLetter(false);
    onComplete();
  };

  const sweetMessages = [
    "Mmm, so sweet! 😘",
    "Your kisses are magic! ✨",
    "I can feel your love! 💕",
    "More kisses please! 💋",
    "You're making me blush! 🥰",
    "This feels amazing! 💖",
    "I'm falling for you! 😍",
    "Your love is intoxicating! 💝",
    "Almost there, my love! 💓",
    "One more kiss! 😚"
  ];

  return (
    <div 
      className="max-w-xl mx-auto text-center relative p-8 min-h-[500px]"
      onClick={handleScreenTap}
    >
      {/* Romantic pink glow */}
      <motion.div
        className="absolute inset-0 -inset-x-16 -inset-y-16 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ff1493, #ff69b4, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <EmojiShower active={showEffects} emojis={['💋', '😘', '💖', '✨', '🌹', '💕', '💝']} duration={5000} density="high" />

      <Letter
        isOpen={showLetter}
        onClose={handleClose}
        message={`My sweetest ${girl}, on this Kiss Day, I want to send a thousand virtual kisses to every inch of your beautiful face. Each kiss carries a promise of my love, a thank you for being mine, and a whisper of how much you mean to me. You are my most addictive habit, and your kisses are my favorite melody. Happy Kiss Day, my gorgeous girl! 💋❤️`}
        signature={`Yours Truly, ${boy}`}
      />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl sm:text-5xl md:text-7xl text-rose-deep mb-2 pointer-events-none"
      >
        Sending Love
      </motion.h2>

      <p className="font-heading text-sm sm:text-base md:text-lg text-muted-foreground italic mb-8 pointer-events-none">
        Tap anywhere to send 10 kisses 💋
      </p>

      <AnimatePresence mode="wait">
        {count > 0 && count < 10 && (
          <motion.p
            key={count}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-rose-500 font-heading text-xl mb-6 pointer-events-none"
          >
            {sweetMessages[count - 1]}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        <AnimatePresence>
          {kisses.map(kiss => (
            <motion.div
              key={kiss.id}
              initial={{ scale: 0, opacity: 0, x: kiss.x - 20, y: kiss.y - 20, rotate: 0 }}
              animate={{ 
                scale: [0, 1.8, 1.2], 
                opacity: [0, 1, 0], 
                y: kiss.y - 150,
                rotate: [0, 15, -15, 0]
              }}
              exit={{ opacity: 0 }}
              className="absolute text-5xl"
              transition={{ duration: 1 }}
            >
              💋
            </motion.div>
          ))}

          {heartParticles.map(particle => (
            <motion.div
              key={particle.id}
              initial={{ scale: 0, opacity: 0, x: particle.x, y: particle.y }}
              animate={{ 
                scale: [0, 1, 0], 
                opacity: [0, 0.8, 0],
                y: particle.y - 80,
                x: particle.x + (Math.random() - 0.5) * 40
              }}
              exit={{ opacity: 0 }}
              className="absolute text-2xl"
              transition={{ duration: 1.5 }}
            >
              💖
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-[200px] sm:max-w-xs mx-auto mt-24 mb-6 pointer-events-none">
        <div className="h-2.5 sm:h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-500 to-red-500"
            initial={{ width: "0%" }}
            animate={{ width: `${(count / 10) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-heading">
          {count === 10 ? "Kisses Received! 🔥" : `${count}/10 — Keep tapping!`}
        </p>
      </div>
    </div>
  );
};

export default KissDay;
