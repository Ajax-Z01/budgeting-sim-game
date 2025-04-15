import { StateCreator } from "zustand";
import { GameState } from "./GameTypes";
import { initialCharacters, initialJobs } from "./GameInitialState";

export const createGameActions: StateCreator<GameState, [], [], Partial<GameState>> = (set, get) => ({
  selectedCharacter: null,
  selectedJob: null,
  setSelectedCharacter: (id: string) => set((state) => {
    const character = initialCharacters.find(c => c.id === id) || null;
    return { selectedCharacter: character };
  }),
  setSelectedJob: (id: string) => set((state) => {
    const job = initialJobs.find(j => j.id === id) || null;
    return { selectedJob: job };
  }),
  setSelectedCharacterGender: (gender: 'male' | 'female') => set({ selectedCharacterGender: gender }),
  setCurrentDay: (day) => set({ currentDay: day }),
  setCurrentMonth: (month) => set({ currentMonth: month }),
  setBalance: (balance) =>
    typeof balance === "function"
      ? set((state) => ({ balance: balance(state.balance) }))
      : set({ balance }),
  setStamina: (stamina) => set({ stamina }),
  setHistory: (history) => set({ history }),
  setWorkDays: (days) => set({ workDays: days }),
  setTotalWorkDays: (days) => set({ totalWorkDays: days }),
  setNextSalary: (salary) => set({ nextSalary: salary }),
  setGameOverReason: (reason) => set({ gameOverReason: reason }),
  setPayNotification: (msg) => set({ payNotification: msg }),
  setStaminaWarning: (msg) => set({ staminaWarning: msg }),
  setBalanceWarning: (msg) => set({ balanceWarning: msg }),
  setIsGameOver: (value: boolean) => set({ isGameOver: value }),
  
  initializeGameWithChoices: () => {
    const { getCurrentCharacter, getCurrentJob } = get();
    const character = getCurrentCharacter();
    const job = getCurrentJob();
    
    if (!character || !job) return;
    
    const baseStamina = 100;
    const baseBalance = 5000;
    
    set({
      stamina: Math.round(baseStamina * character.staminaModifier),
      balance: Math.round(baseBalance * character.balanceModifier),
      MAX_STAMINA: Math.round(baseStamina * character.staminaModifier),
      MAX_BALANCE: Math.round(baseBalance * character.balanceModifier),
      currentDay: 1,
      currentMonth: 1,
      history: [],
      workDays: 0,
      totalWorkDays: 0,
      gameOverReason: null,
      isGameOver: false,
      payNotification: null,
      staminaWarning: null,
      balanceWarning: null,
    });
  },

  addToHistory: (record) =>
    set((state) => ({
      history: [...state.history, record],
    })),

  resetWorkDays: () => set({ workDays: 0 }),

  calculateSalary: (daysWorked) => {
    const { getCurrentJob, getCurrentCharacter } = get();
    const job = getCurrentJob();
    const character = getCurrentCharacter();
    
    const baseSalary = 200 * daysWorked;
    const jobModifier = job?.salaryModifier || 1;
    const characterModifier = character?.id === 'financial' ? 1.1 : 1;
    
    return Math.round(baseSalary * jobModifier * characterModifier);
  },
  
  consumeStamina: (amount: number) => {
    const { getCurrentJob, setStamina, stamina } = get();
    const job = getCurrentJob();
  
    const staminaConsumptionModifier = job?.staminaConsumptionModifier || 1;
    const actualAmount = Math.round(amount * staminaConsumptionModifier);
  
    setStamina(Math.max(0, stamina - actualAmount));
    return actualAmount;
  },
  
  regenerateStamina: (amount: number) => {
    const { getCurrentCharacter, setStamina, stamina, MAX_STAMINA } = get();
    const character = getCurrentCharacter();
  
    const staminaRegenModifier = character?.staminaRegenModifier || 1;
    const actualAmount = Math.round(amount * staminaRegenModifier);
  
    setStamina(Math.min(MAX_STAMINA, stamina + actualAmount));
    return actualAmount;
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

  applySpecialAbility: () => {
    const { getCurrentJob, currentDay, setBalance, balance, setPayNotification } = get();
    const job = getCurrentJob();
    
    if (!job?.specialAbility) return false;
    
    let abilityTriggered = false;
    
    switch (job.id) {
      case 'waiter': 
        if (Math.random() < 0.2) {
          const tipAmount = Math.round(200 * (0.1 + Math.random() * 0.2));
          setBalance(balance + tipAmount);
          setPayNotification(`Anda mendapat tip sebesar ${tipAmount}!`);
          abilityTriggered = true;
        }
        break;
        
      case 'freelancer':
        if (Math.random() < 0.1) {
          const bonusAmount = 200 * 3;
          setBalance(balance + bonusAmount);
          setPayNotification(`Anda mendapat proyek besar senilai ${bonusAmount}!`);
          abilityTriggered = true;
        }
        break;
        
      case 'labor':
        if (currentDay % 7 === 0) {
          const overtimeAmount = Math.round(200 * 0.5);
          setBalance(balance + overtimeAmount);
          setPayNotification(`Anda mendapat bonus lembur sebesar ${overtimeAmount}!`);
          abilityTriggered = true;
        }
        break;
        
      default:
        break;
    }
    
    return abilityTriggered;
  },

  selectChoicesForToday: (choices) => {
    const { 
      balance, 
      stamina, 
      setBalance, 
      setStamina, 
      addToHistory, 
      currentDay, 
      currentMonth,
      applySpecialAbility,
      getCurrentCharacter,
      getCurrentJob,
      getNextSalary
    } = get();
    
    let totalAmount = 0;
    let totalStaminaEffect = 0;
    
    choices.forEach(choice => {
      totalAmount += choice.amount;
      totalStaminaEffect += choice.staminaEffect;
    });
    
    const isWorking = choices.some(choice => choice.staminaEffect < 0);
    
    if (isWorking) {
      const job = getCurrentJob();
      if (job) {
        totalStaminaEffect = totalStaminaEffect * job.staminaConsumptionModifier;
      }
    } 
    else if (totalStaminaEffect > 0) {
      const character = getCurrentCharacter();
      if (character) {
        totalStaminaEffect = totalStaminaEffect * character.staminaRegenModifier;
      }
    }
    
    const record = {
      day: currentDay,
      month: currentMonth,
      choices,
      balanceBefore: balance,
      balanceAfter: balance - totalAmount,
      staminaBefore: stamina,
      staminaAfter: Math.min(100, Math.max(0, stamina + totalStaminaEffect)),
      salary: getNextSalary(),
    };
    
    setBalance(balance - totalAmount);
    setStamina(Math.min(100, Math.max(0, stamina + totalStaminaEffect)));
    
    addToHistory(record);
    
    set({ currentChoices: choices });
    
    applySpecialAbility();
  },

  resetGame: () => {
    const { selectedCharacter, selectedJob, initializeGameWithChoices } = get();
    
    set({
      selectedCharacter,
      selectedJob,
      currentDay: 1,
      currentMonth: 1,
      balance: 5000,
      stamina: 100,
      history: [],
      workDays: 0,
      totalWorkDays: 0,
      gameOverReason: null,
      isGameOver: false,
      payNotification: null,
      staminaWarning: null,
      balanceWarning: null,
      currentChoices: [],
    });
    
    if (selectedCharacter && selectedJob) {
      initializeGameWithChoices();
    }
  },
});