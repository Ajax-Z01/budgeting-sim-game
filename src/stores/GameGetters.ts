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
    
    getSelectedCharacter: () => {
      const { selectedCharacter } = get();
      return selectedCharacter;
    },
  
    getSelectedJob: () => {
      const { selectedJob } = get();
      return selectedJob;
    },
  
    getCurrentCharacter: () => {
      const { selectedCharacter } = get();
      return selectedCharacter;
    },
  
    getCurrentJob: () => {
      const { selectedJob } = get();
      return selectedJob;
    },  
    
    getCharacterEffectsDescription: () => {
      const character = get().getSelectedCharacter();
      if (!character) return null;
      
      const effects = [];
      
      if (character.staminaModifier !== 1) {
        const staminaEffect = character.staminaModifier > 1 ? 
          `+${Math.round((character.staminaModifier - 1) * 100)}%` : 
          `-${Math.round((1 - character.staminaModifier) * 100)}%`;
        effects.push(`Stamina awal: ${staminaEffect}`);
      }
      
      if (character.balanceModifier !== 1) {
        const balanceEffect = character.balanceModifier > 1 ? 
          `+${Math.round((character.balanceModifier - 1) * 100)}%` : 
          `-${Math.round((1 - character.balanceModifier) * 100)}%`;
        effects.push(`Balance awal: ${balanceEffect}`);
      }
      
      if (character.staminaRegenModifier !== 1) {
        const regenEffect = character.staminaRegenModifier > 1 ? 
          `+${Math.round((character.staminaRegenModifier - 1) * 100)}%` : 
          `-${Math.round((1 - character.staminaRegenModifier) * 100)}%`;
        effects.push(`Regenerasi stamina: ${regenEffect}`);
      }
      
      if (character.id === 'financial') {
        effects.push('Bonus gaji: +10%');
      }
      
      return effects;
    },
    
    getJobEffectsDescription: () => {
      const job = get().getSelectedJob();
      if (!job) return null;
      
      const effects = [];
      
      if (job.salaryModifier !== 1) {
        const salaryEffect = job.salaryModifier > 1 ? 
          `+${Math.round((job.salaryModifier - 1) * 100)}%` : 
          `-${Math.round((1 - job.salaryModifier) * 100)}%`;
        effects.push(`Gaji: ${salaryEffect}`);
      }
      
      if (job.staminaConsumptionModifier !== 1) {
        const consumptionEffect = job.staminaConsumptionModifier > 1 ? 
          `+${Math.round((job.staminaConsumptionModifier - 1) * 100)}%` : 
          `-${Math.round((1 - job.staminaConsumptionModifier) * 100)}%`;
        effects.push(`Konsumsi stamina: ${consumptionEffect}`);
      }
      
      if (job.specialAbility) {
        effects.push(`Kemampuan khusus: ${job.specialAbility}`);
      }
      
      return effects;
    },
    
    hasGameStarted: () => {
      const { selectedCharacter, selectedJob } = get();
      return selectedCharacter !== null && selectedJob !== null;
    }
  });