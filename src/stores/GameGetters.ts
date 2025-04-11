import { StateCreator } from "zustand";
import { GameState } from "./GameTypes";

export const createGameGetters: StateCreator<GameState, [], [], Partial<GameState>> = (_, get) => ({
  getNextSalary: () => {
    const calculateSalary = get().calculateSalary;
    if (typeof calculateSalary !== "function") return 0;
    return calculateSalary(get().workDays);
  },
  checkIsGameOver: () => {
    return get().gameOverReason !== null;
  },
});
