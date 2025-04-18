import { useGameStore } from "@/stores/GameStore";
import { GameEvent } from "@/stores/GameTypes";

interface RandomEventProps {
  event: GameEvent;
  onEventComplete: () => void;
  maxStamina: number;
}

const RandomEvent: React.FC<RandomEventProps> = ({ event, onEventComplete, maxStamina }) => {
  const { balance, stamina } = useGameStore.getState();

  const handleEventEffect = () => {
    if (event.autoEffect) {
      const newState = event.autoEffect(balance, stamina);
      const adjustedStamina = Math.min(newState.stamina, maxStamina);

      useGameStore.setState({
        balance: newState.balance,
        stamina: adjustedStamina,
      });
    }
    onEventComplete();
  };

  const describeEffect = (effectFn: (balance: number, stamina: number) => { balance: number; stamina: number }): string => {
    const newState = effectFn(balance, stamina);

    const effects = [];
    const newStamina = Math.min(newState.stamina, maxStamina);

    if (newStamina !== stamina) {
      effects.push(`Stamina ${newStamina > stamina ? "+" : ""}${newStamina - stamina}`);
    } else if (newStamina === maxStamina && newState.stamina > stamina) {
      effects.push(`Stamina sudah penuh, tetapi ada tambahan efek.`);
    }

    if (newState.balance !== balance) {
      effects.push(`Saldo ${newState.balance > balance ? "+" : ""}${newState.balance - balance}`);
    }

    return effects.length > 0 ? effects.join(", ") : "Tidak ada efek langsung";
  };

  return (
    <div className="p-4 bg-blue-100 rounded-lg mb-4">
      <p className="font-semibold mb-2 text-gray-800">{event.text}</p>
      <div className="flex flex-col gap-2">
        {event.choices?.map((choice, index) => (
          <button
            key={index}
            className="bg-blue-300 hover:bg-blue-400 text-black px-4 py-2 rounded text-left cursor-pointer"
            onClick={() => {
              const newState = choice.effect(balance, stamina);
              const adjustedStamina = Math.min(newState.stamina, maxStamina);
              useGameStore.setState({
                balance: newState.balance,
                stamina: adjustedStamina,
              });
              onEventComplete();
            }}
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
    </div>
  );
};

export default RandomEvent;
