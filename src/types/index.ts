export interface User {
  id: number;
  email: string;
  fullName: string;
  password?: string;
  phone: string;
  id_role: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
}

export interface Tour {
  id: number;
  imageUrl: string;
  price: number;
  duration?: string;
  location?: string;
  title: string;
  departurePoint?: string;
  rating?: number;
}

export interface Promotion {
  id: number;
  imageUrl: string;
  discount: number;
  locationTag: string;
  title: string;
  originalPrice: string;
  discountedPrice: string;
}

export interface Destination {
  id?: number;
  image: string;
  title: string | null;
  duration?: string;
  location: string;
  price?: string;
  rating?: number;
  startPoint?: string;
  tall?: boolean;
  keyName?: string;
}

export interface Booking {
  id: number;
  id_user: number;
  totalPrice: number;
  note: string;
  status: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingDetail {
  id: number;
  id_booking: number;
  id_tourDetail: number;
  quantity: number;
  price: number;
  status: string;
}

export interface Payment {
  id: number;
  id_booking: number;
  amount: number;
  provider: string;

  method: string;
  status: string;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
}
