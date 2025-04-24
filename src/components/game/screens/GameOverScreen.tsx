"use client";

import { Button } from "flowbite-react";
import { GameOverReason } from "@/stores/GameTypes";
import FinalReportScreen from "./FinalReportScreen";

type Props = {
  reason: GameOverReason;
};

export default function GameOverScreen({ reason }: Props) {
  if (!reason) return null;

  const reasonText =
    reason === "balance"
      ? "💸 Your balance is depleted. You can no longer afford your daily needs."
      : "💪 Your stamina is exhausted. Your body is too tired to continue.";

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 text-center">
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 transition-all duration-300">
          💀 Game Over!
        </h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{reasonText}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Try again and manage your life more wisely!
        </p>
      </div>

      <FinalReportScreen />

      <div className="w-full flex justify-center">
        <Button className="mt-4 cursor-pointer" onClick={() => window.location.reload()}>
          🔄 Restart
        </Button>
      </div>
    </div>
  );
}
