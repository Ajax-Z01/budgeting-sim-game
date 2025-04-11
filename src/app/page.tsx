"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import BackgroundMusic from "@/components/sound/BackgroundMusic";
import { Button } from "flowbite-react";

export default function Home() {
  const clickSoundRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();

  const handleStart = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.play().catch((e) => {
        console.warn("Click sound error:", e);
        router.push("/game");
      });

      clickSoundRef.current.onended = () => {
        router.push("/game");
      };
    } else {
      router.push("/game");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">💰 Budgeting Simulation Game</h1>
      <Button
        onClick={handleStart}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer transition duration-200"
      >
        Start Game
      </Button>
      <p className="text-sm text-gray-500 mt-2">
        🔊 Untuk pengalaman terbaik, aktifkan suara di browser Anda setelah interaksi pertama.
      </p>
      <BackgroundMusic src="/sounds/menu.mp3" volume={0.4} />
      <audio ref={clickSoundRef} src="/sounds/start.mp3" />
    </main>
  );
}
