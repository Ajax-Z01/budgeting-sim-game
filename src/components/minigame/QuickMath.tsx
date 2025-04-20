import { useState, useEffect } from "react";

interface QuickMathProps {
  onComplete: (success: boolean) => void;
}

const QuickMath: React.FC<QuickMathProps> = ({ onComplete }) => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    setA(Math.floor(Math.random() * 10));
    setB(Math.floor(Math.random() * 10));
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

  const checkAnswer = () => {
    const isCorrect = parseInt(answer) === a + b;
    onComplete(isCorrect);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow">
      <p className="font-bold text-lg mb-2">Berapa hasil dari {a} + {b}?</p>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border px-2 py-1 mr-2"
      />
      <button onClick={checkAnswer} className="bg-blue-400 text-white px-3 py-1 rounded">Jawab</button>
      <p className="mt-2 text-sm text-gray-200">Sisa waktu: {timeLeft} detik</p>
    </div>
  );
};

export default QuickMath;
