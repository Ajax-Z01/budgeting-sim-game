import { useState, useEffect } from "react";

interface GuessNumberProps {
  onComplete: (success: boolean) => void;
}

const GuessNumber: React.FC<GuessNumberProps> = ({ onComplete }) => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    setTargetNumber(Math.floor(Math.random() * 5) + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(false);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onComplete]);

  const checkGuess = (number: number) => {
    setGuess(number);
    const isCorrect = number === targetNumber;
    onComplete(isCorrect);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow">
      <p className="font-bold text-lg mb-2">Guess a number between 1 and 5:</p>
      <div className="grid grid-cols-5 gap-2 mb-2">
        {Array.from({ length: 5 }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => checkGuess(index + 1)}
            className="bg-blue-400 text-white py-2 rounded hover:bg-blue-500 transition"
          >
            {index + 1}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm text-gray-200">Time left: {timeLeft} seconds</p>
    </div>
  );
};

export default GuessNumber;
