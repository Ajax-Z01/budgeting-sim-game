import { GameState, Character, Job, Choice, GameEvent } from "./GameTypes";

export const dailyOptions: Choice[] = [
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

export const initialCharacters: Character[] = [
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

export const initialJobs: Job[] = [
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

export const randomEvents: GameEvent[] = [
  {
    id: "event1",
    text: "Kamu mendapat traktiran makan siang dari teman lama.",
    autoEffect: (balance, stamina) => {
      return { balance: balance, stamina: stamina + 10 };
    },
  },
  {
    id: "event2",
    text: "Dompetmu tertinggal di angkot. Kamu kehilangan sebagian uang.",
    autoEffect: (balance, stamina) => {
      return { balance: balance - 200, stamina: stamina };
    },
  },
  {
    id: "event3",
    text: "Kamu menemukan dompet di jalan. Apa yang kamu lakukan?",
    choices: [
      {
        text: "Kembalikan ke pemiliknya",
        effect: (balance, stamina) => {
          return { balance: balance, stamina: stamina + 5 };
        },
      },
      {
        text: "Ambil uangnya",
        effect: (balance, stamina) => {
          return { balance: balance + 200, stamina: stamina - 5 };
        },
      },
    ],
  },
  {
    id: "event4",
    text: "Hujan deras membuatmu terlambat dan kehujanan.",
    autoEffect: (balance, stamina) => {
      return { balance: balance, stamina: stamina - 10 };
    },
  },
  {
    id: "event5",
    text: "Kamu memenangkan undian kecil dari minimarket!",
    autoEffect: (balance, stamina) => {
      return { balance: balance + 500, stamina: stamina };
    },
  },
  {
    id: "event6",
    text: "Kucing tetangga mencuri makananmu.",
    autoEffect: (balance, stamina) => {
      return { balance: balance - 100, stamina: stamina - 5 };
    },
  },
  {
    id: "event7",
    text: "Kamu mendapat pujian dari atasan atas kerja kerasmu.",
    autoEffect: (balance, stamina) => {
      return { balance: balance, stamina: stamina + 15 };
    },
  },
  {
    id: "event8",
    text: "Kamu harus memperbaiki ponsel yang jatuh dan rusak.",
    autoEffect: (balance, stamina) => {
      return { balance: balance - 500, stamina: stamina };
    },
  },
  {
    id: "event9",
    text: "Ada konser musik gratis di taman. Kamu ikut menonton.",
    autoEffect: (balance, stamina) => {
      return { balance: balance, stamina: stamina + 10 };
    },
  },
  {
    id: "event10",
    text: "Tiba-tiba listrik padam sepanjang malam. Tidurmu terganggu.",
    autoEffect: (balance, stamina) => {
      return { balance: balance, stamina: stamina - 10 };
    },
  },
];

export const initialState: GameState = {
  selectedCharacter: null,
  selectedCharacterGender: null,
  selectedJob: null,
  
  characters: initialCharacters,
  jobs: initialJobs,
  payNotifications: [],
  
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
  MAX_STAMINA: 100,
  nextSalary: 0,
  isGameOver: false,
  currentChoices: [],
  
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
  
  setSelectedCharacter: () => {},
  setSelectedCharacterGender: () => {},
  setSelectedJob: () => {},
  selectChoicesForToday: () => {},
  setCurrentDay: () => {},
  setCurrentMonth: () => {},
  setBalance: () => {},
  setStamina: () => {},
  setHistory: () => {},
  setWorkDays: () => {},
  setNextSalary: () => {},
  setTotalWorkDays: () => {},
  setGameOverReason: () => {},
  setIsGameOver: () => {},
  setPayNotification: () => {},
  setStaminaWarning: () => {},
  setBalanceWarning: () => {},
  addToHistory: () => {},
  resetWorkDays: () => {},
  calculateSalary: () => 0,
  consumeStamina: () => 0,
  regenerateStamina: () => 0,
  updateMaxBalance: () => {},
  clearNotifications: () => {},
  resetGame: () => {},
};
