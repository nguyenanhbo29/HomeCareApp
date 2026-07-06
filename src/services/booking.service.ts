import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export interface CreateBookingRequest {
  service: string;
  bookingDate: string;
  bookingTime: string;
  address: string;
  note: string;
  totalPrice: number;
}

export async function createBooking(
  data: CreateBookingRequest
) {
  const response = await api.post(
    ENDPOINTS.BOOKINGS,
    data
  );

  return response.data.data;
}

export async function getBookings() {
  const response = await api.get(
    ENDPOINTS.BOOKINGS
  );

  return response.data.data;
}

export async function getBookingDetail(
  id: string
) {
  const response = await api.get(
    `${ENDPOINTS.BOOKINGS}/${id}`
  );

  return response.data.data;
}

export async function updateBooking(
  id: string,
  data: any
) {
  const response = await api.put(
    `${ENDPOINTS.BOOKINGS}/${id}`,
    data
  );

  return response.data.data;
}

export async function deleteBooking(id: string) {
  const response = await api.delete(
    `${ENDPOINTS.BOOKINGS}/${id}`
  );

  return response.data.data;
}