"use client";

import { useAudioContext } from "./AudioProvider";
import { SoundId } from "@/types/sound";

export function useSound(id: SoundId) {
  const { sounds, setSoundOn, setSoundVolume, toggleSound } = useAudioContext();
  const state = sounds[id];

  return {
    id,
    on: state.on,
    volume: state.volume,
    setOn: (on: boolean) => setSoundOn(id, on),
    setVolume: (v: number) => setSoundVolume(id, v),
    toggle: () => toggleSound(id),
  };
}
