// src/hooks/useProfile.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../services/supabase";
import { useAuthContext } from "../context/AuthContext";

export function useProfile() {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
    enabled: !!user?.id,
  });
}
