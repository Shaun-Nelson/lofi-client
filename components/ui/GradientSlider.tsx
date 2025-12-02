"use client";

import React, { useCallback, useRef } from "react";

type GradientSliderProps = {
  value: number; // 0–100
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
};

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const GradientSlider: React.FC<GradientSliderProps> = ({
  value,
  onChange,
  disabled,
  className,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const handlePointer = useCallback(
    (clientX: number) => {
      if (!trackRef.current || !onChange || disabled) return;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      onChange(Math.round(ratio * 100));
    },
    [onChange, disabled]
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handlePointer(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    handlePointer(e.clientX);
  };

  return (
    <div
      className={[
        "relative h-5 flex items-center",
        disabled ? "opacity-40 pointer-events-none" : "",
        className ?? "",
      ].join(" ")}
    >
      <div
        ref={trackRef}
        className='slider-track'
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        <div
          className='slider-fill'
          style={{ width: `${clamp(value, 0, 100)}%` }}
        />
        <div
          className='slider-thumb'
          style={{ left: `${clamp(value, 0, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default GradientSlider;
