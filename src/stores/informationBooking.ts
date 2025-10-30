import { create } from "zustand";

interface BookingState {
  bookingInfo: {
    contactInfo: {
      fullName: string;
      phone: string;
      email: string;
      address: string;
    } | null;
    passengers: {
      adults: number;
      children: number;
    } | null;
  };
  setBookingInfo: (info: any) => void;
  clearBookingInfo: () => void;
}

export const useBookingInfoStore = create<BookingState>((set) => ({
  bookingInfo: {
    contactInfo: null,
    passengers: null,
  },
  setBookingInfo: (info) => set({ bookingInfo: info }),
  clearBookingInfo: () =>
    set({ bookingInfo: { contactInfo: null, passengers: null } }),
}));
