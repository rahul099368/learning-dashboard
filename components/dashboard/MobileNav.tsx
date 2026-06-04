"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, Trophy, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MOBILE_NAV = [
  { label: "Home", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Courses", icon: BookOpen, href: "/dashboard/courses" },
  { label: "Wins", icon: Trophy, href: "/dashboard/achievements" },
  { label: "Profile", icon: User, href: "/dashboard/profile" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-surface/95 backdrop-blur-xl border-t border-border-subtle">
      <div className="flex items-center justify-around px-2 py-2">
        {MOBILE_NAV.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl relative"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-active"
                  className="absolute inset-0 bg-accent-cyan/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                className={`relative z-10 transition-colors ${
                  isActive ? "text-accent-cyan" : "text-slate-500"
                }`}
              />
              <span
                className={`relative z-10 text-[10px] font-medium transition-colors ${
                  isActive ? "text-accent-cyan" : "text-slate-600"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
