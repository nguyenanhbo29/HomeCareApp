import {
  useEffect,
  useState,
} from "react";

import { Booking } from "../modules/booking/types/booking";

import {
  getBookingDetail,
} from "../services/booking.service";

export default function useBookingDetail(
  id?: string
) {
  const [booking, setBooking] =
    useState<Booking | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  async function fetchBooking() {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data =
        await getBookingDetail(id);

      setBooking(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to load booking."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooking();
  }, [id]);

  return {
    booking,
    loading,
    error,

    refresh: fetchBooking,
  };
}