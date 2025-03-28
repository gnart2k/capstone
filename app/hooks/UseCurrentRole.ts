import { useSession } from "next-auth/react";

export function useCurrentRole() {
  const user = useSession();
  return user?.data?.user?.role
}

export function useCurrentUser() {
  const user = useSession();
  return user?.data?.user
}
