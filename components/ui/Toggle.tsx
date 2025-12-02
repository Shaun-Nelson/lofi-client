// components/ui/Toggle.tsx
"use client";

import React from "react";

type ToggleProps = {
  on: boolean;
  onChange?: (on: boolean) => void;
  className?: string;
};

const Toggle: React.FC<ToggleProps> = ({ on, onChange, className }) => {
  const handleClick = () => {
    onChange?.(!on);
  };

  return (
    <button
      type='button'
      className={[
        "toggle-track",
        on ? "on" : "off",
        "no-select no-tap-highlight",
        className ?? "",
      ].join(" ")}
      onClick={handleClick}
      aria-pressed={on}
    >
      <div className={["toggle-thumb", on ? "on" : ""].join(" ")} />
    </button>
  );
};

export default Toggle;
