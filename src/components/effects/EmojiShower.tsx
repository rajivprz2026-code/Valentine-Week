
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmojiShowerProps {
  emojis: string[];
  active: boolean;
  duration?: number;
  density?: 'low' | 'medium' | 'high';
}

const EmojiShower: React.FC<EmojiShowerProps> = ({ emojis, active, duration = 3000, density = 'medium' }) => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; emoji: string; scale: number; rotation: number }[]>([]);

  useEffect(() => {
    if (active) {
      const intervalTime = density === 'high' ? 30 : density === 'medium' ? 100 : 300;
      
      const interval = setInterval(() => {
        // Spawn multiple particles at once for high density
        const spawnCount = density === 'high' ? 3 : 1;
        
        for (let i = 0; i < spawnCount; i++) {
            const id = Date.now() + Math.random();
            const x = Math.random() * 100;
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            const scale = 0.5 + Math.random() * 1.5;
            const rotation = Math.random() * 360;
            
            setParticles(prev => [...prev, { id, x, y: -10, emoji, scale, rotation }]);

            // Cleanup old particles
            setTimeout(() => {
                setParticles(prev => prev.filter(p => p.id !== id));
            }, duration);
        }

      }, intervalTime);

      const timeout = setTimeout(() => {
        clearInterval(interval);
      }, duration);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [active, emojis, duration, density]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
            {particles.map(particle => (
                <motion.div
                    key={particle.id}
                    initial={{ y: -50, x: `${particle.x}vw`, opacity: 0, scale: 0, rotate: 0 }}
                    animate={{ 
                        y: '105vh', 
                        opacity: [0, 1, 1, 0], 
                        scale: particle.scale, 
                        rotate: particle.rotation + 360 
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="absolute text-4xl"
                    style={{ left: `${particle.x}vw` }}
                >
                    {particle.emoji}
                </motion.div>
            ))}
        </AnimatePresence>
    </div>
  );
};

export default EmojiShower;
