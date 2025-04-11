"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "flowbite-react";

const narrationText = `Selamat datang di dunia yang tak sederhana.

Di sinilah setiap keputusan membawa konsekuensi nyata. 
Kamu akan hidup selama tiga bulan ke depan dengan anggaran terbatas. 
Makan, transportasi, pekerjaan, dan istirahat — semuanya harus dipilih dengan hati-hati.

Apakah kamu akan menabung demi masa depan? 
Atau menghabiskan uang demi kenyamanan sesaat?

Ingat, stamina dan uang adalah segalanya di dunia ini. 
Pikirkan matang-matang, karena pilihanmu hari ini menentukan hidupmu esok hari.

Sekarang… bersiaplah.

Permainan dimulai.`;

export default function GameNarration({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const audioRef = useRef<HTMLAudioElement>(null);
  const indexRef = useRef(0);
  const typingAudioRef = useRef<HTMLAudioElement>(null);

  const handleStart = () => {
    setStarted(true);
    audioRef.current?.play().catch((e) => {
      console.warn("Narration audio blocked:", e);
    });
  };
  
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
    if (!started || skipped) return;
  
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
    }, 75);
  
    return () => clearInterval(interval);
  }, [started, skipped]);

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
          {!started ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center flex flex-col items-center justify-center gap-4"
            >
              <h2 className="text-2xl font-semibold mb-4">🎙️ Narasi Pembuka</h2>
              <Button
                onClick={handleStart}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-lg transition cursor-pointer"
              >
                Mulai Narasi
              </Button>
            </motion.div>
          ) : (
            <>
                <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 1 }}
                className="text-lg text-center max-w-2xl leading-relaxed whitespace-pre-line font-mono"
                >
                {displayedText}
                </motion.p>
                <Button color="red"
                    onClick={handleSkip}
                    className="mt-8 px-4 py-2 rounded text-sm transition cursor-pointer"
                    >
                    Skip
                </Button>
            </>
          )}

          <audio ref={audioRef} src="/sounds/narration-indo.mp3" />
          <audio ref={typingAudioRef} src="/sounds/typing.mp3" preload="auto" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
