import { StateCreator } from "zustand";
import { GameState } from "./GameTypes";

export const createGameActions: StateCreator<GameState, [], [], Partial<GameState>> = (set, get) => ({
  setSelectedCharacter: (character: string | null) => set({ selectedCharacter: character }),
  setSelectedCharacterGender: (gender: 'male' | 'female') => set({ selectedCharacterGender: gender }),
  setSelectedJob: (job: string | null) => set({ selectedJob: job }),
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
  setGameOverReason: (reason) => set({ gameOverReason: reason }),
  setPayNotification: (msg) => set({ payNotification: msg }),
  setStaminaWarning: (msg) => set({ staminaWarning: msg }),
  setBalanceWarning: (msg) => set({ balanceWarning: msg }),
  setIsGameOver: (value: boolean) => set({ isGameOver: value }),

  // Fungsi untuk mendapatkan karakter yang dipilih saat ini
  getCurrentCharacter: () => {
    const { selectedCharacter, characters } = get();
    if (!selectedCharacter) return null;
    return characters.find(char => char.id === selectedCharacter) || null;
  },
  
  // Fungsi untuk mendapatkan pekerjaan yang dipilih saat ini
  getCurrentJob: () => {
    const { selectedJob, jobs } = get();
    if (!selectedJob) return null;
    return jobs.find(job => job.id === selectedJob) || null;
  },
  
  // Inisialisasi game dengan karakter dan pekerjaan yang dipilih
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

  // Perbarui perhitungan gaji berdasarkan pekerjaan dan karakter
  calculateSalary: (daysWorked) => {
    const { getCurrentJob, getCurrentCharacter } = get();
    const job = getCurrentJob();
    const character = getCurrentCharacter();
    
    const baseSalary = 200 * daysWorked;
    const jobModifier = job?.salaryModifier || 1;
    const characterModifier = character?.id === 'financial' ? 1.1 : 1; // Karakter "Ahli Keuangan" dapat bonus gaji 10%
    
    return Math.round(baseSalary * jobModifier * characterModifier);
  },
  
  // Fungsi untuk mengkonsumsi stamina berdasarkan pekerjaan
  consumeStamina: (amount: number) => {
    const { getCurrentJob, setStamina, stamina } = get();
    const job = getCurrentJob();
    
    const staminaConsumptionModifier = job?.staminaConsumptionModifier || 1;
    const actualAmount = Math.round(amount * staminaConsumptionModifier);
    
    setStamina(Math.max(0, stamina - actualAmount));
    return actualAmount;
  },
  
  // Fungsi untuk regenerasi stamina berdasarkan karakter
  regenerateStamina: (amount: number) => {
    const { getCurrentCharacter, setStamina, stamina } = get();
    const character = getCurrentCharacter();
    
    const staminaRegenModifier = character?.staminaRegenModifier || 1;
    const actualAmount = Math.round(amount * staminaRegenModifier);
    
    setStamina(Math.min(100, stamina + actualAmount)); // Asumsi max stamina 100
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

  // Fungsi untuk menangani kemampuan spesial pekerjaan
  applySpecialAbility: () => {
    const { getCurrentJob, currentDay, setBalance, balance, setPayNotification } = get();
    const job = getCurrentJob();
    
    if (!job?.specialAbility) return false;
    
    let abilityTriggered = false;
    
    // Implementasi kemampuan khusus berdasarkan pekerjaan
    switch (job.id) {
      case 'waiter': 
        // Pelayan: 20% kesempatan mendapat tip (10-30% dari gaji harian)
        if (Math.random() < 0.2) {
          const tipAmount = Math.round(200 * (0.1 + Math.random() * 0.2));
          setBalance(balance + tipAmount);
          setPayNotification(`Anda mendapat tip sebesar ${tipAmount}!`);
          abilityTriggered = true;
        }
        break;
        
      case 'freelancer':
        // Freelancer: 10% kesempatan mendapat proyek besar (3x gaji harian)
        if (Math.random() < 0.1) {
          const bonusAmount = 200 * 3;
          setBalance(balance + bonusAmount);
          setPayNotification(`Anda mendapat proyek besar senilai ${bonusAmount}!`);
          abilityTriggered = true;
        }
        break;
        
      case 'labor':
        // Buruh: Setiap minggu (hari ke-7, 14, 21, 28) dapat bonus lembur
        if (currentDay % 7 === 0) {
          const overtimeAmount = Math.round(200 * 0.5); // 50% dari gaji harian
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
      getCurrentJob
    } = get();
    
    // Hitung total pengeluaran dan efek stamina dari pilihan
    let totalAmount = 0;
    let totalStaminaEffect = 0;
    
    choices.forEach(choice => {
      totalAmount += choice.amount;
      totalStaminaEffect += choice.staminaEffect;
    });
    
    // Aplikasikan modifikator jika bekerja (staminaEffect negatif berarti bekerja)
    const isWorking = choices.some(choice => choice.staminaEffect < 0);
    
    // Jika bekerja, aplikasikan modifikator konsumsi stamina dari pekerjaan
    if (isWorking) {
      const job = getCurrentJob();
      if (job) {
        totalStaminaEffect = totalStaminaEffect * job.staminaConsumptionModifier;
      }
    } 
    // Jika istirahat (staminaEffect positif), aplikasikan modifikator regenerasi stamina
    else if (totalStaminaEffect > 0) {
      const character = getCurrentCharacter();
      if (character) {
        totalStaminaEffect = totalStaminaEffect * character.staminaRegenModifier;
      }
    }
    
    // Buat record untuk history
    const record = {
      day: currentDay,
      month: currentMonth,
      choices,
      balanceBefore: balance,
      balanceAfter: balance - totalAmount,
      staminaBefore: stamina,
      staminaAfter: Math.min(100, Math.max(0, stamina + totalStaminaEffect)),
    };
    
    // Update balance dan stamina
    setBalance(balance - totalAmount);
    setStamina(Math.min(100, Math.max(0, stamina + totalStaminaEffect)));
    
    // Tambahkan ke history
    addToHistory(record);
    
    // Set choices untuk hari ini
    set({ currentChoices: choices });
    
    // Cek kemampuan khusus pekerjaan
    applySpecialAbility();
  },

  resetGame: () => {
    const { selectedCharacter, selectedJob, initializeGameWithChoices } = get();
    
    // Tetap mempertahankan karakter dan pekerjaan yang sudah dipilih
    set({
      selectedCharacter,
      selectedJob,
      currentDay: 1,
      currentMonth: 1,
      balance: 5000,  // Nilai awal akan disesuaikan di initializeGameWithChoices
      stamina: 100,   // Nilai awal akan disesuaikan di initializeGameWithChoices
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