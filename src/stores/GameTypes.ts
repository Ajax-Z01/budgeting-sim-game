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

export type GameOverReason = "balance" | "stamina" | null;

export type GameState = {
  currentDay: number;
  currentMonth: number;
  balance: number;
  stamina: number;
  history: DailyRecord[];
  workDays: number;
  totalWorkDays: number;
  gameOverReason: GameOverReason;
  payNotification: string | null;
  staminaWarning: string | null;
  balanceWarning: string | null;

  MAX_MONTHS: number;
  DAYS_IN_MONTH: number;
  MAX_BALANCE: number;

  nextSalary: number;
  isGameOver: boolean;
  
  currentChoices: Choice[];
  selectChoicesForToday: (choices: Choice[]) => void;

  setCurrentDay: (day: number) => void;
  setCurrentMonth: (month: number) => void;
  setBalance: (balance: number | ((prev: number) => number)) => void;
  setStamina: (stamina: number) => void;
  setHistory: (history: DailyRecord[]) => void;
  setWorkDays: (days: number) => void;
  setTotalWorkDays: (days: number) => void;
  setGameOverReason: (reason: GameOverReason) => void;
  setIsGameOver: (value: boolean) => void;
  setPayNotification: (msg: string | null) => void;
  setStaminaWarning: (msg: string | null) => void;
  setBalanceWarning: (msg: string | null) => void;

  addToHistory: (record: DailyRecord) => void;
  resetWorkDays: () => void;
  calculateSalary: (daysWorked: number) => number;
  updateMaxBalance: () => void;
  clearNotifications: () => void;
  resetGame: () => void;
};
