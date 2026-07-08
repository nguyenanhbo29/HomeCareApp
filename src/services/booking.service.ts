import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

import {
  Booking,
} from "../modules/booking/types/booking";

export interface CreateBookingRequest {
  service: string;

  bookingDate: string;

  bookingTime: string;

  address: string;

  note: string;

  totalPrice: number;
}

export interface UpdateBookingRequest {
  status?: Booking["status"];

  paymentStatus?: Booking["paymentStatus"];

  address?: string;

  note?: string;

  bookingDate?: string;

  bookingTime?: string;

  totalPrice?: number;
}

export async function createBooking(
  data: CreateBookingRequest
): Promise<Booking> {
  const response = await api.post(
    ENDPOINTS.BOOKINGS,
    data
  );

  return response.data.data;
}

export async function getBookings(): Promise<
  Booking[]
> {
  const response = await api.get(
    ENDPOINTS.BOOKINGS
  );

  return response.data.data;
}

export async function getBookingDetail(
  id: string
): Promise<Booking> {
  const response = await api.get(
    `${ENDPOINTS.BOOKINGS}/${id}`
  );

  return response.data.data;
}

export async function updateBooking(
  id: string,
  data: UpdateBookingRequest
): Promise<Booking> {
  const response = await api.put(
    `${ENDPOINTS.BOOKINGS}/${id}`,
    data
  );

  return response.data.data;
}

export async function deleteBooking(
  id: string
): Promise<void> {
  await api.delete(
    `${ENDPOINTS.BOOKINGS}/${id}`
  );
}