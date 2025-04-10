"use client";

import React from "react";
import { useGameStore } from "@/store/GameStore";

export default function FinalReportScreen() {
  const { history, balance, stamina, totalWorkDays } = useGameStore();

  const totalSpending = history.reduce(
    (sum, record) =>
      sum + record.choices.reduce((cSum, choice) => cSum + choice.amount, 0),
    0
  );

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center">📊 Final Report</h2>

      <div className="bg-gray-100 p-4 rounded-lg shadow text-black space-y-1">
        <p>🧾 <strong>Total Spending:</strong> ${totalSpending}</p>
        <p>💼 <strong>Total Work Days:</strong> {totalWorkDays}</p>
        <p>💰 <strong>Final Balance:</strong> ${balance}</p>
        <p>⚡ <strong>Final Stamina:</strong> {stamina}</p>
      </div>

      <h3 className="text-xl font-semibold mt-6">📅 Daily Breakdown</h3>
      <div className="space-y-4 text-black">
        {history.map((record, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-4 shadow bg-white space-y-2"
          >
            <p className="font-semibold mb-2">
              📆 Day {record.day}, Month {record.month}
            </p>

            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-1">Kategori</th>
                  <th className="py-1">Aksi</th>
                  <th className="py-1">Biaya</th>
                  <th className="py-1">Stamina</th>
                </tr>
              </thead>
              <tbody>
                {record.choices.map((choice, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-1">{choice.category}</td>
                    <td className="py-1">{choice.label}</td>
                    <td className="py-1">${choice.amount}</td>
                    <td className={`py-1 ${choice.staminaEffect < 0 ? "text-red-500" : "text-green-600"}`}>
                      {choice.staminaEffect > 0 ? "+" : ""}
                      {choice.staminaEffect}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-sm text-gray-600 mt-2">
              💰 Balance: {record.balanceBefore} → {record.balanceAfter}<br />
              ⚡ Stamina: {record.staminaBefore} → {record.staminaAfter}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
