import { create } from "zustand";
import { GameState } from "./GameTypes";
import { initialState } from "./GameInitialState";
import { createGameActions } from "./GameActions";
import { createGameGetters } from "./GameGetters";

export const useGameStore = create<GameState>((set, get, store) => ({
  ...initialState,
  ...createGameActions(set, get, store),
  ...createGameGetters(set, get, store),
  setTotalWorkDays: (days: number) => set({ totalWorkDays: days }),
}));
