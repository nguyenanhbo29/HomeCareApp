import {
  useEffect,
  useState,
} from "react";

import {
  getMyBookings,
} from "../services/booking.service";

import {
  Booking,
} from "../modules/booking/types/booking";

export default function useBookings() {
  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  async function fetchBookings() {
    try {
      setLoading(true);

      setError(null);

      const data =
        await getMyBookings();

      setBookings(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to load bookings."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,

    loading,

    error,

    refresh: fetchBookings,
  };
}