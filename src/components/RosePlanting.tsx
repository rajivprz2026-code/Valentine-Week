import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmojiShower from './effects/EmojiShower';
import Letter from './ui/Letter';
import { useNames } from '../lib/name-context';

interface RosePlantingProps {
  onRoseComplete: () => void;
}

const STAGES = 5;

// Sub-components (WaterDropInner, WaterDrop, WaterDropAnimated, Pot, Stem, Leaf, RoseBud, Seed, Sprout) remain the same
const WaterDropInner = ({ x }: { x: number }) => (
  <div className="absolute pointer-events-none text-2xl" style={{ left: `${x}%`, top: "20%" }}>💧</div>
);
const WaterDrop = motion.create(WaterDropInner);

const WaterDropAnimated = ({ x }: { x: number }) => (
  <WaterDrop
    x={x}
    initial={{ y: -10, opacity: 1, scale: 1 }}
    animate={{ y: 120, opacity: 0, scale: 0.5 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeIn" }}
  />
);

const Pot = () => (
    <g>
      <rect x="55" y="260" width="90" height="14" rx="4" fill="hsl(25, 55%, 48%)" />
      <rect x="57" y="261" width="86" height="12" rx="3" fill="hsl(25, 60%, 55%)" />
      <path d="M60 274 L68 340 L132 340 L140 274 Z" fill="hsl(25, 55%, 48%)" />
      <path d="M65 274 L72 336 L128 336 L135 274 Z" fill="hsl(25, 60%, 55%)" />
      <path d="M80 274 L84 336 L96 336 L92 274 Z" fill="hsl(25, 65%, 62%)" opacity="0.4" />
      <ellipse cx="100" cy="270" rx="38" ry="8" fill="hsl(20, 30%, 22%)" />
      <ellipse cx="100" cy="268" rx="34" ry="6" fill="hsl(20, 35%, 28%)" />
    </g>
);

const Stem = ({ height }: { height: number }) => (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <motion.rect x="97" width="6" rx="3" fill="url(#stemGradient)" initial={{ y: 262, height: 0 }} animate={{ y: 262 - height, height }} transition={{ duration: 1, ease: "easeOut" }} />
    </motion.g>
);

const Leaf = ({ x, y, flip, delay }: { x: number; y: number; flip?: boolean; delay: number }) => (
    <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.6, type: "spring" }}
        style={{ transformOrigin: `${x}px ${y}px` }}
    >
        <path d={flip ? `M${x},${y} Q${x + 20},${y - 15} ${x + 30},${y - 5} Q${x + 20},${y + 5} ${x},${y}` : `M${x},${y} Q${x - 20},${y - 15} ${x - 30},${y - 5} Q${x - 20},${y + 5} ${x},${y}`} fill="url(#leafGradient)" stroke="hsl(120, 35%, 28%)" strokeWidth="0.5" />
    </motion.g>
);

const RoseBud = ({ stage }: { stage: number }) => {
    const isFullBloom = stage >= 5;
    if (stage < 3) return null;
    if (stage === 3) return <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.6, type: "spring" }} style={{ transformOrigin: "100px 120px" }}><ellipse cx="100" cy="118" rx="6" ry="10" fill="hsl(120, 40%, 35%)" /></motion.g>;

    return (
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: isFullBloom ? 1.15 : 0.85 }} transition={{ delay: 0.3, duration: 1, type: "spring" }} style={{ transformOrigin: "100px 90px" }}>
            <path d="M100,115 Q90,105 85,110 Q90,100 100,105" fill="hsl(120, 40%, 32%)" />
            <path d="M100,115 Q110,105 115,110 Q110,100 100,105" fill="hsl(120, 40%, 32%)" />
            {isFullBloom && (
                <>
                 <motion.path d="M100,95 Q75,80 72,95 Q75,108 100,105" fill="hsl(350, 75%, 48%)" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }} style={{ transformOrigin: "100px 95px" }} />
                 <motion.path d="M100,95 Q125,80 128,95 Q125,108 100,105" fill="hsl(348, 70%, 45%)" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.8 }} style={{ transformOrigin: "100px 95px" }} />
                 <motion.path d="M100,90 Q80,72 78,88 Q82,102 100,100" fill="hsl(345, 80%, 52%)" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 0.8 }} style={{ transformOrigin: "100px 90px" }} />
                 <motion.path d="M100,90 Q120,72 122,88 Q118,102 100,100" fill="hsl(352, 75%, 50%)" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.8 }} style={{ transformOrigin: "100px 90px" }} />
                </>
            )}
             <motion.path d="M100,98 Q85,82 84,95 Q87,105 100,102" fill="hsl(345, 80%, 55%)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }} />
             <motion.path d="M100,98 Q115,82 116,95 Q113,105 100,102" fill="hsl(350, 78%, 50%)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 0.6 }} />
             <motion.ellipse cx="100" cy="95" rx={isFullBloom ? 8 : 5} ry={isFullBloom ? 10 : 7} fill="hsl(345, 85%, 42%)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.5 }} />
             <motion.ellipse cx="100" cy="93" rx={isFullBloom ? 5 : 3} ry={isFullBloom ? 6 : 4} fill="hsl(345, 90%, 38%)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }} />
        </motion.g>
    );
};

