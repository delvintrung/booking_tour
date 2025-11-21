export interface User {
  id: number;
  email: string;
  fullname: string;
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
  tourId: number;
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
  userId: number;
  orderCode: string;
  contactFullname: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  note: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  bookingDetails?: BookingDetail[];
  payment?: Payment;
}

export interface BookingDetail {
  id?: number;
  tourDetail?: TourDetail;
  tourDetailId?: number;
  tourPriceId: number;
  quantity: number;
  price: number;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Payment {
  id: number;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
