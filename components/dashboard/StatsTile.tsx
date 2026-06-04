"use client";

import { motion } from "framer-motion";
import { Clock, Target, CheckCircle2, Medal } from "lucide-react";
import type { UserProfile } from "@/types";

const STATS = [
  { label: "Hours Learned", value: "47h", icon: Clock, color: "text-accent-cyan" },
  { label: "Goals Met", value: "12", icon: Target, color: "text-accent-violet" },
  { label: "Completed", value: "3", icon: CheckCircle2, color: "text-accent-emerald" },
  { label: "Rank", value: "#142", icon: Medal, color: "text-accent-amber" },
];

interface StatsTileProps {
  user: UserProfile;
}

export function StatsTile({ user }: StatsTileProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.32, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{
        scale: 1.015,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="relative grain overflow-hidden rounded-2xl border border-border-subtle bg-bg-surface shadow-card p-5"
      style={{ backgroundColor: "#0d1117" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.10) 0%, transparent 60%)",
        }}
      />

      <h2 className="relative z-10 font-display font-semibold text-white text-sm mb-4">
        Your Stats
      </h2>

      <div className="relative z-10 grid grid-cols-2 gap-3">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.07 }}
              className="flex flex-col gap-2 p-3 rounded-xl bg-bg-overlay border border-border-subtle"
            >
              <Icon size={16} className={stat.color} />
              <div>
                <p className="font-display font-bold text-white text-xl leading-none">
                  {stat.value}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.article>
  );
}
