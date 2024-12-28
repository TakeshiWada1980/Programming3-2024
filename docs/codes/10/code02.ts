// src/app/_hooks/useRouteGuard.ts
import { useAuth } from "@/app/_hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRouteGuard = () => {
  const router = useRouter();
  const { isLoading, session } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    // ログインしていないときはログインページにリダイレクト
    if (session === null) {
      router.replace("/login");
    }
  }, [isLoading, router, session]);

  return { isAuthenticated: session !== null };
};
