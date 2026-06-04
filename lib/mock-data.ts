import type { Course, ActivityDay } from "@/types";

export const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    progress: 75,
    icon_name: "Layers",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "TypeScript Deep Dive",
    progress: 42,
    icon_name: "Code2",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Next.js App Router",
    progress: 91,
    icon_name: "Zap",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "System Design Fundamentals",
    progress: 28,
    icon_name: "Network",
    created_at: new Date().toISOString(),
  },
];

export const MOCK_ACTIVITY: ActivityDay[] = (() => {
  const days: ActivityDay[] = [];
  const now = new Date();
  for (let i = 90; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days.push({
      date: d.toISOString().split("T")[0],
      count: Math.random() > 0.35 ? Math.floor(Math.random() * 6) + 1 : 0,
    });
  }
  return days;
})();
