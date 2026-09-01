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
  className = "pb-6 md:pb-8",
}: SectionHeaderProps) {
  return (
    <div className={`flex w-full flex-col items-start text-left ${className}`}>
      {subtitle && (
        <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-subtitle">
          {subtitle}
        </span>
      )}

      <div className="grid w-full grid-cols-1 items-end gap-4 md:grid-cols-[1fr_auto]">
        {/* Left Column: Title & Description */}
        <div className="flex flex-col gap-1.5 items-start">
          <h2 className="text-2xl font-bold tracking-tight text-title sm:text-3xl md:text-4xl">
            {title}
          </h2>

          {description && (
            <p className="text-sm text-description sm:text-base md:text-lg">
              {description}
            </p>
          )}
        </div>

        {/* Right Column: Action elements (e.g., View All button, Tabs) */}
        {children && (
          <div className="flex shrink-0 items-end justify-start md:justify-end">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
