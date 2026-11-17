import type { City, Location } from './place-card';

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
