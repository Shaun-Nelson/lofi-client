export type SoundId =
  | "rain"
  | "vinyl"
  | "piano"
  | "cafe"
  | "birds"
  | "keyboard";

export interface SoundDefinition {
  id: SoundId;
  name: string;
  fileUrl: string;
  volume: number; // 0–1
}

export const SOUND_DEFINITIONS: SoundDefinition[] = [
  {
    id: "rain",
    name: "Rain",
    fileUrl: "/sounds/rain.mp3",
    volume: 0.7,
  },
  {
    id: "vinyl",
    name: "Vinyl Crackle",
    fileUrl: "/sounds/vinyl.mp3",
    volume: 0.5,
  },
  {
    id: "piano",
    name: "Piano",
    fileUrl: "/sounds/piano.mp3",
    volume: 0.5,
  },
  {
    id: "cafe",
    name: "Cafe Noise",
    fileUrl: "/sounds/cafe.mp3",
    volume: 0.4,
  },
  {
    id: "birds",
    name: "Birds",
    fileUrl: "/sounds/birds.mp3",
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
