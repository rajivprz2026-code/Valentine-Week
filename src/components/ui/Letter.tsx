
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LetterProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  signature?: string;
}

const Letter: React.FC<LetterProps> = ({ isOpen, onClose, message, signature = "Forever Yours, Rajiv ❤️" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateX: 90 }}
            transition={{ type: "spring", damping: 12 }}
            className="bg-[#fff9f0] p-8 max-w-md w-full shadow-2xl rounded-sm border md:border-8 border-double border-rose-200 relative overflow-hidden"
            style={{ 
                backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)", 
                backgroundSize: "20px 20px" 
            }}
          >
            {/* Paper texture overlay */}
            <div className="absolute inset-0 bg-yellow-500/5 pointer-events-none" />

            <div className="relative z-10 text-center font-heading">
                <div className="mb-6 text-2xl text-rose-400">💌</div>
                <div className="text-lg md:text-xl text-stone-800 leading-relaxed italic mb-8" style={{ fontFamily: 'Dancing Script, cursive' }}>
                    "{message}"
                </div>
                <div className="text-right text-rose-600 font-bold text-sm md:text-base">
                    ~ {signature}
                </div>
                
                <button 
                    onClick={onClose}
                    className="mt-8 px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition text-sm font-sans"
                >
                    Close Letter
                </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Letter;
