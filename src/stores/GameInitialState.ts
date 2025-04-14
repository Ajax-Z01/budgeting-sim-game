import { GameState, Character, Job } from "./GameTypes";

const initialCharacters: Character[] = [
  {
    id: 'hardWorker',
    name: 'Pekerja Keras',
    description: 'Stamina awal lebih tinggi, balance awal lebih rendah',
    staminaModifier: 1.2,
    balanceModifier: 0.9,
    staminaRegenModifier: 1.0
  },
  {
    id: 'saver',
    name: 'Hemat',
    description: 'Balance awal lebih tinggi',
    staminaModifier: 1.0,
    balanceModifier: 1.2,
    staminaRegenModifier: 1.0
  },
  {
    id: 'balanced',
    name: 'Seimbang',
    description: 'Stamina dan balance standar',
    staminaModifier: 1.0,
    balanceModifier: 1.0,
    staminaRegenModifier: 1.0
  },
  {
    id: 'financial',
    name: 'Ahli Keuangan',
    description: 'Bonus gaji +10%, stamina sedikit lebih rendah',
    staminaModifier: 0.95,
    balanceModifier: 1.0,
    staminaRegenModifier: 1.0
  },
  {
    id: 'athlete',
    name: 'Atlet',
    description: 'Regenerasi stamina lebih cepat, balance awal lebih rendah',
    staminaModifier: 1.0,
    balanceModifier: 0.85,
    staminaRegenModifier: 1.3
  }
];

const initialJobs: Job[] = [
  {
    id: 'office',
    name: 'Kantoran',
    description: 'Gaji standard, konsumsi stamina sedang',
    salaryModifier: 1.0,
    staminaConsumptionModifier: 1.0
  },
  {
    id: 'labor',
    name: 'Buruh',
    description: 'Gaji lebih rendah, konsumsi stamina tinggi',
    salaryModifier: 0.85,
    staminaConsumptionModifier: 1.3,
    specialAbility: 'Bonus lembur di akhir minggu'
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    description: 'Gaji bervariasi, konsumsi stamina rendah',
    salaryModifier: 1.1,
    staminaConsumptionModifier: 0.8,
    specialAbility: 'Kesempatan mendapat proyek besar'
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Gaji tinggi, konsumsi stamina sedang-tinggi',
    salaryModifier: 1.25,
    staminaConsumptionModifier: 1.15,
  },
  {
    id: 'waiter',
    name: 'Pelayan',
    description: 'Gaji rendah, konsumsi stamina sedang, kesempatan tip',
    salaryModifier: 0.8,
    staminaConsumptionModifier: 1.0,
    specialAbility: 'Kesempatan mendapat tip dari pelanggan'
  }
];

export const initialState: GameState = {
  selectedCharacter: null,
  selectedCharacterGender: 'male',
  selectedJob: null,
  
  characters: initialCharacters,
  jobs: initialJobs,
  
  currentDay: 1,
  currentMonth: 1,
  balance: 5000,
  stamina: 100,
  history: [],
  workDays: 0,
  totalWorkDays: 0,
  gameOverReason: null,
  payNotification: null,
  staminaWarning: null,
  balanceWarning: null,
  MAX_MONTHS: 3,
  DAYS_IN_MONTH: 30,
  MAX_BALANCE: 5000,
  nextSalary: 0,
  isGameOver: false,
  currentChoices: [],
  
  setSelectedCharacter: () => {},
  setSelectedCharacterGender: () => {},
  setSelectedJob: () => {},
  getCurrentCharacter: () => null,
  getCurrentJob: () => null,
  applySpecialAbility: () => {},
  initializeGameWithChoices: () => {},
  getSelectedCharacter: () => null,
  getSelectedJob: () => null,
  getCharacterEffectsDescription: () => null,
  getJobEffectsDescription: () => null,
  checkIsGameOver: () => false,
  getNextSalary: () => 0,
  hasGameStarted: () => false,
  
  selectChoicesForToday: () => {},
  setCurrentDay: () => {},
  setCurrentMonth: () => {},
  setBalance: () => {},
  setStamina: () => {},
  setHistory: () => {},
  setWorkDays: () => {},
  setTotalWorkDays: () => {},
  setGameOverReason: () => {},
  setIsGameOver: () => {},
  setPayNotification: () => {},
  setStaminaWarning: () => {},
  setBalanceWarning: () => {},
  addToHistory: () => {},
  resetWorkDays: () => {},
  calculateSalary: () => 0,
  updateMaxBalance: () => {},
  clearNotifications: () => {},
  resetGame: () => {},
};
