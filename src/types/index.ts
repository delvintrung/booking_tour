export interface User {
  id: number;
  email: string;
  fullName: string;
  password?: string;
  phone?: string;
  id_role?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  avatarUrl?: string;
}

export interface Tour {
  id: number;
  imageUrl: string;
  price: number;
  duration?: string;
  location?: string;
  longDesc?: string;
  shortDesc?: string;
  title: string;
  rating?: number;
  capacity?: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: number;
  updatedBy?: number;
  tourDetails?: TourDetail[];
}

export interface TourDetail {
  id: number;
  id_tour: number;
  startDay: string;
  endDay: string;
  status: string;
  startLocation: string;
  createdAt: string;
  updatedAt: string;
  tourPrices?: Price[];
}

interface Price {
  id: number;
  price: number;
  priceType: string;
  tour_detail_id: number;
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
  createdAt: string;
  updatedAt: string;
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
