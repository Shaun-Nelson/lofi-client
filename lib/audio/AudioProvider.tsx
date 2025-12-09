"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SOUND_DEFINITIONS, SoundId, SoundState } from "@/types/sound";
import { AudioEngine } from "./AudioEngine";

type SoundStateMap = Record<SoundId, SoundState>;

interface AudioContextValue {
  sounds: SoundStateMap;
  setSoundOn: (id: SoundId, on: boolean) => void;
  setSoundVolume: (id: SoundId, volume: number) => void;
  toggleSound: (id: SoundId) => void;
  ensureEngineStarted: () => Promise<void>;
}

/**
 * Default state: all sounds OFF, default volumes.
 */
const defaultState: SoundStateMap = SOUND_DEFINITIONS.reduce((acc, def) => {
  acc[def.id] = { on: false, volume: def.volume };
  return acc;
}, {} as SoundStateMap);

const AudioCtx = createContext<AudioContextValue | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sounds, setSounds] = useState<SoundStateMap>(defaultState);

  const engineRef = useRef<AudioEngine | null>(null);

  // Initialize audio engine once on mount
  useEffect(() => {
    if (engineRef.current == null) {
      engineRef.current = new AudioEngine();
    }
  }, []);

  const ensureEngineStarted = useCallback(async () => {
    if (!engineRef.current) return;
    await engineRef.current.ensureStarted();
  }, []);

  const setSoundOn = useCallback((id: SoundId, on: boolean) => {
    setSounds((prev) => {
      const next: SoundStateMap = { ...prev, [id]: { ...prev[id], on } };
      return next;
    });
  }, []);

  const setSoundVolume = useCallback((id: SoundId, volume: number) => {
    const clamped = Math.max(0, Math.min(1, volume));
    setSounds((prev) => {
      const next: SoundStateMap = {
        ...prev,
        [id]: { ...prev[id], volume: clamped },
      };
      return next;
    });
  }, []);

  const toggleSound = useCallback((id: SoundId) => {
    setSounds((prev) => {
      const current = prev[id];
      const next: SoundStateMap = {
        ...prev,
        [id]: { ...current, on: !current.on },
      };
      return next;
    });
  }, []);

  // Sync sound state -> audio engine
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    (async () => {
      for (const [id, state] of Object.entries(sounds) as [
        SoundId,
        SoundState
      ][]) {
        await engine.setSoundState(id, state.on, state.volume);
      }
    })();

    return () => {
      // do not dispose engine here; only on unmount if you want
    };
  }, [sounds]);

  // Optional: cleanup engine on app unmount
  useEffect(
    () => () => {
      engineRef.current?.dispose();
    },
    []
  );

  const value = useMemo(
    () => ({
      sounds,
      setSoundOn,
      setSoundVolume,
      toggleSound,
      ensureEngineStarted,
    }),
    [sounds, setSoundOn, setSoundVolume, toggleSound, ensureEngineStarted]
  );

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
};

export function useAudioContext() {
  const ctx = useContext(AudioCtx);
  if (!ctx) {
    throw new Error("useAudioContext must be used within AudioProvider");
  }
  return ctx;
}
