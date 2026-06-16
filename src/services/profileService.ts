import { supabase } from "./supabase";

export interface Profile {
  username: string | null;
  plan: string;
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("username, plan")
    .eq("id", userId)
    .single();

  if (error) {
    return null;
  }
  return data ?? null;
}
