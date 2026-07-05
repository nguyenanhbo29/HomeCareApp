import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

import { Service } from "../modules/home/types/home";

export async function getAllServices(): Promise<Service[]> {
  const response = await api.get(ENDPOINTS.SERVICES);

  return response.data.data;
}

export async function getPopularServices(): Promise<Service[]> {
  const response = await api.get(
    ENDPOINTS.POPULAR_SERVICES
  );

  return response.data.data;
}

export async function getRecommendedServices(): Promise<Service[]> {
  const response = await api.get(
    ENDPOINTS.RECOMMENDED_SERVICES
  );

  return response.data.data;
}

export async function getServiceDetail(
  id: string
): Promise<Service> {
  const response = await api.get(
    ENDPOINTS.SERVICE_DETAIL(id)
  );

  return response.data.data;
}