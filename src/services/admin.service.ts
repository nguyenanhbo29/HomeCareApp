import api from "../api/axios";
import { Booking } from "../modules/booking/types/booking";

export interface AdminUser {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  status: "Active" | "Blocked";
  createdAt: string;
}

export interface AdminStats {
  totalBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  monthlyRevenue: number[];
  topServices: Array<{
    name: string;
    count: number;
    revenue: number;
  }>;
  newCustomersCount: number;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
  icon?: string;
}

/**
 * Fetch all users for Admin
 */
export async function getAdminUsers(search?: string): Promise<AdminUser[]> {
  const url = search ? `/users?search=${encodeURIComponent(search)}` : "/users";
  const response = await api.get(url);
  return response.data.data;
}

/**
 * Update user status (Active/Blocked)
 */
export async function updateUserStatus(
  userId: string,
  status: "Active" | "Blocked"
): Promise<AdminUser> {
  const response = await api.put(`/users/${userId}/status`, { status });
  return response.data.data;
}

/**
 * Fetch advanced system stats
 */
export async function getAdvancedStats(): Promise<AdminStats> {
  const response = await api.get("/bookings/admin/stats");
  return response.data.data;
}

/**
 * Fetch list of categories
 */
export async function getCategories(): Promise<Category[]> {
  const response = await api.get("/categories");
  return response.data.data;
}

/**
 * Create a new service
 */
export async function createService(serviceData: any): Promise<any> {
  const response = await api.post("/services", serviceData);
  return response.data.data;
}

/**
 * Update an existing service
 */
export async function updateService(id: string, serviceData: any): Promise<any> {
  const response = await api.put(`/services/${id}`, serviceData);
  return response.data.data;
}

/**
 * Delete a service
 */
export async function deleteService(id: string): Promise<any> {
  const response = await api.delete(`/services/${id}`);
  return response.data;
}
