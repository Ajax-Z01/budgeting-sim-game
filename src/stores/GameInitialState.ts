import QuickMath from "@/components/minigame/QuickMath";
import { GameState, Character, Job, Choice, GameEvent } from "./GameTypes";
import GuessNumber from "@/components/minigame/GuessNumberGame";
import BasketballGame from "@/components/minigame/BasketballGame";

export const dailyOptions: Choice[] = [
  { category: "Food", label: "Cook at home", amount: 100, staminaEffect: 5 },
  { category: "Food", label: "Eat out", amount: 300, staminaEffect: 10 },
  { category: "Transport", label: "Stay at home", amount: 0, staminaEffect: 0 },
  { category: "Transport", label: "Walk", amount: 0, staminaEffect: -10 },
  { category: "Transport", label: "Ride bike", amount: 100, staminaEffect: -5 },
  { category: "Transport", label: "Take taxi", amount: 300, staminaEffect: 5 },
  { category: "Activity", label: "Rest", amount: 0, staminaEffect: 30 },
  { category: "Activity", label: "Work", amount: 0, staminaEffect: -15 },
];

export const initialCharacters: Character[] = [
  {
    id: 'hardWorker',
    name: 'Hard Worker',
    description: 'Higher starting stamina, lower starting balance',
    staminaModifier: 1.2,
    balanceModifier: 0.9,
    staminaRegenModifier: 1.0
  },
  {
    id: 'saver',
    name: 'Frugal',
    description: 'Higher starting balance',
    staminaModifier: 1.0,
    balanceModifier: 1.2,
    staminaRegenModifier: 1.0
  },
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Standard stamina and balance',
    staminaModifier: 1.0,
    balanceModifier: 1.0,
    staminaRegenModifier: 1.0
  },
  {
    id: 'financial',
    name: 'Financial Expert',
    description: '10% salary bonus, slightly lower stamina',
    staminaModifier: 0.95,
    balanceModifier: 1.0,
    staminaRegenModifier: 1.0
  },
  {
    id: 'athlete',
    name: 'Athlete',
    description: 'Faster stamina regeneration, lower starting balance',
    staminaModifier: 1.0,
    balanceModifier: 0.85,
    staminaRegenModifier: 1.3
  }
];

export const initialJobs: Job[] = [
  {
    id: 'office',
    name: 'Office Worker',
    description: 'Standard salary, medium stamina consumption',
    salaryModifier: 1.0,
    staminaConsumptionModifier: 1.0
  },
  {
    id: 'labor',
    name: 'Laborer',
    description: 'Lower salary, high stamina consumption',
    salaryModifier: 0.85,
    staminaConsumptionModifier: 1.3,
    specialAbility: 'Overtime bonus at the end of the week'
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    description: 'Variable salary, low stamina consumption',
    salaryModifier: 1.1,
    staminaConsumptionModifier: 0.8,
    specialAbility: 'Chance to land a big project'
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'High salary, medium to high stamina consumption',
    salaryModifier: 1.25,
    staminaConsumptionModifier: 1.15,
  },
  {
    id: 'waiter',
    name: 'Waiter',
    description: 'Low salary, medium stamina consumption, chance for tips',
    salaryModifier: 0.8,
    staminaConsumptionModifier: 1.0,
    specialAbility: 'Chance to receive tips from customers'
  }
];

