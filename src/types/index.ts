export interface User {
  name: string;
  email: string;
}

export interface Tour {
  id: number;
  imageUrl: string;
  price: string;
  duration?: string;
  location?: string;
  title: string;
  departurePoint: string;
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
