import { useState } from "react";
import { Button } from "flowbite-react";
import { Choice } from "./GameState";

type Props = {
  choices: Choice[];
  onChoose: (selected: Choice[]) => void;
};

export default function DailyChoices({ choices, onChoose }: Props) {
  const categories = Array.from(new Set(choices.map((c) => c.category)));
  const [selected, setSelected] = useState<Record<string, Choice>>({});

  const handleSelect = (choice: Choice) => {
    setSelected((prev) => {
      const updated = { ...prev, [choice.category]: choice };
  
      if (choice.category === "Transportasi" && choice.label === "Tidak keluar rumah") {
        if (updated["Kegiatan"]?.label === "Bekerja") {
          delete updated["Kegiatan"];
        }
      }
  
      if (choice.category === "Kegiatan" && choice.label === "Bekerja") {
        if (updated["Transportasi"]?.label === "Tidak keluar rumah") {
          delete updated["Transportasi"];
        }
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
    onChoose(selectedChoices);
  };

  const isStayAtHome = selected["Transportasi"]?.label === "Tidak keluar rumah";

  return (
    <div className="mt-4 space-y-4">
      {categories.map((cat) => (
        <div key={cat}>
          <h4 className="font-medium">{cat}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {choices
              .filter((c) => c.category === cat)
              .map((choice, idx) => {
                const isSelected = selected[cat]?.label === choice.label;

                const isDisabled =
                  isStayAtHome && cat === "Kegiatan" && choice.label === "Bekerja";

                return (
                  <Button
                    key={idx}
                    color={isSelected ? "green" : "light"}
                    onClick={() => handleSelect(choice)}
                    disabled={isDisabled}
                  >
                    {choice.label} (${choice.amount}) | Stamina{" "}
                    {choice.staminaEffect >= 0 ? "+" : ""}
                    {choice.staminaEffect}
                  </Button>
                );
              })}
          </div>
        </div>
      ))}
      <Button className="mt-4" onClick={handleConfirm}>
        Konfirmasi Pilihan Hari Ini
      </Button>
    </div>
  );
}
