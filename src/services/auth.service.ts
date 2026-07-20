import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
}

export interface AuthPayload {
  token: string;
  user: AuthUser;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthPayload;
}

export async function register(
  data: RegisterRequest,
): Promise<AuthResponse> {
  const response = await api.post(
    ENDPOINTS.AUTH_REGISTER,
    data,
  );

  return response.data;
}

export async function login(
  data: LoginRequest,
): Promise<AuthResponse> {
  const response = await api.post(
    ENDPOINTS.AUTH_LOGIN,
    data,
  );

  return response.data;
}

export async function logout(): Promise<void> {
  // Frontend only
}

export async function getProfile(): Promise<AuthUser> {
  const response = await api.get(
    ENDPOINTS.AUTH_PROFILE,
  );

  return response.data.data;
}

export async function updateProfile(
  data: Partial<
    Pick<AuthUser, "fullName" | "phone" | "avatar">
  >,
): Promise<AuthUser> {
  const response = await api.put(
    ENDPOINTS.AUTH_UPDATE_PROFILE,
    data,
  );

  return response.data.data;
}

export async function changePassword(
  oldPassword: string,
  newPassword: string,
): Promise<void> {
  await api.put(
    ENDPOINTS.AUTH_CHANGE_PASSWORD,
    {
      oldPassword,
      newPassword,
    },
  );
}