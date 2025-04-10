"use client";

import GameController from "@/components/game/GameController";

export default function GamePage() {
  return (
    <div className="p-6 mt-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">💸 Budgeting Simulation Game</h1>
      <GameController />
    </div>
  );
}
