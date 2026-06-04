# NeuralPath — Learning Dashboard

A futuristic, high-fidelity student dashboard built as part of a frontend engineering challenge. Live data is fetched from Supabase using Next.js Server Components, with buttery-smooth animations powered by Framer Motion.

**[Live Demo →](https://your-vercel-url.vercel.app)**

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Database | Supabase (PostgreSQL) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Language | TypeScript |
| Deployment | Vercel |

---

## Architecture

### Server / Client Component Split

The key decision was keeping data fetching entirely on the server:

```
app/dashboard/page.tsx          ← Server Component (async)
  └─ fetchCourses()             ← direct Supabase query, no API round-trip
       └─ <CourseGrid />        ← passes data as props to client component
            └─ <CourseCard />   ← "use client" — handles Framer Motion animations
```

`<HeroTile>`, `<StatsTile>`, and `<ActivityTile>` are `"use client"` because they use Framer Motion's `motion.*` primitives. They receive all data as props from the server page, so there are no client-side fetches.

`<Sidebar>` and `<MobileNav>` are client components because they need `usePathname()` for active link highlighting.

### Streaming with Suspense

The courses section is wrapped in `<Suspense fallback={<CourseSkeleton />}>`. This means:
- The page shell (Hero, layout) renders **immediately**
- Course tiles stream in once the Supabase query resolves
- Users see animated skeleton loaders instead of a blank screen

### Supabase Integration

```ts
// lib/supabase/server.ts — uses @supabase/ssr for cookie-aware server client
const supabase = createClient();
const { data } = await supabase.from("courses").select("*");
```

The `lib/data.ts` helper gracefully falls back to `MOCK_COURSES` if Supabase env vars are not set, making local development zero-config.

---

## Database Setup

1. Create a [Supabase](https://supabase.com) project (free tier works fine)
2. Run this SQL in the Supabase SQL Editor:

```sql
create table courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  progress    integer not null default 0,
  icon_name   text not null default 'BookOpen',
  created_at  timestamptz not null default now()
);

-- Seed data
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns',      75, 'Layers'),
  ('TypeScript Deep Dive',         42, 'Code2'),
  ('Next.js App Router',           91, 'Zap'),
  ('System Design Fundamentals',   28, 'Network');

-- Allow public read access (anon key)
alter table courses enable row level security;
create policy "Public read" on courses for select using (true);
```

3. Copy your project URL and anon key into `.env.local`

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials (or leave blank for mock data)

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/dashboard`.

---

## Animation Highlights

- **Staggered entrance**: Each bento tile fades in + translates up, delayed by `index * 0.08s`
- **Spring hover**: Cards use `type: "spring", stiffness: 300, damping: 20` for a natural bounce
- **Layout animations**: Sidebar active indicator uses Framer Motion's `layoutId` for a sliding pill effect
- **Progress bars**: Animate from `0 → value` on mount with a cubic-bezier easing
- **Activity graph**: Individual cells pop in with staggered spring animations
- **Zero layout shifts**: All animations use only `transform` (scale, translateY) and `opacity` — no width/height/margin changes that would trigger repaints

---

## Responsive Behavior

| Viewport | Sidebar | Grid |
|----------|---------|------|
| `> 1024px` | Full labels visible | 3-column bento |
| `768–1024px` | Icons only (collapsed) | 2-column |
| `< 768px` | Bottom nav bar | Single column |

---

## Challenges & Decisions

**Server vs. Client boundary**: Framer Motion requires `"use client"`, but data fetching is best kept server-side. The solution was a thin Server Component layer that fetches and passes typed props down to animated client components — giving us both RSC performance and rich animations.

**Icon serialization**: Supabase stores icon names as strings (e.g. `"Layers"`). A `lib/icons.ts` map resolves these to actual Lucide components at render time without sending the entire icon library to the client.

**Graceful degradation**: The app works fully without Supabase credentials by falling back to mock data — useful for reviewers who want to run it locally without a database setup.
