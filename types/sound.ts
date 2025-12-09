export type SoundId = "drums" | "guitar" | "piano" | "synth" | "keyboard";

export interface Sound {
  id: SoundId;
  on: boolean;
  volume: number;
  setOn: (on: boolean) => void;
  setVolume: (v: number) => void;
  toggle: () => void;
}

export interface SoundDefinition {
  id: SoundId;
  name: string;
  fileUrl: string;
  volume: number; // 0–1
}

export const SOUND_DEFINITIONS: SoundDefinition[] = [
  {
    id: "drums",
    name: "Drums",
    fileUrl: "/sounds/drums.mp3",
    volume: 0.7,
  },
  {
    id: "guitar",
    name: "Guitar",
    fileUrl: "/sounds/guitar.mp3",
    volume: 0.5,
  },
  {
    id: "piano",
    name: "Piano",
    fileUrl: "/sounds/piano.mp3",
    volume: 0.5,
  },
  {
    id: "synth",
    name: "Synth",
    fileUrl: "/sounds/synth.mp3",
    volume: 0.4,
  },
  {
    id: "keyboard",
    name: "Keyboard Clacks",
    fileUrl: "/sounds/keyboard.mp3",
    volume: 0.4,
  },
  {
    id: "keyboard",
    name: "Keyboard Clacks",
    fileUrl: "/sounds/keyboard.mp3",
    volume: 0.5,
  },
];

export type SoundState = {
  on: boolean;
  volume: number; // 0–1
};
