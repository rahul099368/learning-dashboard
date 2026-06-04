export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface UserProfile {
  name: string;
  streak: number;
  avatar_url?: string;
  level: number;
  xp: number;
  xp_next: number;
}

export interface NavItem {
  label: string;
  icon: string;
  href: string;
}

export interface ActivityDay {
  date: string;
  count: number;
}
