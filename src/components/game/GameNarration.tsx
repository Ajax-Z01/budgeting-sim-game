"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "flowbite-react";

const narrationText = `Welcome to a challenging world.
Every choice has real impact.
Live the next 3 months on a tight budget.
Food, transport, work, and rest — choose wisely.
Will you save or spend?
Stamina and money matter.
Think smart.
Your choices shape your future.
The game begins.`;

export default function GameNarration({ onFinish }: { onFinish: () => void }) {
  const [ended, setEnded] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const audioRef = useRef<HTMLAudioElement>(null);
  const indexRef = useRef(0);
  const typingAudioRef = useRef<HTMLAudioElement>(null);

  const handleSkip = () => {
    setSkipped(true);
    setDisplayedText(narrationText);
    setEnded(true);
    audioRef.current?.pause();
    audioRef.current!.currentTime = audioRef.current!.duration;
    onFinish();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Play narration audio
    audio.play().catch((e) => {
      console.warn("Narration audio blocked:", e);
    });

    // Set listener for end of narration
    const handleEnded = () => {
      setEnded(true);
      setTimeout(() => onFinish(), 1000);
    };
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [onFinish]);

  useEffect(() => {
    if (skipped) return;

    const interval = setInterval(() => {
      const currentChar = narrationText[indexRef.current];
      setDisplayedText((prev) => prev + currentChar);

      if (
        currentChar !== " " &&
        currentChar !== "\n" &&
        indexRef.current % 3 === 0
      ) {
        const clone = typingAudioRef.current?.cloneNode(true) as HTMLAudioElement;
        clone.volume = 0.1;
        clone.play().catch(() => {});
      }

      indexRef.current++;

      if (indexRef.current >= narrationText.length) {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [skipped]);

  return (
    <AnimatePresence>
      {!ended && (
        <motion.div
          key="narration"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 text-white flex flex-col items-center justify-center z-50 p-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 1 }}
            className="text-lg text-center max-w-2xl leading-relaxed whitespace-pre-line font-mono"
          >
            {displayedText}
          </motion.p>
          <Button
            color="red"
            onClick={handleSkip}
            className="mt-8 px-4 py-2 rounded text-sm transition cursor-pointer"
          >
            Skip
          </Button>

          <audio ref={audioRef} src="/sounds/narration.mp3" />
          <audio ref={typingAudioRef} src="/sounds/typing.mp3" preload="auto" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
