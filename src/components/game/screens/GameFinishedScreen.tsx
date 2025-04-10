"use client";

import { Button } from "flowbite-react";
import FinalReportScreen from "./FinalReportScreen";

export default function GameFinishedScreen() {
  return (
    <div>
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold text-green-600">🎉 Game Selesai!</h2>
        <p className="mt-2">Selamat! Kamu berhasil bertahan hidup selama 3 bulan.</p>
      </div>
      <FinalReportScreen />
      <Button className="mt-4" onClick={() => window.location.reload()}>
        🔄 Mulai Ulang
      </Button>
    </div>
  );
}
