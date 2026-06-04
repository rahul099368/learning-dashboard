"use client";

import { motion } from "framer-motion";
import { Flame, Star, TrendingUp } from "lucide-react";
import type { UserProfile } from "@/types";

interface HeroTileProps {
  user: UserProfile;
}

function getGreeting() {
  // using suppressHydrationWarning instead
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function HeroTile({ user }: HeroTileProps) {
  const xpPercent = Math.round((user.xp / user.xp_next) * 100);
  const greeting = getGreeting();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.005 }}
      className="relative grain overflow-hidden rounded-2xl border border-border-subtle bg-bg-surface shadow-card p-6 lg:p-8"
      style={{
        background:
          "linear-gradient(135deg, #0d1117 0%, #111827 50%, #0d1523 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 10% 50%, rgba(0,212,255,0.12) 0%, transparent 60%), radial-gradient(ellipse at 90% 20%, rgba(124,58,237,0.10) 0%, transparent 60%)",
        }}
      />

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Left: greeting + level */}
        <div>
          <p className="text-slate-500 text-sm font-mono tracking-widest uppercase mb-1">
            {greeting}
          </p>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white leading-tight">
            {user.name.split(" ")[0]}{" "}
            <span
              className="neon-cyan"
              style={{
                background: "linear-gradient(90deg, #00d4ff, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {user.name.split(" ")[1]}
            </span>
          </h1>

          {/* XP bar */}
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                Level {user.level} •{" "}
                <span className="text-accent-cyan">{user.xp.toLocaleString()} XP</span>
              </span>
              <span className="text-xs text-slate-600 font-mono">
                {user.xp_next.toLocaleString()} XP
              </span>
            </div>
            <div className="h-1.5 bg-bg-overlay rounded-full overflow-hidden w-56 max-w-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #00d4ff, #7c3aed)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right: streak + stats */}
        <div className="flex items-center gap-3">
          {/* Streak badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="streak-glow flex flex-col items-center justify-center w-24 h-24 rounded-2xl border border-accent-amber/30 bg-gradient-to-br from-accent-amber/10 to-transparent"
          >
            <Flame
              size={28}
              className="text-accent-amber drop-shadow-[0_0_8px_rgba(255,183,0,0.6)]"
            />
            <span className="font-display text-2xl font-bold text-white leading-none mt-1">
              {user.streak}
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
              day streak
            </span>
          </motion.div>

          {/* Quick stats */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-overlay border border-border-subtle">
              <Star size={14} className="text-accent-violet shrink-0" />
              <span className="text-xs text-slate-400 font-medium">
                Top 12%
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-overlay border border-border-subtle">
              <TrendingUp size={14} className="text-accent-emerald shrink-0" />
              <span className="text-xs text-slate-400 font-medium">
                +18% week
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
