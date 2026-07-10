import { Redirect } from "expo-router";

import { useAuth } from "../src/hooks/useAuth";

export default function Index() {
  const {
    loading,
    isAuthenticated,
    currentUser,
  } = useAuth();

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    if (currentUser?.role === "Admin") {
      return <Redirect href="/admin/dashboard" />;
    }
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/login" />;
}