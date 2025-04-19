// ==== TYPES ====

export type Character = {
  id: string;
  name: string;
  description: string;
  staminaModifier: number;
  balanceModifier: number;
  staminaRegenModifier: number;
};

export type Job = {
  id: string;
  name: string;
  description: string;
  salaryModifier: number;
  staminaConsumptionModifier: number;
  specialAbility?: string;
  icon?: string;
};

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
  salary: number;
};

export type GameEvent = {
  id: string;
  text: string;
  autoEffect?: (balance: number, stamina: number) => { balance: number, stamina: number };
  choices?: {
    text: string;
    effect: (balance: number, stamina: number) => { balance: number, stamina: number };
  }[];
};


export type GameOverReason = "balance" | "stamina" | null;

// ==== GAME STATE ====

export type GameState = {
  // Selections
  selectedCharacter: Character | null;
  selectedJob: Job | null;
  selectedCharacterGender: 'male' | 'female' | null;

  // Data
  characters: Character[];
  jobs: Job[];
  payNotifications: string[];

  // Progress
  currentDay: number;
  currentMonth: number;
  balance: number;
  stamina: number;
  workDays: number;
  totalWorkDays: number;
  history: DailyRecord[];
  gameOverReason: GameOverReason;

  // Notifications
  payNotification: string | null;
  staminaWarning: string | null;
  balanceWarning: string | null;

  // Constants
  MAX_MONTHS: number;
  DAYS_IN_MONTH: number;
  MAX_BALANCE: number;
  MAX_STAMINA: number;

  // Derived state
  nextSalary: number;
  isGameOver: boolean;
  currentChoices: Choice[];

  // === Setters ===
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
  setSelectedCharacter: (id: string) => void;
  setSelectedJob: (id: string) => void;
  setSelectedCharacterGender: (gender: 'male' | 'female') => void;
  setNextSalary: (salary: number) => void;

  // === Game Logic ===
  selectChoicesForToday: (choices: Choice[]) => void;
  addToHistory: (record: DailyRecord) => void;
  resetWorkDays: () => void;
  calculateSalary: (daysWorked: number) => number;
  consumeStamina: (amount: number) => number;
  regenerateStamina: (amount: number) => number;
  updateMaxBalance: () => void;
  clearNotifications: () => void;
  usedEventIdsThisMonth: string[];
  addUsedEventId: (id: string) => void;
  resetUsedEventIds: () => void;
  resetGame: () => void;

  // === Getters & Utilities ===
  getCurrentCharacter: () => Character | null;
  getCurrentJob: () => Job | null;
  applySpecialAbility: () => void;
  initializeGameWithChoices: () => void;
  getSelectedCharacter: () => Character | null;
  getSelectedJob: () => Job | null;
  getCharacterEffectsDescription: () => string[] | null;
  getJobEffectsDescription: () => string[] | null;
  checkIsGameOver: () => boolean;
  getNextSalary: () => number;
  hasGameStarted: () => boolean;
};
