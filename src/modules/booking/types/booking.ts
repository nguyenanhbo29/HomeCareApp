export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export type PaymentStatus =
  | "Paid"
  | "Unpaid";

/**
 * Form dùng để tạo booking
 */
export interface BookingForm {
  serviceId: string;

  bookingDate: string;

  bookingTime: string;

  address: string;

  note: string;
}

/**
 * Thông tin service trong booking
 */
export interface BookingService {
  _id: string;

  name: string;

  image: string;

  duration: string;

  price: number;
}

/**
 * Dùng cho Booking Summary component
 */
export interface BookingSummary {
  service: string;

  duration: string;

  rate: number;

  total: number;
}

/**
 * Booking trả về từ API
 */
export interface Booking {
  _id: string;

  service: BookingService;

  bookingDate: string;

  bookingTime: string;

  address: string;

  note?: string;

  totalPrice: number;

  status: BookingStatus;

  paymentStatus: PaymentStatus;

  user?: {
    fullName: string;
    email: string;
    phone: string;
  } | string;

  createdAt: string;

  updatedAt: string;
}