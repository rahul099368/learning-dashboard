"use client";

import { motion } from "framer-motion";

interface BentoGridProps {
  children: React.ReactNode;
}

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}
