import { useState, useEffect, useRef } from "react";
import { GameEvent, GameOverReason } from "@/stores/GameTypes";
import { useGameStore } from "@/stores/GameStore";
import { motion } from "framer-motion";
import SoundEffect, { SoundEffectHandle } from "@/components/sound/SoundEffect";

interface RandomEventProps {
  event: GameEvent;
  onEventComplete: () => void;
  maxStamina: number;
  onGameOver: (reason: GameOverReason) => void;
}

const RandomEvent: React.FC<RandomEventProps> = ({ event, onEventComplete, maxStamina, onGameOver }) => {
  const { balance, stamina } = useGameStore.getState();
  const [isMiniGameComplete, setIsMiniGameComplete] = useState(false);
  const [miniGameResult, setMiniGameResult] = useState<string | null>(null);
  const [isEffectApplied, setIsEffectApplied] = useState(false);

  const confirmSoundRef = useRef<SoundEffectHandle>(null);
  const appearSoundRef = useRef<SoundEffectHandle>(null);

  useEffect(() => {
    appearSoundRef.current?.play();
  }, []);

  const handleEventEffect = () => {
    if (event.miniGame && !isEffectApplied) {
      confirmSoundRef.current?.play();
      onEventComplete();
      return;
    }

    if (event.autoEffect) {
      const newState = event.autoEffect(balance, stamina);
      const adjustedStamina = Math.min(newState.stamina, maxStamina);

      if (newState.balance <= 0) {
        onGameOver("balance"); // Game over due to negative balance
        return;
      }

      if (adjustedStamina <= 0) {
        onGameOver("stamina"); // Game over due to negative stamina
        return;
      }

      useGameStore.setState({
        balance: newState.balance,
        stamina: adjustedStamina,
      });

      setIsEffectApplied(true);
    }

    confirmSoundRef.current?.play();
    onEventComplete();
  };

  const handleMiniGameComplete = (success: boolean) => {
    setIsMiniGameComplete(true);
    if (success) {
      setMiniGameResult("Benar!");
      setIsEffectApplied(true);
    } else {
      setMiniGameResult("Salah!");
      setIsEffectApplied(false);
    }
  };

  const describeEffect = (effectFn: (balance: number, stamina: number) => { balance: number; stamina: number }): string => {
    if (event.miniGame && !isEffectApplied) {
      return "Tidak ada efek langsung";
    }    

    const newState = effectFn(balance, stamina);
    const effects: string[] = [];
    const adjustedStamina = Math.min(newState.stamina, maxStamina);

    if (adjustedStamina !== stamina) {
      const diff = adjustedStamina - stamina;
      effects.push(`Stamina ${diff > 0 ? "+" : ""}${diff}`);
    } else if (adjustedStamina === maxStamina && newState.stamina > stamina) {
      effects.push("Stamina sudah penuh, tetapi ada tambahan efek.");
    }

    if (newState.balance !== balance) {
      const diff = newState.balance - balance;
      effects.push(`Saldo ${diff > 0 ? "+" : ""}${diff}`);
    }

    return effects.length > 0 ? effects.join(", ") : "Tidak ada efek langsung";
  };

  const handleChoiceClick = (choiceEffect: (balance: number, stamina: number) => { balance: number; stamina: number }) => {
    const newState = choiceEffect(balance, stamina);
    const adjustedStamina = Math.min(newState.stamina, maxStamina);

    if (newState.balance <= 0) {
      onGameOver("balance");
      return;
    }

    if (adjustedStamina <= 0) {
      onGameOver("stamina");
      return;
    }

    useGameStore.setState({
      balance: newState.balance,
      stamina: adjustedStamina,
    });

    confirmSoundRef.current?.play();
    onEventComplete();
  };

  return (
    <motion.div
      className="p-4 bg-blue-100 rounded-lg mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="font-semibold mb-2 text-gray-800">{event.text}</p>

      {event.miniGame && !isMiniGameComplete && (
        <div className="mb-4">
          <event.miniGame onComplete={handleMiniGameComplete} />
        </div>
      )}

      {miniGameResult && (
        <div className={`text-lg font-semibold ${miniGameResult === "Benar!" ? "text-green-500" : "text-red-500"}`}>
          {miniGameResult}
        </div>
      )}

      {isMiniGameComplete || !event.miniGame ? (
        <div className="flex flex-col gap-2">
          {event.choices?.map((choice, index) => (
            <button
              key={index}
              className="bg-blue-300 hover:bg-blue-400 text-black px-4 py-2 rounded text-left cursor-pointer"
              onClick={() => handleChoiceClick(choice.effect)}
            >
              <span className="block">{choice.text}</span>
              <span className="text-sm text-gray-700">
                Efek: {describeEffect(choice.effect)}
              </span>
            </button>
          ))}

          {!event.choices && event.autoEffect && (
            <>
              <div className="text-sm text-gray-700">
                Efek: {describeEffect(event.autoEffect)}
              </div>
              <button
                className="bg-green-300 hover:bg-green-400 text-black px-4 py-2 rounded mt-2 cursor-pointer"
                onClick={handleEventEffect}
              >
                Selesaikan Event
              </button>
            </>
          )}
        </div>
      ) : null}

      <SoundEffect ref={confirmSoundRef} src="/sounds/confirm.mp3" />
      <SoundEffect ref={appearSoundRef} src="/sounds/notif.mp3" />
    </motion.div>
  );
};

export default RandomEvent;
