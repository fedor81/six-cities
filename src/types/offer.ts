import { PlaceCard, PlaceCardType } from './place-card';

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Review = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export type OfferDetail = PlaceCard & {
  description: string;
  images: string[];
  isPremium: boolean;
  type: PlaceCardType;
  goods: string[]; // amenities
  host: User;
  bedrooms: number;
  maxAdults: number;
  reviews: Review[];
};
