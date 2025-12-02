// components/ui/PrimaryButton.tsx
"use client";

import React from "react";

type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  className,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={["btn-primary w-full", className ?? ""].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
