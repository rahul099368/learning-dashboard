import type { Course } from "@/types";
import { MOCK_COURSES } from "./mock-data";

/**
 * Fetches courses from Supabase.
 * Falls back to mock data if env vars are not set (local dev without Supabase).
 */
export async function fetchCourses(): Promise<{
  data: Course[];
  error: string | null;
}> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If no Supabase credentials, use mock data
  if (!supabaseUrl || !supabaseKey) {
    return { data: MOCK_COURSES, error: null };
  }

  try {
    const { createClient } = await import("./supabase/server");
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("courses")
      .select("id, title, progress, icon_name, created_at")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("[Supabase] fetchCourses error:", error.message);
      return { data: MOCK_COURSES, error: error.message };
    }

    return { data: data as Course[], error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { data: MOCK_COURSES, error: message };
  }
}
