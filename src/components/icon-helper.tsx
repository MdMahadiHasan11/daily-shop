"use client";

import * as Icons from "lucide-react";
import React from "react";

interface DynamicIconProps {
  name?: string;
  className?: string;
}

export function DynamicIcon({ name, className }: DynamicIconProps) {
  if (!name) return null;

  const iconMap = Icons as unknown as Record<
    string,
    React.ComponentType<{ className?: string }>
  >;

  const IconComponent = iconMap[name];
  if (!IconComponent) return null;

  return <IconComponent className={className} />;
}
