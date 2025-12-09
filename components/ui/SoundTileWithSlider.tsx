// components/ui/SoundTileWithSlider.tsx
"use client";

import { useState } from "react";

import Toggle from "./Toggle";
import GradientSlider from "./GradientSlider";
import SoundTile from "./SoundTile";

type SoundTileWithSliderProps = {
  label: string;
  on: boolean;
  volume: number; // 0–100
  onToggle: () => void;
  onVolumeChange: (value: number) => void;
  className?: string;
};

const SoundTileWithSlider: React.FC<SoundTileWithSliderProps> = ({
  label,
  on,
  volume,
  onToggle,
  onVolumeChange,
  className,
}) => {
  const [isActiveTile, setIsActiveTile] = useState(false);

  const setActiveTile = () => {
    setIsActiveTile(!isActiveTile);
  };

  return (
    <>
      {isActiveTile ? (
        <div
          className={[
            "glass-tile px-6 py-5 flex flex-col gap-4",
            className ?? "",
          ].join(" ")}
        >
          <div className='flex items-center justify-between'>
            <span className='text-[22px] font-medium text-text-on-glass'>
              {label}
            </span>
            <Toggle
              on={on}
              onChange={() => {
                onToggle();
                setActiveTile();
              }}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <span className='text-[13px] text-text-secondary'>Volume</span>
            <GradientSlider
              value={volume}
              onChange={onVolumeChange}
              disabled={!on}
            />
          </div>
        </div>
      ) : (
        <SoundTile
          label={label}
          on={on}
          onToggle={() => {
            onToggle();
            setActiveTile();
          }}
        />
      )}
    </>
  );
};

export default SoundTileWithSlider;
