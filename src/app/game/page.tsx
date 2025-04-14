"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import GameController from "@/components/game/GameController";
import BackgroundMusic from "@/components/sound/BackgroundMusic";
import { useGameStore } from "@/stores/GameStore";
import CharacterJobSelection from "@/components/game/CharacterJobSelection";

const GameNarration = dynamic(() => import("@/components/game/GameNarration"), {
  ssr: false,
  loading: () => <p className="text-white text-center">Loading narasi...</p>,
});

export default function GamePage() {
  const [showNarration, setShowNarration] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
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

  const handleStartGame = (character: string, job: string) => {
    setSelectedCharacter(character);
    setSelectedJob(job);
    setShowNarration(true);
  };

  return (
    <div className="p-6 mt-4 max-w-2xl mx-auto relative">
      {/* Tampilkan CharacterJobSelection pertama kali */}
      {!showNarration && !selectedCharacter && !selectedJob && (
        <CharacterJobSelection onStartGame={handleStartGame} />
      )}

      {/* Menampilkan Narasi setelah pemilihan */}
      {showNarration && (
        <GameNarration onFinish={() => setShowNarration(false)} />
      )}

      {/* Menampilkan GameController setelah narasi */}
      {!showNarration && selectedCharacter && selectedJob && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">
            💸 Budgeting Simulation Game
          </h1>
          <GameController />
          <BackgroundMusic ref={backgroundMusicRef} src="/sounds/game.mp3" volume={0.4} onReady={() => setIsMusicReady(true)} />
        </>
      )}

      <BackgroundMusic ref={gameOverAudioRef} src="/sounds/gameover.mp3" volume={0.4} autoPlay={false} />
    </div>
  );
}
