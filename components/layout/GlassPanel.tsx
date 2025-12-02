// components/layout/GlassPanel.tsx
"use client";

import React from "react";

type GlassPanelProps = {
  children: React.ReactNode;
  className?: string;
};

const GlassPanel: React.FC<GlassPanelProps> = ({ children, className }) => {
  return (
    <div
      className={[
        "glass-panel max-w-[480px] w-full px-8 py-10 flex flex-col gap-10",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
