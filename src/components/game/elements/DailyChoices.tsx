"use client";

import { useEffect, useRef, useState } from "react";
import { Choice } from "@/stores/GameTypes";
import { useGameStore } from "@/stores/GameStore";
import SoundEffect, { SoundEffectHandle } from "@/components/sound/SoundEffect";
import { motion } from "framer-motion";
import ToastNotification from "@/components/ui/ToastNotification";

type DailyChoicesProps = {
  choices: Choice[];
  onChoose: (selectedChoices: Choice[]) => void;
  currentStamina: number;
  currentDay: number;
};

export default function DailyChoices({ choices, onChoose, currentStamina, currentDay }: DailyChoicesProps) {
  const categories = Array.from(new Set(choices.map((c) => c.category)));
  const [selected, setSelected] = useState<Record<string, Choice>>({});
  const { previousChoices, setPreviousChoices } = useGameStore();
  const [warning, setWarning] = useState<string | null>(null);

  const clickSoundRef = useRef<SoundEffectHandle>(null);
  const confirmSoundRef = useRef<SoundEffectHandle>(null);
  const appearSoundRef = useRef<SoundEffectHandle>(null);
  const warningAudioRef = useRef<SoundEffectHandle>(null);

  useEffect(() => {
    appearSoundRef.current?.play();
  }, []);

  const getEmoji = (label: string): string => {
    if (label.includes("Cook at home")) return "🥗";
    if (label.includes("Eat out")) return "🍔";
    if (label.includes("Stay at home")) return "🏠";
    if (label.includes("Walk")) return "🚶";
    if (label.includes("Ride bike")) return "🏍️";
    if (label.includes("Take taxi")) return "🚕";
    if (label.includes("Work")) return "💼";
    if (label.includes("Rest")) return "😴";
    return "🎯";
  };

  const getStaminaTextColor = (isSelected: boolean, staminaEffect: number): string => {
    if (isSelected) {
      return staminaEffect >= 0 ? "text-lime-200" : "text-red-200";
    } else {
      return staminaEffect >= 0 ? "text-green-500" : "text-red-500";
    }
  };

  const handleSelect = (choice: Choice) => {
    clickSoundRef.current?.play();

    setSelected((prev) => {
      const updated = { ...prev, [choice.category]: choice };

      if (choice.category === "Transport" && choice.label === "Stay at home") {
        if (updated["Activity"]?.label === "Work") delete updated["Activity"];
        if (updated["Food"]?.label === "Eat out") delete updated["Food"];
      }

      if (choice.category === "Activity" && choice.label === "Work") {
        if (updated["Transport"]?.label === "Stay at home") delete updated["Transport"];
      }

      if (choice.category === "Food" && choice.label === "Eat out") {
        if (updated["Transport"]?.label === "Stay at home") delete updated["Transport"];
      }

      return updated;
    });
  };
  
  useEffect(() => {
    if (warning) {
      warningAudioRef.current?.play();
    }
  }, [warning]); 

  const handleConfirm = () => {
    const selectedChoices = Object.values(selected);
    if (selectedChoices.length !== categories.length) {
      setWarning("⚠️ All categories must be selected.");
      return;
    }
  
    const totalStaminaChange = selectedChoices.reduce((sum, c) => sum + c.staminaEffect, 0);
    const willBeStamina = currentStamina + totalStaminaChange;
  
    if (willBeStamina <= 0) {
      setWarning("⚠️ Not enough stamina to perform these activities.");
      return;
    }
  
    confirmSoundRef.current?.play();
    onChoose(selectedChoices);
    setPreviousChoices(currentDay, selectedChoices);
    setWarning(null);
  };
  
  const handleSelectPrevious = () => {
    const prev = previousChoices[currentDay - 1];
    if (!prev || prev.length === 0) {
      setWarning("⚠️ No previous choices available.");
      return;
    }
  
    setPreviousChoices(currentDay, prev);
    confirmSoundRef.current?.play();
    onChoose(prev);
    setWarning(null);
  };

  const isStayAtHome = selected["Transport"]?.label === "Stay at home";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="mt-4 space-y-4"
    >
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {warning && (
          <ToastNotification message={warning} type="warning" keyProp={Date.now()} />
        )}
      </div>
      <button
        onClick={handleSelectPrevious}
        className="w-full bg-yellow-600 text-white px-4 py-2 rounded-xl hover:bg-yellow-700 transition-all shadow-md cursor-pointer"
      >
        🔁 Repeat the Same Choices as Yesterday
      </button>

      {categories.map((cat) => (
        <div key={cat}>
          <h4 className="font-medium text-lg">{cat}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {choices
              .filter((c) => c.category === cat)
              .map((choice, idx) => {
                const isSelected = selected[cat]?.label === choice.label;

                const isChoiceDisabled =
                  (isStayAtHome && cat === "Activity" && choice.label === "Work") ||
                  (isStayAtHome && cat === "Food" && choice.label === "Eat out");

                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleSelect(choice)}
                    disabled={isChoiceDisabled}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full text-left px-4 py-2 rounded-xl border transition-all duration-200 cursor-pointer
                      ${isSelected ? "bg-green-500 text-white border-green-600 shadow-lg" : "bg-white text-gray-800 border-gray-300"}
                      ${isChoiceDisabled ? "opacity-40 cursor-not-allowed" : "hover:border-blue-400"}`}
                  >
                    <span className="text-lg font-semibold">
                      {getEmoji(choice.label)} {choice.label}
                    </span>
                    <div className="text-sm">
                      💸 ${choice.amount} | ❤️{" "}
                      <span className={getStaminaTextColor(isSelected, choice.staminaEffect)}>
                        {choice.staminaEffect >= 0 ? "+" : ""}
                        {choice.staminaEffect}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
          </div>
        </div>
      ))}

      <motion.button
        onClick={handleConfirm}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all shadow-md cursor-pointer"
      >
        ✅ Confirm Today’s Choices
      </motion.button>

      <SoundEffect ref={clickSoundRef} src="/sounds/click.mp3" />
      <SoundEffect ref={confirmSoundRef} src="/sounds/confirm.mp3" />
      <SoundEffect ref={appearSoundRef} src="/sounds/notif.mp3" />
      <SoundEffect ref={warningAudioRef} src="/sounds/warning.mp3" />
    </motion.div>
  );
}
