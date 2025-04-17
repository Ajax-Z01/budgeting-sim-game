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
import { useTheme } from "next-themes";

export default function FinalReportScreen() {
  const { history, balance, stamina, totalWorkDays } = useGameStore();

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

  return (
    <div className="p-6 w-full mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
        📊 Final Report
      </h2>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-gray-800 dark:text-white space-y-1">
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
