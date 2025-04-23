import QuickMath from "@/components/minigame/QuickMath";
import { GameState, Character, Job, Choice, GameEvent } from "./GameTypes";
import GuessNumber from "@/components/minigame/GuessNumberGame";
import BasketballGame from "@/components/minigame/BasketballGame";

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
      return { balance: balance, stamina: stamina + 20 };
    },
  },
  {
    id: "event2",
    text: "Dompetmu tertinggal di angkot. Kamu kehilangan sebagian uang.",
    autoEffect: (balance, stamina) => {
      return { balance: balance - 500, stamina: stamina };
    },
  },
  {
    id: "event3",
    text: "Kamu menemukan dompet di jalan. Apa yang kamu lakukan?",
    choices: [
      {
        text: "Kembalikan ke pemiliknya",
        effect: (balance, stamina) => {
          return { balance: balance + 50, stamina: stamina + 10 };
        },
      },
      {
        text: "Ambil uangnya",
        effect: (balance, stamina) => {
          return { balance: balance + 500, stamina: stamina - 10 };
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
      return { balance: balance + 300, stamina: stamina };
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
      return { balance: balance - 200, stamina: stamina };
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
  {
    id: "event11",
    text: "Temanmu mengajakmu ikut lomba desain poster berhadiah.",
    choices: [
      {
        text: "Ikut dan habiskan waktu membuat desain",
        effect: (balance, stamina) => ({ balance: balance + 300, stamina: stamina - 10 }),
      },
      {
        text: "Tolak, fokus pada pekerjaan rutin",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event12",
    text: "Sepatumu rusak saat perjalanan.",
    autoEffect: (balance, stamina) => ({ balance: balance - 150, stamina }),
  },
  {
    id: "event13",
    text: "Kamu mendapat tugas freelance tak terduga.",
    choices: [
      {
        text: "Ambil dan lembur semalaman",
        effect: (balance, stamina) => ({ balance: balance + 400, stamina: stamina - 15 }),
      },
      {
        text: "Tolak demi kesehatan",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event14",
    text: "Kamu menghadiri seminar gratis tentang keuangan.",
    autoEffect: (balance, stamina) => ({ balance, stamina: stamina + 5 }),
  },
  {
    id: "event15",
    text: "Kerabatmu pinjam uang untuk kebutuhan mendesak.",
    choices: [
      {
        text: "Pinjamkan uang",
        effect: (balance, stamina) => ({ balance: balance - 300, stamina }),
      },
      {
        text: "Tolak dengan sopan",
        effect: (balance, stamina) => ({ balance, stamina: stamina - 5 }),
      },
    ],
  },
  {
    id: "event16",
    text: "Kamu mendapat potongan harga saat belanja bulanan.",
    autoEffect: (balance, stamina) => ({ balance: balance + 100, stamina }),
  },
  {
    id: "event17",
    text: "Kamu ikut aksi bersih-bersih lingkungan hari ini.",
    autoEffect: (balance, stamina) => ({ balance, stamina: stamina - 5 }),
  },
  {
    id: "event18",
    text: "Paket makananmu salah kirim. Kamu dapat dua kali lipat!",
    autoEffect: (balance, stamina) => ({ balance, stamina: stamina + 10 }),
  },
  {
    id: "event19",
    text: "Temanmu mengajak staycation dadakan.",
    choices: [
      {
        text: "Ikut dan refreshing",
        effect: (balance, stamina) => ({ balance: balance - 300, stamina: stamina + 20 }),
      },
      {
        text: "Tolak dan hemat",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event20",
    text: "Kamu lupa membawa bekal, harus beli makan di luar.",
    autoEffect: (balance, stamina) => ({ balance: balance - 50, stamina }),
  },
  {
    id: "event21",
    text: "Kamu mendapat panggilan wawancara kerja untuk posisi yang lebih baik.",
    choices: [
      {
        text: "Datang dan persiapkan diri",
        effect: (balance, stamina) => ({ balance, stamina: stamina - 10 }),
      },
      {
        text: "Abaikan, tetap fokus di pekerjaan saat ini",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event22",
    text: "Temanmu meminta bantuan pinjaman uang.",
    choices: [
      {
        text: "Bantu pinjamkan 300",
        effect: (balance, stamina) => ({ balance: balance - 300, stamina }),
      },
      {
        text: "Tolak dengan sopan",
        effect: (balance, stamina) => ({ balance, stamina: stamina - 5 }),
      },
    ],
  },
  {
    id: "event23",
    text: "Kamu melihat promo kursus online dengan diskon besar.",
    choices: [
      {
        text: "Ambil kursus untuk upgrade skill",
        effect: (balance, stamina) => ({ balance: balance - 250, stamina: stamina - 5 }),
      },
      {
        text: "Tunda dulu, fokus hal lain",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event24",
    text: "Kamu ditawari proyek freelance kecil.",
    choices: [
      {
        text: "Ambil meskipun waktu istirahat berkurang",
        effect: (balance, stamina) => ({ balance: balance + 200, stamina: stamina - 10 }),
      },
      {
        text: "Tolak karena sudah lelah",
        effect: (balance, stamina) => ({ balance, stamina: stamina + 5 }),
      },
    ],
  },
  {
    id: "event25",
    text: "Kamu tertarik beli gadget baru yang kamu incar.",
    choices: [
      {
        text: "Beli sekarang juga",
        effect: (balance, stamina) => ({ balance: balance - 300, stamina: stamina + 25 }),
      },
      {
        text: "Tunda dulu, belum perlu banget",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event26",
    text: "Teman ngajak hangout ke luar kota.",
    choices: [
      {
        text: "Ikut, refreshing sejenak",
        effect: (balance, stamina) => ({ balance: balance - 400, stamina: stamina + 25 }),
      },
      {
        text: "Tolak, hemat dulu",
        effect: (balance, stamina) => ({ balance, stamina: stamina - 5 }),
      },
    ],
  },
  {
    id: "event27",
    text: "Kamu ikut lomba menulis blog berhadiah.",
    choices: [
      {
        text: "Luangkan waktu untuk ikut",
        effect: (balance, stamina) => ({ balance, stamina: stamina - 10 }),
      },
      {
        text: "Lewatkan, terlalu sibuk",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event28",
    text: "Kamu menemukan voucher diskon belanja 50%.",
    choices: [
      {
        text: "Gunakan dan belanja hemat",
        effect: (balance, stamina) => ({ balance: balance - 150, stamina: stamina + 5 }),
      },
      {
        text: "Abaikan, tidak perlu belanja sekarang",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event29",
    text: "Terdapat tawaran ikut pelatihan fisik gratis.",
    choices: [
      {
        text: "Ikut untuk jaga stamina",
        effect: (balance, stamina) => ({ balance, stamina: stamina + 10 }),
      },
      {
        text: "Tidak ikut, tidak ada waktu",
        effect: (balance, stamina) => ({ balance, stamina: stamina - 5 }),
      },
    ],
  },
  {
    id: "event30",
    text: "Kamu ditawari kerja shift malam dengan bayaran lebih tinggi.",
    choices: [
      {
        text: "Ambil kerja malam",
        effect: (balance, stamina) => ({ balance: balance + 500, stamina: stamina - 15 }),
      },
      {
        text: "Tolak demi kesehatan",
        effect: (balance, stamina) => ({ balance, stamina: stamina + 5 }),
      },
    ],
  },
  {
    id: "math-event-1",
    text: "Kamu menemukan dompet berisi uang. Untuk membukanya, kamu harus menjawab teka-teki cepat!",
    autoEffect: (balance, stamina) => ({
      balance: balance + 100,
      stamina: stamina - 10,
    }),
    miniGame: QuickMath,
  },
  {
    id: "guess-number-event-1",
    text: "Kamu menemukan sebuah kotak misterius. Untuk membukanya, kamu harus menebak angka yang tersembunyi di dalam kotak!",
    autoEffect: (balance, stamina) => ({
      balance: balance + 100,
      stamina: stamina - 10,
    }),
    miniGame: GuessNumber,
  },
  {
    id: "basketball-event-1",
    text: "Ada lomba lempar bola basket berhadiah! Coba keberuntunganmu dengan satu kali lemparan!",
    autoEffect: (balance, stamina) => ({
      balance: balance + 100,
      stamina: stamina - 10,
    }),
    miniGame: BasketballGame,
  }  
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
  isGameFinish: false,
  currentChoices: [],
  previousChoices: [],
  
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
  setPreviousChoices: () => {},
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
  setIsGameFinish: () => {},
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
  usedEventIdsThisMonth: [],
  addUsedEventId: () => {},
  resetUsedEventIds: () => {},
  resetGame: () => {},
};
