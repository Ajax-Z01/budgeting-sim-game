'use client';

import { useRef, useEffect, useState } from 'react';

type Props = {
  onComplete: (success: boolean) => void;
};

export default function BasketballGame({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState<{ x: number; y: number } | null>(null);
  const [ballPos, setBallPos] = useState({ x: 50, y: 250 });
  const [ballLaunched, setBallLaunched] = useState(false);
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number } | null>(null);
  const [hasScored, setHasScored] = useState(false);

  // Position dan dimensi ring berbentuk U
  const ring = { x: 300, y: 150, width: 100, height: 40 };

  const resetGame = () => {
    setBallPos({ x: 50, y: 250 });
    setVelocity(null);
    setBallLaunched(false);
    setHasScored(false);
    onComplete(false); // Optional, tergantung jika kamu ingin menandai bahwa permainan di-reset
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const gravity = 0.4;
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gambar ring berbentuk U terbalik
      ctx.beginPath();
      ctx.moveTo(ring.x - ring.width / 2, ring.y);
      ctx.lineTo(ring.x - ring.width / 2, ring.y + ring.height);
      ctx.moveTo(ring.x + ring.width / 2, ring.y);
      ctx.lineTo(ring.x + ring.width / 2, ring.y + ring.height);
      ctx.moveTo(ring.x - ring.width / 2, ring.y + ring.height);
      ctx.lineTo(ring.x + ring.width / 2, ring.y + ring.height);
      ctx.strokeStyle = 'orange';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Gambar bola
      ctx.beginPath();
      ctx.arc(ballPos.x, ballPos.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = 'brown';
      ctx.fill();
      ctx.closePath();

      // Gambar panah jika sedang dragging
      if (isDragging && currentPos) {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(currentPos.x, currentPos.y);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.stroke();

        const angle = Math.atan2(currentPos.y - startPos.y, currentPos.x - startPos.x);
        const headlen = 10;
        const endX = currentPos.x;
        const endY = currentPos.y;

        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - headlen * Math.cos(angle - Math.PI / 6), endY - headlen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(endX - headlen * Math.cos(angle + Math.PI / 6), endY - headlen * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fillStyle = 'blue';
        ctx.fill();
      }

      // Update posisi bola
      if (ballLaunched && velocity) {
        setBallPos((prev) => {
          const newX = prev.x + velocity.x;
          const newY = prev.y + velocity.y;
          const newVelY = velocity.y + gravity;

          setVelocity({ x: velocity.x, y: newVelY });

          const dx = newX - ring.x;
          const dy = newY - (ring.y + ring.height); // Mengukur jarak ke bagian bawah ring (bucket)
          const distanceToRingBase = Math.sqrt(dx * dx + dy * dy);

          const isInsideBucket =
          newX > ring.x - ring.width / 2 &&
          newX < ring.x + ring.width / 2 &&
          newY + 10 >= ring.y &&
          newY - 10 <= ring.y + ring.height;

          // Jika bola menyentuh dasar bucket (cukup dekat)
          const isTouchingBucketBase =
          newY + 10 >= ring.y + ring.height - 2 && newY + 10 <= ring.y + ring.height + 2;

          if (isInsideBucket && isTouchingBucketBase && !hasScored) {
            setVelocity(null);
            setBallLaunched(false);
            setHasScored(true);
            onComplete(true);
            return { x: newX, y: ring.y + ring.height - 15 };
          }

          // Cek apakah bola keluar dari canvas
          if (newX > canvas.width || newY > canvas.height || newX < 0 || newY < 0) {
            cancelAnimationFrame(animationFrameId);
            ctx.fillStyle = 'red';
            ctx.font = '30px Arial';
            ctx.fillText('OUT OF BOUNDS!', 100, 150);
            onComplete(false);
          }

          return { x: newX, y: newY };
        });
      }

      if (hasScored) {
        ctx.fillStyle = 'green';
        ctx.font = '30px Arial';
        ctx.fillText('SCORE!', 150, 150);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [ballLaunched, velocity, onComplete, isDragging, currentPos]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const position = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    setStartPos(position);
    setCurrentPos(position); // Set currentPos immediately for the first click
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const endPos = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    const dx = (endPos.x - startPos.x) * 0.05;
    const dy = (endPos.y - startPos.y) * 0.05;

    setVelocity({ x: dx, y: dy });
    setBallLaunched(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="border-2 border-black rounded"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
      <p className="text-sm mt-2">Drag and release to shoot!</p>
        {hasScored && <p className="text-lg text-green-500 mt-2">You scored!</p>}
        {!hasScored && ballLaunched && <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={resetGame}
      >
        Reset Game
      </button>}
    </div>
  );
}
