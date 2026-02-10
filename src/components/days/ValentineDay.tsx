import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiShower from '../effects/EmojiShower';
import Letter from '../ui/Letter';
import HeartsExplosion from '../HeartsExplosion';
import { useNames } from '../../lib/name-context';

const ValentineDay = ({ onComplete }: { onComplete: () => void }) => {
  const { boy, girl } = useNames(); // <-- dynamic names

  const [stage, setStage] = useState(0);
  const [showEffects, setShowEffects] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  const handleHeartClick = () => {
    if (stage < 3) {
      setStage(prev => prev + 1);
      if (stage + 1 === 3) {
        setShowEffects(true);
        setShowExplosion(true);
        setTimeout(() => setShowLetter(true), 3000);
      }
    }
  };

  const handleClose = () => {
    setShowLetter(false);
    onComplete();
  };

  const unlockMessages = [
    "Unlocking my heart... 🔐",
    "Opening up to you... 💖",
    "You have the key... ✨"
  ];

  return (
    <div className="max-w-2xl mx-auto text-center relative p-8">
      {/* Grand finale glow */}
      <motion.div
        className="absolute inset-0 -inset-x-24 -inset-y-24 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ff1493, #ff69b4, #ffc0cb, transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      
      <EmojiShower active={showEffects} emojis={['❤️', '💖', '💝', '✨', '🌹', '🥂', '💍']} duration={8000} density="high" />
      {showExplosion && <HeartsExplosion active={showExplosion} onComplete={() => {}} />}
      
      <Letter
        isOpen={showLetter}
        onClose={handleClose}
        message={`My Dearest ${girl}, words can never truly express the depth of my love for you. You are my soulmate, my best friend, and my greatest adventure. Every day with you feels like Valentine's Day, but today is extra special because I get to celebrate the most incredible woman in the world. Thank you for choosing me, for loving me, and for making my life complete. I promise to love you fiercely, protect you always, and cherish every single moment we spend together. You are my forever and always. Happy Valentine's Day, my queen! ❤️❤️❤️`}
        signature={`Eternally Yours, ${boy}`}
      />

      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="font-display text-5xl sm:text-7xl md:text-8xl text-rose-600 mb-4 drop-shadow-sm"
      >
        Happy Valentine's Day!
      </motion.h2>

      <p className="font-heading text-lg sm:text-xl text-muted-foreground italic mb-8">
        My heart is locked for you. Unlock it with 3 taps! 🔐❤️
      </p>

      {/* Unlock message */}
      <AnimatePresence mode="wait">
        {stage > 0 && stage < 3 && (
          <motion.p
            key={stage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-rose-500 font-heading text-2xl mb-6"
          >
            {unlockMessages[stage - 1]}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="relative flex flex-col items-center justify-center py-12">
        <motion.div
          className="relative text-9xl sm:text-[12rem] cursor-pointer select-none"
          animate={stage === 3 ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, -5, 0] } : {}}
          transition={{ duration: 0.8, repeat: stage === 3 ? Infinity : 0 }}
          onClick={handleHeartClick}
        >
          {stage === 0 ? '🔒' : stage === 1 ? '🔐' : stage === 2 ? '❤️' : '💖'}
          
          <AnimatePresence>
            {stage > 0 && stage < 3 && (
                <motion.div
                    key={stage}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 2, opacity: 0.5 }}
                    exit={{ scale: 3, opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center text-8xl pointer-events-none"
                >
                    ✨
                </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 w-full max-w-xs sm:max-w-md mx-auto">
            <div className="h-4 bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/30">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-primary shadow-lg"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(stage / 3) * 100}%` }}
                />
            </div>
            <p className="mt-4 text-rose-deep font-bold font-heading text-lg">
                {stage === 3 ? "UNLOCKED FOREVER! 🔓💖" : `Stage ${stage} of 3`}
            </p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-muted-foreground font-body text-sm sm:text-base max-w-lg mx-auto"
      >
        To My Forever Valentine, {girl}. 🌹 {boy} loves you more than words can say.
      </motion.div>
    </div>
  );
};

export default ValentineDay;
