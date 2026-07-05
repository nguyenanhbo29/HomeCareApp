export const ENDPOINTS = {
  CATEGORY: "/categories",

  SERVICES: "/services",

  SERVICE_DETAIL: (id: string) => `/services/${id}`,

  POPULAR_SERVICES: "/services/popular",

  RECOMMENDED_SERVICES: "/services/recommended",
};