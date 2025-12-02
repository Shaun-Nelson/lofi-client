// components/ui/SoundTileWithSlider.tsx
"use client";

import React from "react";
import Toggle from "./Toggle";
import GradientSlider from "./GradientSlider";

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
  return (
    <div
      className={[
        "glass-tile px-6 py-5 flex flex-col gap-4",
        className ?? "",
      ].join(" ")}
    >
      <div className='flex items-center justify-between'>
        <span className='text-[16px] font-medium text-text-on-glass'>
          {label}
        </span>
        <Toggle on={on} onChange={onToggle} />
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
  );
};

export default SoundTileWithSlider;
