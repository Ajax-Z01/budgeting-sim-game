"use client";

import { Button } from "flowbite-react";
import FinalReportScreen from "./FinalReportScreen";
import { useRouter } from "next/navigation";

export default function GameFinishedScreen() {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 text-center">
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 transition-all duration-300">
          🎉 Game Selesai!
        </h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Selamat! Kamu berhasil bertahan hidup selama 3 bulan.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Ingin mencoba strategi berbeda? Coba lagi dan lihat apakah kamu bisa menghemat lebih banyak!
        </p>
      </div>

      <FinalReportScreen />

      <div className="w-full flex justify-center">
        <Button className="mt-4 cursor-pointer" onClick={() => router.push("/")}>
          🔄 Mulai Ulang
        </Button>
      </div>
    </div>
  );
}
