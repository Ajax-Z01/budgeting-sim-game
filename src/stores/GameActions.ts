import { StateCreator } from "zustand";
import { GameState } from "./GameTypes";

export const createGameActions: StateCreator<GameState, [], [], Partial<GameState>> = (set, get) => ({
  setCurrentDay: (day) => set({ currentDay: day }),
  setCurrentMonth: (month) => set({ currentMonth: month }),
  setBalance: (balance) =>
    typeof balance === "function"
      ? set((state) => ({ balance: balance(state.balance) }))
      : set({ balance }),
  setStamina: (stamina) => set({ stamina }),
  setHistory: (history) => set({ history }),
  setWorkDays: (days) => set({ workDays: days }),
  setGameOverReason: (reason) => set({ gameOverReason: reason }),
  setPayNotification: (msg) => set({ payNotification: msg }),
  setStaminaWarning: (msg) => set({ staminaWarning: msg }),
  setBalanceWarning: (msg) => set({ balanceWarning: msg }),
  setIsGameOver: (value: boolean) => set({ isGameOver: value }),

  addToHistory: (record) =>
    set((state) => ({
      history: [...state.history, record],
    })),

  resetWorkDays: () => set({ workDays: 0 }),

  calculateSalary: (daysWorked) => {
    return daysWorked * 200;
  },

  updateMaxBalance: () => {
    const { balance, MAX_BALANCE } = get();
    if (balance > MAX_BALANCE) {
      set({ MAX_BALANCE: balance });
    }
  },

  clearNotifications: () =>
    set({
      payNotification: null,
      staminaWarning: null,
      balanceWarning: null,
    }),

  resetGame: () =>
    set({
      ...get(),
      currentDay: 1,
      currentMonth: 1,
      balance: 5000,
      stamina: 100,
      history: [],
      workDays: 0,
      gameOverReason: null,
      payNotification: null,
      staminaWarning: null,
      balanceWarning: null,
    }),
});
