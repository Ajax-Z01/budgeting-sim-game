"use client";

import GameController from "@/components/game/GameController";
import GameSummary from "@/components/game/GameSummary";

export default function GamePage() {
  return (
    <div className="p-6 mt-16 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">💸 Budgeting Simulation Game</h1>
      <GameController />
      <GameSummary />
    </div>
  );
}
