
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlowerItem {
  emoji: string;
  name: string;
  color: string;
  message: string;
}

const flowers: FlowerItem[] = [
  {
    emoji: "🌹",
    name: "Red Rose",
    color: "from-rose-deep to-petal",
    message: "A red rose for the love that burns bright in my heart every single day, Kanchuu. You are my forever flame. 🔥",
  },
  {
    emoji: "🌷",
    name: "Tulip",
    color: "from-petal to-rose-light",
    message: "Like a tulip that blooms with grace, your smile lights up every room. You make my world colorful, babe. 🌈",
  },
  {
    emoji: "🌸",
    name: "Cherry Blossom",
    color: "from-rose-light to-rose-blush",
    message: "Delicate like cherry blossoms, your love is the most beautiful thing in my life. Forever yours, Kanchuu. 💕",
  },
  {
    emoji: "🌻",
    name: "Sunflower",
    color: "from-warm to-rose-gold",
    message: "You are my sunflower — always turning me towards the light. You brighten my darkest days, babe. ☀️",
  },
  {
    emoji: "🌺",
    name: "Hibiscus",
    color: "from-primary to-rose-deep",
    message: "Exotic and mesmerizing, just like you. Every moment with you feels like paradise, Kanchuu. 🏝️",
  },
  {
    emoji: "💐",
    name: "Bouquet",
    color: "from-rose-gold to-petal",
    message: "If I could give you all the flowers in the world, it still wouldn't be enough to show how much I love you. 💝",
  },
];

const FlowerGallery = () => {
  const [selectedFlower, setSelectedFlower] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />

      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-rose-deep mb-4">
          Flowers for You
        </h2>
        <p className="font-heading text-sm sm:text-base md:text-lg text-muted-foreground italic mb-8 sm:mb-12">
          Each flower carries a special message, tap to reveal ✨
        </p>

        {/* Flower Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {flowers.map((flower, index) => (
            <motion.button
              key={index}
              className={`relative p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-border transition-all duration-300 cursor-pointer
                ${selectedFlower === index
                  ? "bg-gradient-to-br " + flower.color + " border-transparent shadow-romantic scale-105"
                  : "bg-card hover:shadow-petal hover:border-rose-light"
                }`}
              onClick={() => setSelectedFlower(selectedFlower === index ? null : index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: selectedFlower === index ? 1.05 : 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="text-3xl sm:text-5xl md:text-6xl block mb-2 sm:mb-3"
                animate={selectedFlower === index ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {flower.emoji}
              </motion.span>
              <span className={`font-heading text-sm md:text-base font-semibold
                ${selectedFlower === index ? "text-primary-foreground" : "text-foreground"}`}>
                {flower.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Message Display */}
        <AnimatePresence mode="wait">
          {selectedFlower !== null && (
            <motion.div
              key={selectedFlower}
              className="max-w-xl mx-auto p-8 rounded-2xl bg-card shadow-romantic border border-rose-light/30"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <span className="text-4xl block mb-4">{flowers[selectedFlower].emoji}</span>
              <p className="font-body text-lg text-foreground leading-relaxed italic">
                "{flowers[selectedFlower].message}"
              </p>
              <p className="mt-4 font-display text-2xl text-rose-deep">— Rajiv</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default FlowerGallery;
