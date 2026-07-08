import { Redirect } from "expo-router";

import { useAuth } from "../src/hooks/useAuth";

export default function Index() {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/login" />;
}