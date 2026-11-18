import type { City, Location } from './place-card';

export type LoginData = {
  email: string;
  password: string;
};

export type AuthInfoResponse = {
  email: string;
  name: string;
  avatarUrl: string;
  isPro: boolean;
  token: string;
};

export type OfferPreviewResponse = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type UserResponse = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type ReviewResponse = {
  id: string;
  date: string;
  user: UserResponse;
  comment: string;
  rating: number;
};

export type OfferDetailResponse = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  images: string[];
  goods: string[];
  host: UserResponse;
  bedrooms: number;
  maxAdults: number;
};