export const randomEvents: GameEvent[] = [
  {
    id: "event1",
    text: "You got treated to lunch by an old friend.",
    autoEffect: (balance, stamina) => {
      return { balance: balance, stamina: stamina + 20 };
    },
  },
  {
    id: "event2",
    text: "You left your wallet in public transport. You lost some money.",
    autoEffect: (balance, stamina) => {
      return { balance: balance - 500, stamina: stamina };
    },
  },
  {
    id: "event3",
    text: "You found a wallet on the street. What do you do?",
    choices: [
      {
        text: "Return it to the owner",
        effect: (balance, stamina) => {
          return { balance: balance + 50, stamina: stamina + 10 };
        },
      },
      {
        text: "Take the money",
        effect: (balance, stamina) => {
          return { balance: balance + 500, stamina: stamina - 10 };
        },
      },
    ],
  },
  {
    id: "event4",
    text: "Heavy rain made you late and drenched.",
    autoEffect: (balance, stamina) => {
      return { balance: balance, stamina: stamina - 10 };
    },
  },
  {
    id: "event5",
    text: "You won a small raffle at the convenience store!",
    autoEffect: (balance, stamina) => {
      return { balance: balance + 300, stamina: stamina };
    },
  },
  {
    id: "event6",
    text: "Your neighbor's cat stole your food.",
    autoEffect: (balance, stamina) => {
      return { balance: balance - 100, stamina: stamina - 5 };
    },
  },
  {
    id: "event7",
    text: "You received praise from your boss for your hard work.",
    autoEffect: (balance, stamina) => {
      return { balance: balance, stamina: stamina + 15 };
    },
  },
  {
    id: "event8",
    text: "You had to repair your phone that fell and broke.",
    autoEffect: (balance, stamina) => {
      return { balance: balance - 200, stamina: stamina };
    },
  },
  {
    id: "event9",
    text: "There was a free music concert at the park. You went to watch.",
    autoEffect: (balance, stamina) => {
      return { balance: balance, stamina: stamina + 10 };
    },
  },
  {
    id: "event10",
    text: "Suddenly, a power outage lasted all night. Your sleep was disrupted.",
    autoEffect: (balance, stamina) => {
      return { balance: balance, stamina: stamina - 10 };
    },
  },
  {
    id: "event11",
    text: "Your friend invites you to join a poster design competition with prizes.",
    choices: [
      {
        text: "Join and spend time designing",
        effect: (balance, stamina) => ({ balance: balance + 300, stamina: stamina - 10 }),
      },
      {
        text: "Decline, focus on routine work",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event12",
    text: "Your shoes broke during your trip.",
    autoEffect: (balance, stamina) => ({ balance: balance - 150, stamina }),
  },
  {
    id: "event13",
    text: "You received an unexpected freelance job.",
    choices: [
      {
        text: "Accept and work overnight",
        effect: (balance, stamina) => ({ balance: balance + 400, stamina: stamina - 15 }),
      },
      {
        text: "Decline for the sake of your health",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event14",
    text: "You attended a free seminar about personal finance.",
    autoEffect: (balance, stamina) => ({ balance, stamina: stamina + 5 }),
  },
  {
    id: "event15",
    text: "A relative asks to borrow money for an urgent need.",
    choices: [
      {
        text: "Lend the money",
        effect: (balance, stamina) => ({ balance: balance - 300, stamina }),
      },
      {
        text: "Politely decline",
        effect: (balance, stamina) => ({ balance, stamina: stamina - 5 }),
      },
    ],
  },
  {
    id: "event16",
    text: "You received a discount during your monthly shopping.",
    autoEffect: (balance, stamina) => ({ balance: balance + 100, stamina }),
  },
  {
    id: "event17",
    text: "You're invited to join a neighborhood clean-up activity today.",
    choices: [
      {
        text: "Join the activity",
        effect: (balance, stamina) => ({ balance, stamina: stamina - 5 }),
      },
      {
        text: "Decline because you're tired",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event18",
    text: "Your food delivery was sent incorrectly. You got twice the amount!",
    autoEffect: (balance, stamina) => ({ balance, stamina: stamina + 10 }),
  },
  {
    id: "event19",
    text: "Your friend invites you on a spontaneous staycation.",
    choices: [
      {
        text: "Join and refresh yourself",
        effect: (balance, stamina) => ({ balance: balance - 300, stamina: stamina + 20 }),
      },
      {
        text: "Decline and save money",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event20",
    text: "You forgot to bring lunch, so you had to buy food outside.",
    autoEffect: (balance, stamina) => ({ balance: balance - 50, stamina }),
  },  
  {
    id: "event21",
    text: "You got a job interview for a better position.",
    choices: [
      {
        text: "Attend and prepare well",
        effect: (balance, stamina) => ({ balance, stamina: stamina - 10 }),
      },
      {
        text: "Ignore and stay focused on current job",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event22",
    text: "Your friend asks to borrow some money.",
    choices: [
      {
        text: "Lend 300",
        effect: (balance, stamina) => ({ balance: balance - 300, stamina }),
      },
      {
        text: "Politely refuse",
        effect: (balance, stamina) => ({ balance, stamina: stamina - 5 }),
      },
    ],
  },
  {
    id: "event23",
    text: "You see a heavily discounted online course.",
    choices: [
      {
        text: "Take the course to upgrade skills",
        effect: (balance, stamina) => ({ balance: balance - 250, stamina: stamina - 5 }),
      },
      {
        text: "Postpone, focus on other things",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event24",
    text: "You’re offered a small freelance project.",
    choices: [
      {
        text: "Take it even with less rest time",
        effect: (balance, stamina) => ({ balance: balance + 200, stamina: stamina - 10 }),
      },
      {
        text: "Refuse because you're tired",
        effect: (balance, stamina) => ({ balance, stamina: stamina + 5 }),
      },
    ],
  },
  {
    id: "event25",
    text: "You're tempted to buy a new gadget you've been eyeing.",
    choices: [
      {
        text: "Buy it now",
        effect: (balance, stamina) => ({ balance: balance - 300, stamina: stamina + 25 }),
      },
      {
        text: "Wait, it's not urgent",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event26",
    text: "A friend invites you for an out-of-town hangout.",
    choices: [
      {
        text: "Join for a short refresh",
        effect: (balance, stamina) => ({ balance: balance - 400, stamina: stamina + 25 }),
      },
      {
        text: "Decline to save money",
        effect: (balance, stamina) => ({ balance, stamina: stamina - 5 }),
      },
    ],
  },
  {
    id: "event27",
    text: "You join a blog writing competition with prizes.",
    choices: [
      {
        text: "Make time to join",
        effect: (balance, stamina) => ({ balance, stamina: stamina - 10 }),
      },
      {
        text: "Skip, too busy",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event28",
    text: "You found a 50% shopping discount voucher.",
    choices: [
      {
        text: "Use it for smart shopping",
        effect: (balance, stamina) => ({ balance: balance - 150, stamina: stamina + 5 }),
      },
      {
        text: "Ignore it, no need to shop now",
        effect: (balance, stamina) => ({ balance, stamina }),
      },
    ],
  },
  {
    id: "event29",
    text: "You’re offered a free physical training session.",
    choices: [
      {
        text: "Join to boost stamina",
        effect: (balance, stamina) => ({ balance, stamina: stamina + 10 }),
      },
      {
        text: "Skip, no time",
        effect: (balance, stamina) => ({ balance, stamina: stamina - 5 }),
      },
    ],
  },
  {
    id: "event30",
    text: "You’re offered a night shift job with higher pay.",
    choices: [
      {
        text: "Take the night shift",
        effect: (balance, stamina) => ({ balance: balance + 500, stamina: stamina - 15 }),
      },
      {
        text: "Decline for health reasons",
        effect: (balance, stamina) => ({ balance, stamina: stamina + 5 }),
      },
    ],
  },  
  {
    id: "math-event-1",
    text: "You found a wallet full of money. To open it, you must solve a quick puzzle!",
    autoEffect: (balance, stamina) => ({
      balance: balance + 100,
      stamina: stamina - 10,
    }),
    miniGame: QuickMath,
  },
  {
    id: "guess-number-event-1",
    text: "You found a mysterious box. To open it, you must guess the hidden number inside!",
    autoEffect: (balance, stamina) => ({
      balance: balance + 100,
      stamina: stamina - 10,
    }),
    miniGame: GuessNumber,
  },
  {
    id: "basketball-event-1",
    text: "There's a basketball throwing competition with a prize! Try your luck with a single throw!",
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