const Seed = () => (<motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ellipse cx="100" cy="255" rx="6" ry="4" fill="hsl(30, 40%, 30%)" /></motion.g>);
const Sprout = () => (<motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, type: "spring" }} style={{ transformOrigin: "100px 255px" }}><path d="M100,255 Q95,245 92,248 Q96,240 100,242 Q104,240 108,248 Q105,245 100,255" fill="hsl(120, 50%, 40%)" /></motion.g>);

const RosePlanting = ({ onRoseComplete }: RosePlantingProps) => {
  const { boy, girl } = useNames(); // <-- get dynamic names

  const [stage, setStage] = useState(0);
  const [waterDrops, setWaterDrops] = useState<{ id: number; x: number }[]>([]);
  const [dropCounter, setDropCounter] = useState(0);
  const [showEffects, setShowEffects] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleWater = useCallback(() => {
    if (stage >= STAGES) return;

    const newDrops = Array.from({ length: 3 }, (_, i) => ({
      id: dropCounter + i,
      x: 35 + Math.random() * 30,
    }));
    setWaterDrops((prev) => [...prev, ...newDrops]);
    setDropCounter((prev) => prev + 3);

    setTimeout(() => {
      setWaterDrops((prev) => prev.filter((d) => !newDrops.find((nd) => nd.id === d.id)));
    }, 900);

    const newStage = stage + 1;
    setStage(newStage);

    if (newStage >= STAGES) {
      setTimeout(() => {
        setShowEffects(true);
        setTimeout(() => setShowLetter(true), 3000);
      }, 1500);
    }
  }, [stage, dropCounter]);

  const handleClose = () => {
    setShowLetter(false);
    onRoseComplete();
  };

  const progress = (stage / STAGES) * 100;
  const stemHeight = stage >= 5 ? 170 : stage >= 4 ? 140 : stage >= 3 ? 110 : stage >= 2 ? 70 : stage >= 1 ? 30 : 0;

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-cream to-background relative overflow-hidden">
        
      <EmojiShower active={showEffects} emojis={['🌹', '🌸', '💐', '❤️', '✨']} duration={6000} density="high" />
      <Letter 
        isOpen={showLetter} 
        onClose={handleClose} 
        message={`My darling ${girl}, on this Rose Day, I want to tell you that you are the most beautiful flower in the garden of my life. Just as a rose spreads fragrance, you have filled my life with the scent of your love. Every petal of my heart belongs to you, and I promise to nurture our love with growing affection and care, forever and always. Happy Rose Day! 🌹`}
        signature={`Eternally Yours, ${boy}`} // <-- dynamic boy's name
      />

      <motion.div className="max-w-xl mx-auto text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-rose-deep mb-2">Plant Our Rose</h2>
        <p className="font-heading text-base sm:text-lg md:text-xl text-muted-foreground italic mb-8 sm:mb-12">Let's Plant Our Rose Together, babe 🌱</p>

        <div className="relative w-full max-w-[280px] sm:max-w-[320px] mx-auto mb-8 sm:mb-10">
          <AnimatePresence>{waterDrops.map((drop) => (<WaterDropAnimated key={drop.id} x={drop.x} />))}</AnimatePresence>
          <svg viewBox="0 0 200 350" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="stemGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(120, 40%, 35%)" /><stop offset="100%" stopColor="hsl(120, 35%, 25%)" /></linearGradient>
              <linearGradient id="leafGradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="hsl(120, 50%, 38%)" /><stop offset="100%" stopColor="hsl(120, 40%, 28%)" /></linearGradient>
            </defs>
            <Pot />
            {stage >= 1 && <Stem height={stemHeight} />}
            {stage === 1 && <Sprout />}
            {stage >= 2 && <Leaf x={97} y={262 - stemHeight * 0.4} delay={0.3} />}
            {stage >= 3 && <Leaf x={103} y={262 - stemHeight * 0.65} flip delay={0.3} />}
            {stage >= 4 && <Leaf x={97} y={262 - stemHeight * 0.85} delay={0.3} />}
            <RoseBud stage={stage} />
            {stage === 0 && <Seed />}
          </svg>
        </div>

        <div className="max-w-[200px] sm:max-w-xs mx-auto mb-6">
          <div className="h-2.5 sm:h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full gradient-romantic" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
          </div>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-heading">
            {stage >= STAGES ? `🌹 ${girl}'s rose has bloomed! 🌹` : `Growth: ${stage}/${STAGES} — Keep watering!`}
          </p>
        </div>

        {stage < STAGES && (
          <motion.button onClick={handleWater} className="px-6 sm:px-8 py-3 sm:py-4 rounded-full gradient-romantic text-primary-foreground font-heading text-base sm:text-lg shadow-romantic cursor-pointer hover:shadow-lg transition-shadow duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            💧 Water the Rose
          </motion.button>
        )}

        {stage >= STAGES && (
          <motion.p className="font-display text-2xl sm:text-3xl text-rose-deep" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring" }}>
            Our Love is Blooming! 🌹💕
          </motion.p>
        )}
      </motion.div>
    </section>
  );
};

export default RosePlanting;
