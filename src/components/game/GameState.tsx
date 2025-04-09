"use client";

import { useState } from "react";

export type Choice = {
  category: string;
  label: string;
  amount: number;
  staminaEffect: number;
};

export type DailyRecord = {
  day: number;
  month: number;
  choices: Choice[];
  balanceBefore: number;
  balanceAfter: number;
  staminaBefore: number;
  staminaAfter: number;
};

export default function useGameState() {
  const MAX_MONTHS = 3;
  const DAYS_IN_MONTH = 30;
  const INITIAL_SALARY = 5000;
  const MAX_BALANCE = 5000;

  const [currentDay, setCurrentDay] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(1);
  const [balance, setBalance] = useState(INITIAL_SALARY);
  const [stamina, setStamina] = useState(100);
  const [history, setHistory] = useState<DailyRecord[]>([]);
  const [workDays, setWorkDays] = useState<number>(0);
  
  const calculateSalary = (daysWorked: number) => {
    if (daysWorked >= 20) return 5000;
    if (daysWorked >= 15) return 3750;
    if (daysWorked >= 10) return 2500;
    if (daysWorked >= 5) return 1250;
    return 0;
  };

  const resetWorkDays = () => setWorkDays(0);

  const resetGame = () => {
    setCurrentDay(1);
    setCurrentMonth(1);
    setBalance(INITIAL_SALARY);
    setStamina(100);
    setHistory([]);
  };

  return {
    MAX_MONTHS,
    DAYS_IN_MONTH,
    currentDay,
    currentMonth,
    balance,
    MAX_BALANCE,
    stamina,
    history,
    workDays,
    setWorkDays,
    calculateSalary,
    resetWorkDays,
    setCurrentDay,
    setCurrentMonth,
    setBalance,
    setStamina,
    setHistory,
    resetGame,
  };
}
