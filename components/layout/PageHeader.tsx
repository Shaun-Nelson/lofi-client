// components/layout/PageHeader.tsx
"use client";

import React from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
};

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  align = "center",
}) => {
  const textAlign = align === "center" ? "text-center" : "text-left";
  return (
    <header className={textAlign}>
      <h1 className='text-[32px] font-semibold tracking-tight text-white/80'>
        {title}
      </h1>
      {subtitle && <p className='mt-1 text-[16px] text-white/50'>{subtitle}</p>}
    </header>
  );
};

export default PageHeader;
