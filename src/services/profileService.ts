import { supabase } from "./supabase";

export interface Profile {
  username: string | null;
  plan: string;
}

// export async function fetchProfile(userId: string): Promise<Profile | null> {
//   const { data, error } = await supabase
//     .from("profiles")
//     .select("username, plan")
//     .eq("id", userId)
//     .single();

//   if (error) {
//     console.error("fetchProfile error", error);
//     return null;
//   }

//   return data ?? null;
// }

export async function fetchProfile(userId: string): Promise<Profile | null> {
  console.log("fetchProfile called", userId);

  const { data, error } = await supabase
    .from("profiles")
    .select("username, plan")
    .eq("id", userId)
    .single();

  console.log("fetchProfile done", { data, error });

  if (error) {
    return null;
  }
  return data ?? null;
}
