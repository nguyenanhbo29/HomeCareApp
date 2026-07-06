export const ENDPOINTS = {
  CATEGORY: "/categories",

  SERVICES: "/services",

  BOOKINGS: "/bookings",

  SERVICE_DETAIL: (id: string) => `/services/${id}`,

  POPULAR_SERVICES: "/services/popular",

  RECOMMENDED_SERVICES: "/services/recommended",
};