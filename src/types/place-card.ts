export type Rating = 0 | 20 | 40 | 60 | 80 | 100;

export type Location = Readonly<{
  latitude: number;
  longitude: number;
  zoom: number;
}>;

export type City = {
  name: string;
  location: Location;
};

export type PlaceCard = {
  id: string;
  img: string;
  cost: number;
  title: string;
  type: PlaceCardType;
  rating: Rating;
  isPremium: boolean;
  isBookmarked: boolean;
  city: City;
};

export enum PlaceCardType {
  Apartment = 'Apartment',
  Room = 'Room',
}
