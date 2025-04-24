"use client";

import { Card, Tooltip } from "flowbite-react";
import { FaWallet, FaHeartbeat, FaCalendarAlt, FaBriefcase, FaUserTie, FaClock } from "react-icons/fa";
import ProgressBar from "../ui/ProgressBar";
import CharacterAvatar from "./elements/CharacterAvatar";
import { Character, Job } from "@/stores/GameTypes";

type Props = {
  month: number;
  day: number;
  days_in_month: number;
  balance: number;
  stamina: number;
  maxMonth: number;
  maxBalance: number;
  maxStamina: number;
  workDays: number;
  nextSalary: number;
  gender: 'male' | 'female' | null;
  selectedCharacter: Character | null;
  selectedJob: Job | null;
};

function getBarColor(value: number): "green" | "yellow" | "red" {
  if (value > 60) return "green";
  if (value > 30) return "yellow";
  return "red";
}

export default function StatsPanel({
  month,
  day,
  days_in_month,
  balance,
  stamina,
  maxMonth,
  maxBalance,
  maxStamina,
  workDays,
  nextSalary,
  gender,
  selectedCharacter,
  selectedJob,
}: Props) {
  const balancePercent = (balance / maxBalance) * 100;
  const staminaPercent = (stamina / maxStamina) * 100;

  return (
    <Card className="mb-4 shadow-md">
      <div className="flex items-center gap-4">
        <CharacterAvatar stamina={stamina} gender={gender} />
        <h2 className="text-xl font-bold text-white">📊 Player Stats</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-white">
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" />
          <span><span className="font-medium">Month:</span> {month} / {maxMonth}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-purple-500" />
          <span><span className="font-medium">Day:</span> {day} / {days_in_month}</span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <FaWallet className="text-green-600" />
            <span className="font-medium">Balance:</span> ${balance}
          </div>
          <ProgressBar value={balancePercent} color={getBarColor(balancePercent)} />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <FaHeartbeat className="text-red-500" />
            <span className="font-medium">Stamina:</span> {stamina} / {maxStamina}
          </div>
          <ProgressBar value={staminaPercent} color={getBarColor(stamina)} />
        </div>

        <div className="flex items-center gap-2">
          <FaClock className="text-yellow-500" />
          <span><span className="font-medium">Work Days:</span> {workDays} days</span>
        </div>
        <div className="flex items-center gap-2">
          <FaWallet className="text-indigo-600" />
          <span><span className="font-medium">This Month's Salary:</span> ${nextSalary}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaUserTie className="text-white" />
          <span><span className="font-medium">Character:</span> {selectedCharacter?.name || 'No character selected'}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaBriefcase className="text-cyan-600" />
          <span><span className="font-medium">Job:</span> {selectedJob?.name || 'No job selected'}</span>
        </div>
      </div>
    </Card>
  );
}
