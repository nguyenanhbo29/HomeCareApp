import { useCallback } from "react";
import { useAuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const { currentUser, token, isAuthenticated, loading, login, logout, register } = useAuthContext();

  const signIn = useCallback(
    async (email: string, password: string) => {
      return await login(email, password);
    },
    [login],
  );

  const signUp = useCallback(
    async (fullName: string, email: string, password: string) => {
      return await register(fullName, email, password);
    },
    [register],
  );

  const signOut = useCallback(async () => {
    await logout();
  }, [logout]);

  return {
    currentUser,
    token,
    isAuthenticated,
    loading,
    signIn,
    signUp,
    signOut,
  };
}
