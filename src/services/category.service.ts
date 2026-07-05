import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export async function getCategories(): Promise<Category[]> {
  const response = await api.get(ENDPOINTS.CATEGORY);


  return response.data.data;
}