import { supabase } from "./supabase";

export interface Profile {
  id: string;
  username: string | null;
  name: string | null;
  surname: string | null;
  date_of_birth: string | null;
  bio: string | null;
  plan: string | null;
  created_at: string;
}

export async function fetchProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }
  return data as Profile;
}
