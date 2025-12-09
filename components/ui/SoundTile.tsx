// components/ui/SoundTile.tsx
"use client";

import React from "react";
import Toggle from "./Toggle";

type SoundTileProps = {
  label: string;
  on: boolean;
  onToggle: () => void;
  className?: string;
};

const SoundTile: React.FC<SoundTileProps> = ({
  label,
  on,
  onToggle,
  className,
}) => {
  return (
    <div
      className={[
        "glass-tile px-5 py-4 flex items-center justify-between",
        className ?? "",
      ].join(" ")}
    >
      <span className='text-[20px] font-medium text-text-on-glass'>
        {label}
      </span>
      <Toggle on={on} onChange={onToggle} />
    </div>
  );
};

export default SoundTile;
