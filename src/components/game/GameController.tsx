"use client";

import { useEffect, useRef, useState } from "react";
import { useGameStore } from "@/stores/GameStore";
import { Choice, DailyRecord, GameEvent } from "@/stores/GameTypes";
import DailyChoices from "./elements/DailyChoices";
import GameOverScreen from "./screens/GameOverScreen";
import StatsPanel from "./StatsPanel";
import ToastNotification from "../ui/ToastNotification";
import GameFinishedScreen from "./screens/GameFinishedScreen";
import SoundEffect, { SoundEffectHandle } from "../sound/SoundEffect";
import { dailyOptions, randomEvents } from "@/stores/GameInitialState";
import RandomEvent from "./elements/RandomEvent";

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
    MAX_STAMINA,
    stamina,
    workDays,
    isGameOver,
    gameOverReason,
    payNotification,
    staminaWarning,
    balanceWarning,
    payNotifications,
    nextSalary,
    usedEventIdsThisMonth,
    consumeStamina,
    regenerateStamina,
    getNextSalary,
    setCurrentDay,
    setCurrentMonth,
    setBalance,
    setStamina,
    addToHistory,
    setWorkDays,
    setNextSalary,
    updateMaxBalance,
    resetWorkDays,
    setGameOverReason,
    clearNotifications,
    setPayNotification,
    setStaminaWarning,
    setBalanceWarning,
    applySpecialAbility,
    resetUsedEventIds,
  } = useGameStore();

  const [todayChoices, setTodayChoices] = useState<Choice[]>([]);
  const [todayEvent, setTodayEvent] = useState<GameEvent | null>(null);
  const warningAudioRef = useRef<SoundEffectHandle>(null);
  const salaryAudioRef = useRef<SoundEffectHandle>(null);
  
  const availableEvents = randomEvents.filter(
    (event) => !usedEventIdsThisMonth.includes(event.id)
  );
  
  const handleEventComplete = () => {
    setTodayEvent(null);
  };

  const handleConfirmChoices = (selectedChoices: Choice[]) => {
    const totalCost = selectedChoices.reduce((sum, choice) => sum + choice.amount, 0);
    const newBalance = balance - totalCost;
    let newStamina = stamina;

    selectedChoices.forEach((choice) => {
      if (choice.staminaEffect < 0) {
        const used = consumeStamina(Math.abs(choice.staminaEffect));
        newStamina -= used;
      } else if (choice.staminaEffect > 0) {
        const gained = regenerateStamina(choice.staminaEffect);
        newStamina += gained;
      }
    });

    newStamina = Math.max(0, Math.min(MAX_STAMINA, newStamina));
    const staminaThreshold = 0.3;
    const balanceThreshold = 0.2;

    const staminaPercentage = newStamina / MAX_STAMINA;
    const balancePercentage = newBalance / MAX_BALANCE;

    if (staminaPercentage <= staminaThreshold && newStamina > 0) {
      setStaminaWarning("⚠️ Stamina kamu rendah, pertimbangkan untuk istirahat besok.");
    } else if (newStamina === 0) {
      setStaminaWarning("❌ Stamina habis! Kamu harus istirahat untuk bisa melanjutkan hari.");
    } else {
      setStaminaWarning(null);
    }
    
    if (balancePercentage < balanceThreshold) {
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
      salary: getNextSalary(),
    };

    setBalance(newBalance);
    setStamina(newStamina);
    addToHistory(record);
    
    const workedToday = selectedChoices.some((choice) => choice.label === "Bekerja");
    if (workedToday) {
      setWorkDays(workDays + 1);
      useGameStore.getState().setTotalWorkDays(useGameStore.getState().totalWorkDays + 1);
      const updatedSalary = getNextSalary();
      setNextSalary(updatedSalary);
      applySpecialAbility();
    }
    
    if (availableEvents.length > 0) {
      const randomEvent =
        availableEvents[Math.floor(Math.random() * availableEvents.length)];
      setTodayEvent(randomEvent);
      useGameStore.getState().addUsedEventId(randomEvent.id);
    } else {
      setTodayEvent(null);
    }

    if (currentDay >= DAYS_IN_MONTH) {
      const salary = getNextSalary();
      setBalance((prev: number) => prev + salary);
      updateMaxBalance();
      setPayNotification(`💼 Kamu menerima gaji sebesar $${salary}!`);
      resetWorkDays();
      setCurrentDay(1);
      setCurrentMonth(currentMonth + 1);
      resetUsedEventIds();
    } else {
      setCurrentDay(currentDay + 1);
    }
  };
  
  useEffect(() => {
    const categories = Array.from(new Set(dailyOptions.map((opt) => opt.category)));
    const today: Choice[] = categories.flatMap((cat) =>
      dailyOptions.filter((opt) => opt.category === cat)
    );
  
    const updatedChoices = today.map((choice) => {
      let staminaEffect = choice.staminaEffect;
  
      if (selectedCharacter) {
        staminaEffect *= selectedCharacter.staminaModifier;
      }
  
      if (selectedJob) {
        staminaEffect *= selectedJob.staminaConsumptionModifier;
      }
      
      staminaEffect = parseFloat(staminaEffect.toFixed(2));
  
      return {
        ...choice,
        staminaEffect,
      };
    });
  
    setTodayChoices(updatedChoices);
  }, [currentDay, selectedCharacter, selectedJob]);
  
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
        {payNotifications.slice(-10).map((msg, idx) => (
          <ToastNotification key={idx} message={`💼 ${msg}`} type="success" />
        ))}
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
        maxStamina={MAX_STAMINA}
        workDays={workDays}
        nextSalary={nextSalary}
        gender={selectedCharacterGender}
        selectedCharacter={selectedCharacter}
        selectedJob={selectedJob}
      />
  
      {todayEvent ? (
        <div className="mt-4">
          <RandomEvent event={todayEvent} onEventComplete={handleEventComplete} maxStamina={MAX_STAMINA}/>
        </div>
      ) : (
        <DailyChoices
          choices={todayChoices}
          onChoose={handleConfirmChoices}
          currentStamina={stamina}
        />
      )}
  
      <SoundEffect ref={warningAudioRef} src="/sounds/warning.mp3" />
      <SoundEffect ref={salaryAudioRef} src="/sounds/salary.mp3" />
    </div>
  );  
}
