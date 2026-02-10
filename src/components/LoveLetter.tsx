import { motion, AnimatePresence } from "framer-motion";
import { useNames } from "../lib/name-context";

interface LoveLetterProps {
  visible: boolean;
  onClose: () => void;
}

const LoveLetter = ({ visible, onClose }: LoveLetterProps) => {
  const { boy, girl } = useNames();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-burgundy/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Letter */}
          <motion.div
            className="relative w-full max-w-lg bg-cream rounded-2xl shadow-romantic overflow-hidden"
            initial={{ scale: 0.5, rotateX: 90, opacity: 0 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          >
            {/* Letter Header */}
            <div className="gradient-romantic p-6 text-center">
              <motion.p
                className="font-display text-4xl md:text-5xl text-primary-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Happy Rose Day
              </motion.p>
              <motion.p
                className="font-heading text-lg text-primary-foreground/80 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Mero {girl} 🌹
              </motion.p>
            </div>

            {/* Letter Body */}
            <motion.div
              className="p-6 md:p-8 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="font-heading text-lg text-foreground leading-relaxed">
                My Dearest {girl},
              </p>

              <p className="font-body text-foreground/80 leading-relaxed">
                On this beautiful Rose Day, I want you to know that you are the most 
                precious flower in the garden of my life. Every petal of every rose 
                reminds me of a moment we've shared, a smile you've given me, a memory 
                that I treasure deep in my heart.
              </p>

              <p className="font-body text-foreground/80 leading-relaxed">
                Babe, you make my world bloom with colors I never knew existed. 
                Your love is like the sweetest fragrance that fills my soul with 
                warmth and happiness. With every sunrise, I fall in love with you 
                all over again, {girl}.
              </p>

              <p className="font-body text-foreground/80 leading-relaxed">
                Just like we planted our rose together today, I want to nurture 
                our love every day — with care, with patience, and with all the 
                love in my heart. You are my sunshine, my rose, and my everything, babe. 🌹
              </p>

              <p className="font-body text-foreground/80 leading-relaxed">
                I promise to be your gardener, your sunshine, and the water that 
                helps your dreams bloom. Together, our love will grow stronger, 
                more beautiful, and more fragrant with each passing day.
              </p>

              <div className="pt-4 text-right">
                <p className="font-heading text-foreground italic">
                  Forever and always yours,
                </p>
                <p className="font-display text-3xl text-rose-deep mt-2">
                  {boy} 💕
                </p>
              </div>

              <div className="text-center pt-4">
                <p className="text-3xl">🌹❤️🌹</p>
              </div>
            </motion.div>

            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="w-full py-4 gradient-romantic text-primary-foreground font-heading text-lg cursor-pointer
                hover:opacity-90 transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              I Love You Too 💕
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoveLetter;
