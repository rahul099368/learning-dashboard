-- Run this in your Supabase SQL Editor (https://app.supabase.com → SQL Editor)

-- Create courses table
create table if not exists courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  progress    integer not null default 0 check (progress >= 0 and progress <= 100),
  icon_name   text not null default 'BookOpen',
  created_at  timestamptz not null default now()
);

-- Seed with sample courses
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns',      75, 'Layers'),
  ('TypeScript Deep Dive',         42, 'Code2'),
  ('Next.js App Router',           91, 'Zap'),
  ('System Design Fundamentals',   28, 'Network');

-- Enable Row Level Security
alter table courses enable row level security;

-- Allow anyone with the anon key to read courses
create policy "Allow public read access"
  on courses for select
  using (true);
