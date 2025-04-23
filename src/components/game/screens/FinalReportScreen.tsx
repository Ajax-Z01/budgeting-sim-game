"use client";

import React from "react";
import { useGameStore } from "@/stores/GameStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function FinalReportScreen() {
  const { history, balance, stamina, totalWorkDays, gameOverReason } = useGameStore();

  const totalSpending = history.reduce(
    (sum, record) =>
      sum + record.choices.reduce((cSum, choice) => cSum + choice.amount, 0),
    0
  );

  const chartData = history.map((record) => {
    const spending = record.choices.reduce((sum, c) => sum + c.amount, 0);
    return {
      day: `M${record.month}-D${record.day}`,
      balance: record.balanceAfter,
      stamina: record.staminaAfter,
      spending,
    };
  });
  
  let title = "";

  if (gameOverReason) {
    switch (gameOverReason) {
      case "balance":
        title = "💸 Bankrupt Rookie";
      case "stamina":
        title = "😵 Burnout Casual";
        break;
      default:
        title = "🎮 Game Over";
        break;
    }
  } else {
    if (
      balance > 800 &&
      stamina > 70 &&
      totalSpending < 1000 &&
      totalWorkDays >= 30 &&
      totalWorkDays <= 40
    ) {
      title = "🎯 Life Optimizer";
    } else if (balance < 100 && stamina < 30 && totalWorkDays > 45) {
      title = "🔥 All-In Hustler";
    } else if (balance < 100 && totalWorkDays < 20 && totalSpending < 700) {
      title = "🌱 Passive Dreamer";
    } else {
      if (balance > 5000) title = "🤑 Budget Master";
      else if (balance < 100) title = "💸 Big Spender";
      else if (balance > 2500) title = "💰 Smart Saver";
      else title = "🪙 Frugal Hero";

      if (stamina > 80) title += " + 🧘 Zen Master";
      else if (stamina < 20) title += " + 😮‍💨 Burnout Survivor";
      else title += " + 🙂 Balanced Life";

      if (totalWorkDays > 45) title += " + 🏃 Workaholic";
      else if (totalWorkDays < 25) title += " + ☀️ Chill Worker";
      else title += " + 👨‍💼 Hard Worker";

      if (totalSpending > 2000) title += " + 💎 Luxury Lifestyler";
      else if (totalSpending > 1500) title += " + 📉 Budget Bender";
      else if (totalSpending > 500) title += " + 🧾 Mindful Spender";
      else title += " + 🥦 Minimalist";
    }
  }

  return (
    <div className="p-6 w-full mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
        📊 Final Report
      </h2>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-gray-800 dark:text-white space-y-1">
        <p> <strong> Your Title:</strong> <span>{title}</span> </p>
        <p>🧾 <strong>Total Spending:</strong> ${totalSpending}</p>
        <p>💼 <strong>Total Work Days:</strong> {totalWorkDays}</p>
        <p>💰 <strong>Final Balance:</strong> ${balance}</p>
        <p>⚡ <strong>Final Stamina:</strong> {stamina}</p>
      </div>

      {/* Balance Over Time */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center text-blue-600 dark:text-blue-400">
          💰 Balance Over Time
        </h3>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-gray-800 dark:text-white">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid className="stroke-gray-300 dark:stroke-gray-600" strokeDasharray="3 3" />
              <XAxis dataKey="day" className="fill-current text-gray-800 dark:text-white" />
              <YAxis className="fill-current text-gray-800 dark:text-white" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tw-bg-opacity, 1)",
                }}
                wrapperClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
              />
              <Legend />
              <Line type="monotone" dataKey="balance" stroke="#3b82f6" name="Balance" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stamina Over Time */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center text-blue-600 dark:text-blue-400">
          ⚡ Stamina Over Time
        </h3>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-gray-800 dark:text-white">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid className="stroke-gray-300 dark:stroke-gray-600" strokeDasharray="3 3" />
              <XAxis dataKey="day" className="fill-current text-gray-800 dark:text-white" />
              <YAxis className="fill-current text-gray-800 dark:text-white" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tw-bg-opacity, 1)",
                }}
                wrapperClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
              />
              <Legend />
              <Line type="monotone" dataKey="stamina" stroke="#10b981" name="Stamina" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily Spending */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center text-blue-600 dark:text-blue-400">
          💸 Daily Spending
        </h3>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-gray-800 dark:text-white">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid className="stroke-gray-300 dark:stroke-gray-600" strokeDasharray="3 3" />
              <XAxis dataKey="day" className="fill-current text-gray-800 dark:text-white" />
              <YAxis className="fill-current text-gray-800 dark:text-white" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tw-bg-opacity, 1)",
                }}
                wrapperClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
              />
              <Legend />
              <Line type="monotone" dataKey="spending" stroke="#ef4444" name="Spending" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
