import { useState } from "react";

import { updateBooking } from "../services/booking.service";

export default function useCancelBooking() {
  const [loading, setLoading] = useState(false);

  async function cancelBooking(id: string) {
    try {
      setLoading(true);

      return await updateBooking(id, {
        status: "Cancelled",
      });
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    cancelBooking,
  };
}