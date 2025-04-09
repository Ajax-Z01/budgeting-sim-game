"use client";

import { useEffect, useState } from "react";
import useGameState, { Choice, DailyRecord } from "./GameState";
import DailyChoices from "./elements/DailyChoices";
import GameOverScreen from "./screens/GameOverScreen";
import GameFinishedScreen from "./screens/GameFinishedScreen";
import StatsPanel from "./StatsPanel";
import ToastNotification from "../ui/ToastNotification";

const dailyOptions: Choice[] = [
  // Makan
  { category: "Makan", label: "Masak sendiri", amount: 100, staminaEffect: 5 },
  { category: "Makan", label: "Makan di luar", amount: 300, staminaEffect: 10 },

  // Transportasi
  { category: "Transportasi", label: "Tidak keluar rumah", amount: 0, staminaEffect: 0 },
  { category: "Transportasi", label: "Jalan kaki", amount: 0, staminaEffect: -10 },
  { category: "Transportasi", label: "Naik motor", amount: 100, staminaEffect: -5 },
  { category: "Transportasi", label: "Naik taksi", amount: 300, staminaEffect: 5 },

  // Kegiatan
  { category: "Kegiatan", label: "Istirahat", amount: 0, staminaEffect: 30 },
  { category: "Kegiatan", label: "Belajar", amount: 0, staminaEffect: -10 },
  { category: "Kegiatan", label: "Bekerja", amount: 0, staminaEffect: -15 },
];

export default function GameController() {
  const {
    currentDay,
    currentMonth,
    MAX_MONTHS,
    DAYS_IN_MONTH,
    balance,
    MAX_BALANCE,
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
  const [staminaWarning, setStaminaWarning] = useState<string | null>(null);
  const [balanceWarning, setBalanceWarning] = useState<string | null>(null);
  const [gameOverReason, setGameOverReason] = useState<"balance" | "stamina" | null>(null);
  const [payNotification, setPayNotification] = useState<string | null>(null);
  const nextSalary = calculateSalary(workDays);
  const isGameOver = gameOverReason !== null;

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
  
    const newBalance = balance - totalCost;
    const newStamina = Math.min(100, Math.max(0, stamina + totalStamina));
  
    if (newStamina <= 30 && newStamina > 0) {
      setStaminaWarning("⚠️ Stamina kamu rendah, pertimbangkan untuk istirahat besok.");
    } else if (newStamina === 0) {
      setStaminaWarning("❌ Stamina habis! Kamu harus istirahat untuk bisa melanjutkan hari.");
    } else {
      setStaminaWarning(null);
    }
    
    if (newBalance < 300) {
      setBalanceWarning("⚠️ Saldo kamu menipis, hati-hati dalam mengambil pilihan.");
    } else {
      setBalanceWarning(null);
    }
    
    if (newBalance <= 0) {
      setGameOverReason("balance");
      return;
    }
    
    if (newStamina <= 0) {
      setGameOverReason("stamina");
      return;
    }
    
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
    
    const workedToday = selectedChoices.some((choice) => choice.label === "Bekerja");
    if (workedToday) {
      setWorkDays(workDays + 1);
    }
  
    if (currentDay >= DAYS_IN_MONTH) {
      const salary = calculateSalary(workDays);
      setBalance((prev) => prev + salary);
      setPayNotification(`💼 Kamu menerima gaji sebesar $${salary}!`);
      resetWorkDays();
      
      setCurrentDay(1);
      setCurrentMonth((prev) => prev + 1);
    } else {
      setCurrentDay((prev) => prev + 1);
    }    
  };
  
  useEffect(() => {
    if (payNotification) {
      const timer = setTimeout(() => setPayNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [payNotification]);
  
  useEffect(() => {
    if (staminaWarning) {
      const timer = setTimeout(() => setStaminaWarning(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [staminaWarning]);
  
  useEffect(() => {
    if (balanceWarning) {
      const timer = setTimeout(() => setBalanceWarning(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [balanceWarning]);  
  
  if (currentMonth > MAX_MONTHS) {
    return <GameFinishedScreen />;
  }
  
  if (isGameOver) {
    return <GameOverScreen reason={gameOverReason} />;
  }
  
  return (
    <div className="mt-6">
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {payNotification && (
          <ToastNotification message={`💼 ${payNotification}`} type="success" />
        )}
        {staminaWarning && (
          <ToastNotification message={staminaWarning} type="warning" />
        )}
        {balanceWarning && (
          <ToastNotification message={balanceWarning} type="error" />
        )}
      </div>
            
      <StatsPanel
        month={currentMonth}
        day={currentDay}
        balance={balance}
        stamina={stamina}
        maxMonth={MAX_MONTHS}
        maxBalance={MAX_BALANCE}
        workDays={workDays}
        nextSalary={nextSalary}
      />
      
      <DailyChoices
        choices={todayChoices}
        onChoose={handleConfirmChoices}
        currentStamina={stamina}
      />
    </div>
  );
}
