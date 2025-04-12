"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

type Props = {
  src: string;
  volume?: number;
  loop?: boolean;
  autoPlay?: boolean;
  onReady?: () => void;
};

const BackgroundMusic = forwardRef<HTMLAudioElement, Props>(
  ({ src, volume = 1.0, loop = true, autoPlay = true, onReady }, ref) => {
    const internalRef = useRef<HTMLAudioElement>(null);

    useImperativeHandle(ref, () => internalRef.current!);

    useEffect(() => {
      const audio = internalRef.current;
      if (!audio) return;
    
      audio.volume = volume;
      audio.loop = loop;
    
      if (onReady) onReady();
    
      if (autoPlay) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    }, [volume, loop, autoPlay, onReady]);    

    return <audio ref={internalRef} src={src} preload="auto" />;
  }
);

BackgroundMusic.displayName = "BackgroundMusic";

export default BackgroundMusic;
