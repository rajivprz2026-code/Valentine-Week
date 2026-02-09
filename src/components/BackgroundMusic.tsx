import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);

  // IMPORTANT: mp3 MUST be inside /public
  const musicUrl = "/taylor-swift-lover-official-music-video_8qsdoMNe.mp3";

  // Autoplay muted on load (this is allowed)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1;
    audio.muted = true;

    audio
      .play()
      .then(() => setIsReady(true))
      .catch(() => {
        // Safari sometimes delays
        console.log("Autoplay delayed until interaction");
      });
  }, []);

  // Hint logic
  const [showHint, setShowHint] = useState(true);

  // Toggle mute/unmute
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
    // Hide hint once user un-mutes
    if (!audio.muted) {
        setShowHint(false);
    }

    if (audio.paused) {
      audio.play();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
      <audio ref={audioRef} src={musicUrl} loop playsInline />

      <AnimatePresence>
        {showHint && isMuted && (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="bg-black/80 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg"
            >
                Tap to play music for better experience 🎵
            </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-full text-white shadow-lg hover:bg-black transition"
        title={isMuted ? "Unmute Music" : "Mute Music"}
      >
        {isMuted ? (
          // Muted icon
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          // Volume icon
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default BackgroundMusic;
