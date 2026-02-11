import { account } from "@/lib/appwrite";
import { useCallback, useEffect, useState } from "react";

export const useAuthSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkSession = useCallback(async () => {
    try {
      await account.get();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    void checkSession();
  }, [checkSession]);

  return { isAuthenticated, refreshSession: checkSession };
};
