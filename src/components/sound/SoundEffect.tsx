"use client";

import { useRef } from "react";

type Props = {
  src: string;
};

export default function SoundEffect({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = () => {
    audioRef.current?.play().catch((e) => {
      console.warn("Sound effect blocked:", e);
    });
  };

  return (
    <>
      <audio ref={audioRef} src={src} />
      <button
        onClick={play}
        style={{ display: "none" }}
        aria-hidden="true"
      />
    </>
  );
}
