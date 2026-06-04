"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Settings,
  ChevronLeft,
  Sparkles,
  Bell,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Courses", icon: BookOpen, href: "/dashboard/courses" },
  { label: "Achievements", icon: Trophy, href: "/dashboard/achievements" },
  { label: "Profile", icon: User, href: "/dashboard/profile" },
  { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("/dashboard");
  const pathname = usePathname();

  return (
    <motion.nav
      animate={{ width: collapsed ? 72 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-col h-full bg-bg-surface border-r border-border-subtle relative z-20 shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border-subtle">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center shrink-0">
          <Sparkles size={14} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="font-display font-700 text-sm text-white whitespace-nowrap tracking-wide"
            >
              NeuralPath
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || activeItem === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActiveItem(item.href)}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-150 group"
            >
              {/* Active background (layoutId for smooth transition) */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-bg"
                  className="absolute inset-0 bg-accent-cyan/10 border border-accent-cyan/20 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Hover state */}
              <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-150" />

              <Icon
                size={18}
                className={`relative z-10 shrink-0 transition-colors ${
                  isActive
                    ? "text-accent-cyan"
                    : "text-slate-500 group-hover:text-slate-300"
                }`}
              />

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className={`relative z-10 whitespace-nowrap font-medium ${
                      isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="m-3 p-2 rounded-xl border border-border-subtle hover:border-border-muted hover:bg-white/[0.03] transition-all duration-150 flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <ChevronLeft size={16} className="text-slate-500" />
        </motion.div>
      </button>
    </motion.nav>
  );
}
