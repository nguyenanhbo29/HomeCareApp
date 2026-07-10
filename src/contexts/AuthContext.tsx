import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../api/axios";

import {
  AuthResponse,
  AuthUser,
  login as loginService,
  register as registerService,
} from "../services/auth.service";

interface AuthContextValue {
  currentUser: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<AuthUser>;

  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<AuthUser>;

  logout: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] =
    useState<AuthUser | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function restoreAuth() {
      try {
        const storedToken =
          await AsyncStorage.getItem(
            "HOMECARE_TOKEN"
          );

        const storedUser =
          await AsyncStorage.getItem(
            "HOMECARE_USER"
          );

        if (storedToken && storedUser) {
          api.defaults.headers.common.Authorization =
            `Bearer ${storedToken}`;

          setToken(storedToken);
          setCurrentUser(
            JSON.parse(storedUser)
          );
        }
      } finally {
        setLoading(false);
      }
    }

    restoreAuth();
  }, []);

  async function login(
    email: string,
    password: string
  ) {
    const response: AuthResponse =
      await loginService({
        email,
        password,
      });

    const token =
      response.data.token;

    const user =
      response.data.user;

    api.defaults.headers.common.Authorization =
      `Bearer ${token}`;

    await AsyncStorage.setItem(
      "HOMECARE_TOKEN",
      token
    );

    await AsyncStorage.setItem(
      "HOMECARE_USER",
      JSON.stringify(user)
    );

    setToken(token);
    setCurrentUser(user);
    return user;
  }

  async function register(
    fullName: string,
    email: string,
    password: string
  ) {
    const response: AuthResponse =
      await registerService({
        fullName,
        email,
        password,
      });

    const token =
      response.data.token;

    const user =
      response.data.user;

    api.defaults.headers.common.Authorization =
      `Bearer ${token}`;

    await AsyncStorage.setItem(
      "HOMECARE_TOKEN",
      token
    );

    await AsyncStorage.setItem(
      "HOMECARE_USER",
      JSON.stringify(user)
    );

    setToken(token);
    setCurrentUser(user);
    return user;
  }

  async function logout() {
    await AsyncStorage.removeItem(
      "HOMECARE_TOKEN"
    );

    await AsyncStorage.removeItem(
      "HOMECARE_USER"
    );

    delete api.defaults.headers.common
      .Authorization;

    setToken(null);
    setCurrentUser(null);
  }

  const value = useMemo(
    () => ({
      currentUser,
      token,
      isAuthenticated:
        Boolean(currentUser) &&
        Boolean(token),
      loading,
      login,
      register,
      logout,
    }),
    [
      currentUser,
      token,
      loading,
    ]
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context =
    React.useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within AuthProvider"
    );
  }

  return context;
}