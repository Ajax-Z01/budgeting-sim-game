"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import GameController from "@/components/game/GameController";
import BackgroundMusic from "@/components/sound/BackgroundMusic";
import { useGameStore } from "@/stores/GameStore";

const GameNarration = dynamic(() => import("@/components/game/GameNarration"), {
  ssr: false,
  loading: () => <p className="text-white text-center">Loading narasi...</p>,
});

export default function GamePage() {
  const [showNarration, setShowNarration] = useState(true);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const gameOverAudioRef = useRef<HTMLAudioElement>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement>(null);
  const [isMusicReady, setIsMusicReady] = useState(false);

  useEffect(() => {
    if (isGameOver && isMusicReady && backgroundMusicRef.current) {
      gameOverAudioRef.current?.play();
      backgroundMusicRef.current.pause();
    }
  }, [isGameOver, isMusicReady]);
  
  return (
    <div className="p-6 mt-4 max-w-2xl mx-auto relative">
      {showNarration && (
        <GameNarration onFinish={() => setShowNarration(false)} />
      )}

      {!showNarration && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">
            💸 Budgeting Simulation Game
          </h1>
          <GameController />
          <BackgroundMusic ref={backgroundMusicRef} src="/sounds/game.mp3" volume={0.4} onReady={() => setIsMusicReady(true)} />
        </>
      )}

      <BackgroundMusic ref={gameOverAudioRef} src="/sounds/gameover.mp3" volume={0.4} autoPlay={false}/>
    </div>
  );
}
