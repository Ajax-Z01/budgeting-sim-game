"use client";

import { useEffect, useState } from "react";
import useGameState, { Choice, DailyRecord } from "./GameState";
import DailyChoices from "./DailyChoices";

const dailyOptions: Choice[] = [
  // Makan
  { category: "Makan", label: "Masak sendiri", amount: 100, staminaEffect: 0 },
  { category: "Makan", label: "Makan di luar", amount: 300, staminaEffect: 5 },

  // Transportasi
  { category: "Transportasi", label: "Tidak keluar rumah", amount: 0, staminaEffect: 0 },
  { category: "Transportasi", label: "Jalan kaki", amount: 0, staminaEffect: -10 },
  { category: "Transportasi", label: "Naik motor", amount: 100, staminaEffect: -3 },
  { category: "Transportasi", label: "Naik taksi", amount: 300, staminaEffect: 2 },

  // Kegiatan
  { category: "Kegiatan", label: "Bekerja", amount: 0, staminaEffect: -15 },
  { category: "Kegiatan", label: "Belajar", amount: 0, staminaEffect: -10 },
  { category: "Kegiatan", label: "Istirahat", amount: 0, staminaEffect: 20 },
];

export default function GameController() {
  const {
    currentDay,
    currentMonth,
    MAX_MONTHS,
    DAYS_IN_MONTH,
    balance,
    stamina,
    history,
    setCurrentDay,
    setCurrentMonth,
    setBalance,
    setStamina,
    setHistory,
    workDays,
    setWorkDays,
    calculateSalary,
    resetWorkDays,
  } = useGameState();  

  const [todayChoices, setTodayChoices] = useState<Choice[]>([]);

  useEffect(() => {
    const categories = Array.from(new Set(dailyOptions.map((opt) => opt.category)));
    const today: Choice[] = categories.flatMap((cat) =>
      dailyOptions.filter((opt) => opt.category === cat)
    );
    setTodayChoices(today);
  }, [currentDay]);

  const handleConfirmChoices = (selectedChoices: Choice[]) => {
    const totalCost = selectedChoices.reduce((sum, choice) => sum + choice.amount, 0);
    const totalStamina = selectedChoices.reduce((sum, choice) => sum + choice.staminaEffect, 0);
  
    const didWork = selectedChoices.some((choice) => choice.label === "Bekerja");
    if (didWork) {
      setWorkDays((prev) => prev + 1);
    }
  
    const newBalance = balance - totalCost;
    const newStamina = Math.min(100, Math.max(0, stamina + totalStamina));
  
    const record: DailyRecord = {
      day: currentDay,
      month: currentMonth,
      choices: selectedChoices,
      balanceBefore: balance,
      balanceAfter: newBalance,
      staminaBefore: stamina,
      staminaAfter: newStamina,
    };
  
    setBalance(newBalance);
    setStamina(newStamina);
    setHistory([...history, record]);
  
    if (currentDay >= DAYS_IN_MONTH) {
      const salary = calculateSalary(workDays);
      setBalance((prev) => prev + salary);
  
      setCurrentDay(1);
      setCurrentMonth((prev) => prev + 1);
      resetWorkDays();
    } else {
      setCurrentDay((prev) => prev + 1);
    }
  };  

  if (currentMonth > MAX_MONTHS) {
    return <p className="mt-4 text-center font-semibold">🎉 Game selesai! Terima kasih sudah bermain.</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Hari {currentDay} / Bulan {currentMonth}</h2>
      <p>💰 Saldo: ${balance}</p>
      <p>💪 Stamina: {stamina}</p>

      <DailyChoices
        choices={todayChoices}
        onChoose={handleConfirmChoices}
      />
    </div>
  );
}
