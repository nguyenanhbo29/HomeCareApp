import axiosClient from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const serviceService = {
  getPopular: async () => {
    const response = await axiosClient.get(
      ENDPOINTS.POPULAR_SERVICES
    );
    return response.data;
  },

  getRecommended: async () => {
    const response = await axiosClient.get(
      ENDPOINTS.RECOMMENDED_SERVICES
    );
    return response.data;
  },

  getAll: async () => {
    const response = await axiosClient.get(
      ENDPOINTS.SERVICES
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosClient.get(
      `${ENDPOINTS.SERVICES}/${id}`
    );
    return response.data;
  },
};