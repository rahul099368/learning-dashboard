"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { MOCK_ACTIVITY } from "@/lib/mock-data";

const INTENSITY_COLORS = [
  "bg-bg-overlay border-border-subtle",
  "bg-accent-cyan/20 border-accent-cyan/10",
  "bg-accent-cyan/40 border-accent-cyan/20",
  "bg-accent-cyan/60 border-accent-cyan/30",
  "bg-accent-cyan/85 border-accent-cyan/50",
  "bg-accent-cyan border-accent-cyan/70",
];

function getIntensity(count: number): number {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count === 3) return 3;
  if (count === 4) return 4;
  return 5;
}

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export function ActivityTile() {
  const activity = MOCK_ACTIVITY;
  const totalDays = activity.filter((d) => d.count > 0).length;
  const totalSessions = activity.reduce((a, b) => a + b.count, 0);

  // Group into weeks
  const weeks: typeof activity[] = [];
  let week: typeof activity = [];
  activity.forEach((day, i) => {
    week.push(day);
    if (week.length === 7 || i === activity.length - 1) {
      weeks.push(week);
      week = [];
    }
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{
        scale: 1.005,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="relative grain overflow-hidden rounded-2xl border border-border-subtle bg-bg-surface shadow-card p-5 lg:p-6"
      style={{ backgroundColor: "#0d1117" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(0,212,255,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-accent-cyan" />
          <h2 className="font-display font-semibold text-white text-sm">
            Learning Activity
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500 font-mono">
            <span className="text-slate-300">{totalDays}</span> active days
          </span>
          <span className="text-xs text-slate-500 font-mono">
            <span className="text-slate-300">{totalSessions}</span> sessions
          </span>
        </div>
      </div>

      {/* Day labels */}
      <div className="relative z-10 flex gap-1 mb-1 pl-0">
        <div className="flex flex-col gap-1 mr-1">
          {DAYS.map((d, i) => (
            <span key={i} className="text-[9px] text-slate-600 w-3 h-3 flex items-center">
              {d}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) => {
                const level = getIntensity(day.count);
                const colorClass = INTENSITY_COLORS[level];
                return (
                  <motion.div
                    key={di}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.5 + (wi * 7 + di) * 0.003,
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    }}
                    title={`${day.date}: ${day.count} session${day.count !== 1 ? "s" : ""}`}
                    className={`w-3 h-3 rounded-[3px] border ${colorClass} cursor-pointer hover:ring-1 hover:ring-accent-cyan/40 transition-all`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="relative z-10 flex items-center gap-1.5 mt-4 justify-end">
        <span className="text-[10px] text-slate-600">Less</span>
        {INTENSITY_COLORS.map((color, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-[2px] border ${color}`} />
        ))}
        <span className="text-[10px] text-slate-600">More</span>
      </div>
    </motion.article>
  );
}
