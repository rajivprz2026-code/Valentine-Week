import { motion } from "framer-motion";

const RoseFooter = () => {
  return (
    <footer className="py-10 bg-burgundy text-center relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full flex justify-center gap-2 -translate-y-1/2">
        {[...Array(15)].map((_, i) => (
          <span key={i} className="text-xl opacity-60">🌹</span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-display text-3xl md:text-4xl text-rose-light mb-2">
          Made with Love
        </p>
        <p className="font-heading text-base md:text-lg text-rose-blush/80">
          By <span className="text-warm font-semibold">Love</span> for his lovely baby{" "}
          <span className="text-warm font-semibold">Appuu</span> 💕
        </p>
        <p className="font-body text-xs sm:text-sm text-rose-blush/50 mt-1">
          7th – 14th February • Valentine's Week 🌹
        </p>
        <div className="mt-4 flex justify-center gap-1">
          {["🌹", "❤️", "🌹", "❤️", "🌹"].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-lg"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};

export default RoseFooter;
