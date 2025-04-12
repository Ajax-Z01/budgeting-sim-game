"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

type Props = {
  src: string;
};

export type SoundEffectHandle = {
  play: () => void;
};

const SoundEffect = forwardRef<SoundEffectHandle, Props>(({ src }, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useImperativeHandle(ref, () => ({
    play() {
      audioRef.current?.play().catch((e) => {
        console.warn("Sound effect blocked:", e);
      });
    },
  }));

  return <audio ref={audioRef} src={src} preload="auto" />;
});

export default SoundEffect;
