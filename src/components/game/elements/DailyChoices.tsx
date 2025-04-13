"use client";

import { useRef, useState } from "react";
import { Choice } from "@/stores/GameTypes";
import SoundEffect, { SoundEffectHandle } from "@/components/sound/SoundEffect";
import { motion } from "framer-motion";

type DailyChoicesProps = {
  choices: Choice[];
  onChoose: (selectedChoices: Choice[]) => void;
  currentStamina: number;
};

export default function DailyChoices({ choices, onChoose, currentStamina }: DailyChoicesProps) {
  const categories = Array.from(new Set(choices.map((c) => c.category)));
  const [selected, setSelected] = useState<Record<string, Choice>>({});

  const clickSoundRef = useRef<SoundEffectHandle>(null);
  const confirmSoundRef = useRef<SoundEffectHandle>(null);

  const getEmoji = (label: string): string => {
    if (label.includes("Masak")) return "🥗";
    if (label.includes("Makan di luar")) return "🍔";
    if (label.includes("Tidak keluar")) return "🏠";
    if (label.includes("Jalan kaki")) return "🚶";
    if (label.includes("Naik kendaraan")) return "🚌";
    if (label.includes("Belajar")) return "📚";
    if (label.includes("Bekerja")) return "💼";
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

      if (choice.category === "Transportasi" && choice.label === "Tidak keluar rumah") {
        if (updated["Kegiatan"]?.label === "Bekerja") delete updated["Kegiatan"];
        if (updated["Makan"]?.label === "Makan di luar") delete updated["Makan"];
      }

      if (choice.category === "Kegiatan" && choice.label === "Bekerja") {
        if (updated["Transportasi"]?.label === "Tidak keluar rumah") delete updated["Transportasi"];
      }

      if (choice.category === "Makan" && choice.label === "Makan di luar") {
        if (updated["Transportasi"]?.label === "Tidak keluar rumah") delete updated["Transportasi"];
      }

      return updated;
    });
  };

  const handleConfirm = () => {
    const selectedChoices = Object.values(selected);
    if (selectedChoices.length !== categories.length) {
      alert("Pilih satu opsi dari tiap kategori.");
      return;
    }

    const totalStaminaChange = selectedChoices.reduce((sum, c) => sum + c.staminaEffect, 0);
    const willBeStamina = currentStamina + totalStaminaChange;

    if (willBeStamina <= 0) {
      console.log("Stamina akan habis, trigger game over dari parent.");
    }

    confirmSoundRef.current?.play();
    onChoose(selectedChoices);
  };

  const isStayAtHome = selected["Transportasi"]?.label === "Tidak keluar";

  return (
    <div className="mt-4 space-y-4">
      {categories.map((cat) => (
        <div key={cat}>
          <h4 className="font-medium text-lg">{cat}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {choices
              .filter((c) => c.category === cat)
              .map((choice, idx) => {
                const isSelected = selected[cat]?.label === choice.label;

                const isChoiceDisabled =
                  (isStayAtHome && cat === "Kegiatan" && choice.label === "Bekerja") ||
                  (isStayAtHome && cat === "Makan" && choice.label === "Makan di luar");

                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleSelect(choice)}
                    disabled={isChoiceDisabled}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full text-left px-4 py-2 rounded-xl border transition-all duration-200 cursor-pointer
                      ${isSelected ? "bg-green-500 text-white border-green-600 shadow-lg" : "bg-white text-gray-800 border-gray-300"}
                      ${isChoiceDisabled ? "opacity-40 cursor-not-allowed" : "hover:border-blue-400"}
                    `}
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
        ✅ Konfirmasi Pilihan Hari Ini
      </motion.button>

      <SoundEffect ref={clickSoundRef} src="/sounds/click.mp3" />
      <SoundEffect ref={confirmSoundRef} src="/sounds/confirm.mp3" />
    </div>
  );
}
