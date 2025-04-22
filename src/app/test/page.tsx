// app/test/page.tsx
'use client';

import BasketballGame from '@/components/minigame/BasketballGame';
import { useState } from 'react';

export default function TestPage() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Basketball Minigame</h1>

      <BasketballGame
        onComplete={(success) => {}}
      />

      {result && <p className="mt-4 text-lg">{result}</p>}
    </div>
  );
}
