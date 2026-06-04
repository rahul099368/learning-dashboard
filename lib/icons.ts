import {
  Layers,
  Code2,
  Zap,
  Network,
  BookOpen,
  Brain,
  Cpu,
  Database,
  Globe,
  Lock,
  Monitor,
  Palette,
  Server,
  Terminal,
  Wifi,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  Code2,
  Zap,
  Network,
  BookOpen,
  Brain,
  Cpu,
  Database,
  Globe,
  Lock,
  Monitor,
  Palette,
  Server,
  Terminal,
  Wifi,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? BookOpen;
}
