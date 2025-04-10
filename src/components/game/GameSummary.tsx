"use client";

import { useGameStore } from "@/store/GameStore";

export default function GameSummary() {
  const {
    history,
    currentMonth,
    MAX_MONTHS,
    balance,
    stamina,
  } = useGameStore();

  if (currentMonth <= MAX_MONTHS) return null;

  const totalSpent = history.reduce((sum, day) => {
    const dailyCost = day.balanceBefore - day.balanceAfter;
    return sum + (dailyCost > 0 ? dailyCost : 0);
  }, 0);

  return (
    <div className="mt-6 p-4 border rounded-lg bg-white shadow text-black">
      <h2 className="text-2xl font-bold mb-2">📊 Ringkasan Game</h2>
      <p className="mb-1">Total Hari Dimainkan: {history.length} hari</p>
      <p className="mb-1">Total Pengeluaran: ${totalSpent}</p>
      <p className="mb-1">Saldo Akhir: ${balance}</p>
      <p className="mb-4">Stamina Akhir: {stamina}</p>

      <h3 className="text-lg font-semibold mt-4">🗓️ Detail Harian:</h3>
      <ul className="list-disc ml-5 mt-2 space-y-1">
        {history.map((record, index) => (
          <li key={index}>
            Hari {record.day} Bulan {record.month} — 💸 ${record.balanceBefore - record.balanceAfter}, ⚡ {record.staminaBefore} → {record.staminaAfter}
          </li>
        ))}
      </ul>
    </div>
  );
}
