"use client";

import { Button } from "flowbite-react";
import { GameOverReason } from "@/stores/GameTypes";

type Props = {
  reason: GameOverReason;
};

export default function GameOverScreen({ reason }: Props) {
  if (!reason) return null;

  const reasonText =
    reason === "balance"
      ? "💸 Saldo kamu habis."
      : "💪 Stamina kamu habis.";

  return (
    <div className="mt-6 text-center flex flex-col items-center">
      <h2 className="text-2xl font-bold text-red-600">💀 Game Over!</h2>
      <p className="mt-2">{reasonText}</p>
      <p className="mt-1">Coba lagi dan kelola hidupmu dengan lebih bijak!</p>
      <Button className="mt-4" onClick={() => window.location.reload()}>
        🔄 Mulai Ulang
      </Button>
    </div>
  )
}
