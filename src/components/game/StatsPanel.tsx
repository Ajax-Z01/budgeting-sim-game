"use client";

import { Card } from "flowbite-react";
import ProgressBar from "../ui/ProgressBar";
import Image from "next/image";

type Props = {
  month: number;
  day: number;
  days_in_month: number;
  balance: number;
  stamina: number;
  maxMonth: number;
  maxBalance: number;
  workDays: number;
  nextSalary: number;
};

function getBarColor(value: number): "green" | "yellow" | "red" {
  if (value > 60) return "green";
  if (value > 30) return "yellow";
  return "red";
}

// function getAvatar(stamina: number, balance: number, maxBalance: number): string {
//   const staminaPercent = (stamina / 100) * 100;
//   const balancePercent = (balance / maxBalance) * 100;

//   if (staminaPercent >= 70 && balancePercent >= 70) return "/avatar/male-happy.svg";
//   if (staminaPercent <= 40 && balancePercent <= 50) return "/avatar/male-sad.svg";
//   if (staminaPercent <= 20 || balancePercent <= 20) return "/avatar/male-angry.svg";
//   return "/avatar/male-normal.svg";
// }

export default function StatsPanel({
  month,
  day,
  days_in_month,
  balance,
  stamina,
  maxMonth,
  maxBalance,
  workDays,
  nextSalary,
}: Props) {
  const balancePercent = (balance / maxBalance) * 100;
  // const avatarSrc = getAvatar(stamina, balance, maxBalance);

  return (
    <Card className="mb-4">
      <div className="flex items-center gap-4 mb-4">
        {/* <Image
          src={avatarSrc}
          alt="Player Avatar"
          width={64}
          height={64}
          className="rounded-full border"
        /> */}
        <h2 className="text-xl font-bold">📊 Status Pemain</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><span className="font-medium">Bulan:</span> {month} / {maxMonth}</div>
        <div><span className="font-medium">Hari:</span> {day} / {days_in_month}</div>
        <div>
          <span className="font-medium">Saldo:</span> ${balance}
          <ProgressBar value={balancePercent} color={getBarColor(balancePercent)} />
        </div>
        <div>
          <span className="font-medium">Stamina:</span> {stamina} / 100
          <ProgressBar value={stamina} color={getBarColor(stamina)} />
        </div>
        <div>
          <span className="font-medium">Hari Bekerja:</span> {workDays} hari
        </div>
        <div>
          <span className="font-medium">Gaji Bulan Ini:</span> ${nextSalary}
        </div>
      </div>
    </Card>
  );
}
