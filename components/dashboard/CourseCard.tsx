"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icons";
import type { Course } from "@/types";

const CARD_GRADIENTS = [
  "from-accent-cyan/10 via-transparent to-accent-violet/5",
  "from-accent-violet/10 via-transparent to-accent-rose/5",
  "from-accent-emerald/10 via-transparent to-accent-cyan/5",
  "from-accent-amber/10 via-transparent to-accent-rose/5",
];

const ICON_COLORS = [
  "text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20",
  "text-accent-violet bg-accent-violet/10 border-accent-violet/20",
  "text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20",
  "text-accent-amber bg-accent-amber/10 border-accent-amber/20",
];

const PROGRESS_COLORS = [
  "from-accent-cyan to-accent-violet",
  "from-accent-violet to-accent-rose",
  "from-accent-emerald to-accent-cyan",
  "from-accent-amber to-accent-rose",
];

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  const Icon = getIcon(course.icon_name);
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  const iconColor = ICON_COLORS[index % ICON_COLORS.length];
  const progressColor = PROGRESS_COLORS[index % PROGRESS_COLORS.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={`relative grain group overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-br ${gradient} bg-bg-surface cursor-pointer shadow-card p-5`}
      style={{ backgroundColor: "#0d1117" }}
    >
      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(124,58,237,0.05))",
          boxShadow: "inset 0 0 0 1px rgba(0,212,255,0.15)",
        }}
      />

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${iconColor} mb-4`}
      >
        <Icon size={18} />
      </div>

      {/* Title */}
      <h3 className="font-display font-semibold text-white text-sm leading-snug mb-1 pr-6">
        {course.title}
      </h3>

      {/* Progress text */}
      <div className="flex items-center justify-between mb-2 mt-3">
        <span className="text-xs text-slate-500 font-mono">Progress</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.08 + 0.4 }}
          className="text-xs font-mono text-slate-300"
        >
          {course.progress}%
        </motion.span>
      </div>

      {/* Animated progress bar */}
      <div className="h-1 bg-bg-overlay rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${course.progress}%` }}
          transition={{
            duration: 1.0,
            delay: index * 0.08 + 0.3,
            ease: [0.23, 1, 0.32, 1],
          }}
          className={`h-full rounded-full bg-gradient-to-r ${progressColor}`}
        />
      </div>

      {/* Arrow on hover */}
      <motion.div
        initial={{ opacity: 0, x: -4 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute bottom-4 right-4 text-slate-600 group-hover:text-slate-400 transition-colors"
      >
        <ArrowRight size={14} />
      </motion.div>
    </motion.article>
  );
}
