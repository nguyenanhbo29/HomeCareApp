export const ENDPOINTS = {
  CATEGORY: "/categories",

  SERVICES: "/services",

  BOOKINGS: "/bookings",

  AUTH_REGISTER: "/auth/register",

  AUTH_LOGIN: "/auth/login",

  AUTH_PROFILE: "/auth/profile",

  AUTH_UPDATE_PROFILE: "/auth/profile",

  AUTH_CHANGE_PASSWORD: "/auth/change-password",

  SERVICE_DETAIL: (id: string) => `/services/${id}`,

  POPULAR_SERVICES: "/services/popular",

  RECOMMENDED_SERVICES: "/services/recommended",
};