"use client";

import { Card } from "flowbite-react";
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
  const stamnaPercent = (stamina / maxStamina) * 100;

  return (
    <Card className="mb-4">
      <div className="flex items-center gap-4 mb-4 justify-between">
        <h2 className="text-xl font-bold">📊 Status Pemain</h2>
        <CharacterAvatar stamina={stamina} gender={gender} />
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><span className="font-medium">Bulan:</span> {month} / {maxMonth}</div>
        <div><span className="font-medium">Hari:</span> {day} / {days_in_month}</div>
        <div>
          <span className="font-medium">Saldo:</span> ${balance}
          <ProgressBar value={balancePercent} color={getBarColor(balancePercent)} />
        </div>
        <div>
          <span className="font-medium">Stamina:</span> {stamina} / {maxStamina}
          <ProgressBar value={stamnaPercent} color={getBarColor(stamina)} />
        </div>
        <div>
          <span className="font-medium">Hari Bekerja:</span> {workDays} hari
        </div>
        <div>
          <span className="font-medium">Gaji Bulan Ini:</span> ${nextSalary}
        </div>
        <div>
          <span className="font-medium">Karakter:</span> {selectedCharacter?.name || 'Tidak ada karakter'}
        </div>
        <div>
          <span className="font-medium">Pekerjaan:</span> {selectedJob?.name || 'Tidak ada pekerjaan'}
        </div>
      </div>
    </Card>
  );
}
