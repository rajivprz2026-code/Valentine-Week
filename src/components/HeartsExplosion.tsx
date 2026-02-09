import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeartsExplosionProps {
  active: boolean;
  onComplete: () => void;
}

interface Heart {
  id: number;
  x: number;
  startY: number;
  size: number;
  delay: number;
  duration: number;
  emoji: string;
  wobble: number;
}

const HEART_EMOJIS = ["❤️", "💕", "💖", "💗", "💝", "💘", "🌹", "💞", "🥰", "😍", "💓", "💟", "❣️"];

const HeartsExplosion = ({ active, onComplete }: HeartsExplosionProps) => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [wave2, setWave2] = useState<Heart[]>([]);

  useEffect(() => {
    if (!active) return;

    // Wave 1 — immediate burst
    const firstWave: Heart[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      startY: 100 + Math.random() * 20,
      size: 0.8 + Math.random() * 2.5,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
      wobble: -30 + Math.random() * 60,
    }));
    setHearts(firstWave);

    // Wave 2 — delayed cascade
    const timer2 = setTimeout(() => {
      const secondWave: Heart[] = Array.from({ length: 50 }, (_, i) => ({
        id: i + 100,
        x: Math.random() * 100,
        startY: 100 + Math.random() * 20,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 1.5,
        duration: 2.5 + Math.random() * 3,
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
        wobble: -40 + Math.random() * 80,
      }));
      setWave2(secondWave);
    }, 1500);

    const timer = setTimeout(() => {
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [active, onComplete]);

  const allHearts = [...hearts, ...wave2];

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Warm pink overlay */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "radial-gradient(circle at 50% 60%, hsla(345, 70%, 55%, 0.35), hsla(340, 50%, 85%, 0.2), transparent)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6] }}
            transition={{ duration: 2.5 }}
          />

          {/* Hearts from bottom */}
          {allHearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute"
              style={{
                left: `${heart.x}%`,
                fontSize: `${heart.size}rem`,
              }}
              initial={{
                y: `${heart.startY}vh`,
                x: 0,
                rotate: 0,
                opacity: 0,
                scale: 0.3,
              }}
              animate={{
                y: "-15vh",
                x: [0, heart.wobble, -heart.wobble / 2, heart.wobble / 3, 0],
                rotate: [0, -15, 15, -10, 10, 0],
                opacity: [0, 1, 1, 1, 0.8, 0],
                scale: [0.3, 1, 1.1, 1, 0.9, 0.6],
              }}
              transition={{
                duration: heart.duration,
                delay: heart.delay,
                ease: "easeOut",
              }}
            >
              {heart.emoji}
            </motion.div>
          ))}

          {/* Center burst — big hearts exploding outward */}
          {[...Array(16)].map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const distance = 35 + Math.random() * 20;
            return (
              <motion.div
                key={`burst-${i}`}
                className="absolute left-1/2 top-1/2 text-3xl sm:text-4xl"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: Math.cos(angle) * distance * (typeof window !== 'undefined' ? window.innerWidth / 100 : 10),
                  y: Math.sin(angle) * distance * (typeof window !== 'undefined' ? window.innerHeight / 100 : 10),
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.5, 1.2, 0],
                }}
                transition={{ duration: 3, delay: 0.5 + i * 0.08, ease: "easeOut" }}
              >
                {HEART_EMOJIS[i % HEART_EMOJIS.length]}
              </motion.div>
            );
          })}

          {/* Center message */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 1, type: "spring" }}
          >
            <div className="text-center relative">
              {/* Glowing bg behind text */}
              <div
                className="absolute inset-0 -inset-x-8 -inset-y-4 rounded-3xl blur-2xl"
                style={{ background: "radial-gradient(circle, hsla(350, 50%, 90%, 0.9), transparent 70%)" }}
              />
              <motion.p
                className="font-display text-4xl sm:text-5xl md:text-7xl text-rose-deep drop-shadow-lg relative"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Happy Rose Day
              </motion.p>
              <motion.p
                className="font-display text-3xl sm:text-4xl md:text-6xl text-warm mt-2 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.8 }}
              >
                Mero Appuu 🌹
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeartsExplosion;
