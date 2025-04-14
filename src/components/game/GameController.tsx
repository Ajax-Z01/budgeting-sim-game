"use client";

import { useEffect, useRef, useState } from "react";
import { useGameStore } from "@/stores/GameStore";
import { Choice, DailyRecord } from "@/stores/GameTypes";
import DailyChoices from "./elements/DailyChoices";
import GameOverScreen from "./screens/GameOverScreen";
import StatsPanel from "./StatsPanel";
import ToastNotification from "../ui/ToastNotification";
import GameFinishedScreen from "./screens/GameFinishedScreen";
import SoundEffect, { SoundEffectHandle } from "../sound/SoundEffect";

const dailyOptions: Choice[] = [
  { category: "Makan", label: "Masak sendiri", amount: 100, staminaEffect: 5 },
  { category: "Makan", label: "Makan di luar", amount: 300, staminaEffect: 10 },
  { category: "Transportasi", label: "Tidak keluar", amount: 0, staminaEffect: 0 },
  { category: "Transportasi", label: "Jalan kaki", amount: 0, staminaEffect: -10 },
  { category: "Transportasi", label: "Naik motor", amount: 100, staminaEffect: -5 },
  { category: "Transportasi", label: "Naik taksi", amount: 300, staminaEffect: 5 },
  { category: "Kegiatan", label: "Istirahat", amount: 0, staminaEffect: 30 },
  { category: "Kegiatan", label: "Belajar", amount: 0, staminaEffect: -10 },
  { category: "Kegiatan", label: "Bekerja", amount: 0, staminaEffect: -15 },
];

export default function GameController() {
  const {
    selectedCharacter,
    selectedJob,
    selectedCharacterGender,
    currentDay,
    currentMonth,
    MAX_MONTHS,
    DAYS_IN_MONTH,
    balance,
    MAX_BALANCE,
    stamina,
    history,
    workDays,
    nextSalary,
    isGameOver,
    gameOverReason,
    payNotification,
    staminaWarning,
    balanceWarning,
    getSelectedCharacter,
    setCurrentDay,
    setCurrentMonth,
    setBalance,
    setStamina,
    addToHistory,
    setWorkDays,
    setTotalWorkDays,
    calculateSalary,
    updateMaxBalance,
    resetWorkDays,
    setGameOverReason,
    clearNotifications,
    setPayNotification,
    setStaminaWarning,
    setBalanceWarning,
  } = useGameStore();

  const [todayChoices, setTodayChoices] = useState<Choice[]>([]);
  const warningAudioRef = useRef<SoundEffectHandle>(null);
  const salaryAudioRef = useRef<SoundEffectHandle>(null);
  
  console.log("selectedCharacterData", );

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
      useGameStore.getState().setIsGameOver(true);
      return;
    }

    if (newStamina <= 0) {
      setGameOverReason("stamina");
      useGameStore.getState().setIsGameOver(true);
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
    addToHistory(record);

    const workedToday = selectedChoices.some((choice) => choice.label === "Bekerja");
    if (workedToday) {
      setWorkDays(workDays + 1);
      useGameStore.getState().setTotalWorkDays(useGameStore.getState().totalWorkDays + 1);
    }

    if (currentDay >= DAYS_IN_MONTH) {
      const salary = calculateSalary(workDays);
      setBalance((prev: number) => prev + salary);
      updateMaxBalance();
      setPayNotification(`💼 Kamu menerima gaji sebesar $${salary}!`);
      resetWorkDays();
      setCurrentDay(1);
      setCurrentMonth(currentMonth + 1);
    } else {
      setCurrentDay(currentDay + 1);
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => clearNotifications(), 5000);
    return () => clearTimeout(timer);
  }, [payNotification, staminaWarning, balanceWarning]);
  
  useEffect(() => {
    if (payNotification) {
      salaryAudioRef.current?.play();
    }
  }, [payNotification]);
  
  useEffect(() => {
    if (staminaWarning) {
      warningAudioRef.current?.play();
    }
  }, [staminaWarning]);
  
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
        days_in_month={DAYS_IN_MONTH}
        balance={balance}
        stamina={stamina}
        maxMonth={MAX_MONTHS}
        maxBalance={MAX_BALANCE}
        workDays={workDays}
        nextSalary={nextSalary}
        gender={selectedCharacterGender}
      />

      <DailyChoices
        choices={todayChoices}
        onChoose={handleConfirmChoices}
        currentStamina={stamina}
      />
      <SoundEffect ref={warningAudioRef} src="/sounds/warning.mp3" />
      <SoundEffect ref={salaryAudioRef} src="/sounds/salary.mp3" />
    </div>
  );
}
