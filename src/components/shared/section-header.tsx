import React from "react";

type SectionHeaderProps = {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export default function SectionHeader({
  title,
  subtitle,
  description,
  children,
  className = "pb-10",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col gap-1 w-full items-start text-left  ${className}`}
    >
      {subtitle && (
        <div className="font-semibold text-header tracking-wide mb-0.5 block">
          {subtitle}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 w-full items-end">
        {/* Left Column: Title & Description */}
        <div className="flex flex-col gap-1.5 items-start">
          <div className="text-3xl md:text-4xl font-bold tracking-tight leading-none text-left">
            {title}
          </div>

          {description && (
            <div className="text-[18px]/[28px]">{description}</div>
          )}
        </div>

        {/* Right Column: Children anchored to the bottom */}
        <div className="shrink-0 flex items-end justify-start md:justify-end">
          {children}
        </div>
      </div>
    </div>
  );
}
