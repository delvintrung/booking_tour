export interface User {
  name: string;
  email: string;
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
  days?: string;
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
  id: number;
  imageUrl: string;
  tag: string;
  title?: string | null;
  rating?: number;
  tall?: boolean;
}
