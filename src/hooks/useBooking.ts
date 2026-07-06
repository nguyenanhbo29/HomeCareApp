import { useState } from "react";

import {
  createBooking,
  CreateBookingRequest,
} from "../services/booking.service";

export default function useBooking() {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function book(
    data: CreateBookingRequest
  ) {
    try {
      setLoading(true);
      setError(null);

      const booking =
        await createBooking(data);

      return booking;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ??
        "Booking failed.";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  }

  function resetError() {
    setError(null);
  }

  return {
    loading,
    error,

    book,

    resetError,
  };
}