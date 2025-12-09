export type SoundId =
  | "drums"
  | "vinyl"
  | "rain"
  | "pad"
  | "piano"
  | "melody1"
  | "melody2"
  | "keyboard";

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
    fileUrl: "/sounds/drums.wav",
    volume: 0.5,
  },
  {
    id: "vinyl",
    name: "Vinyl",
    fileUrl: "/sounds/vinyl.wav",
    volume: 0.3,
  },
  {
    id: "rain",
    name: "Rain",
    fileUrl: "/sounds/rain.wav",
    volume: 0.1,
  },
  {
    id: "piano",
    name: "Piano",
    fileUrl: "/sounds/piano.wav",
    volume: 0.3,
  },
  {
    id: "pad",
    name: "Pad FX",
    fileUrl: "/sounds/pad.wav",
    volume: 0.4,
  },
  {
    id: "melody1",
    name: "Melody 1",
    fileUrl: "/sounds/melody1.wav",
    volume: 0.5,
  },
  {
    id: "melody2",
    name: "Melody 2",
    fileUrl: "/sounds/melody2.wav",
    volume: 0.5,
  },
  {
    id: "keyboard",
    name: "Keyboard Clacks",
    fileUrl: "/sounds/keyboard.mp3",
    volume: 0.2,
  },
];

export type SoundState = {
  on: boolean;
  volume: number; // 0–1
};
