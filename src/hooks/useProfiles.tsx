import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../services/profileService";
import { useAuthContext } from "../context/AuthContext";

export function useProfile(userId?: string) {
  const { user } = useAuthContext();
  const targetId = userId ?? user?.id;

  return useQuery({
    queryKey: ["profile", targetId],
    queryFn: () => fetchProfile(targetId!),
    enabled: !!targetId,
  });
}
