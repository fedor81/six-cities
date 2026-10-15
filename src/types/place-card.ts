export type Rating = 0 | 20 | 40 | 60 | 80 | 100;

export type PlaceCard = {
  id: string;
  img: string;
  cost: number;
  title: string;
  type: PlaceCardType;
  rating: Rating;
  isPremium: boolean;
  isBookmarked: boolean;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
};

export enum PlaceCardType {
  Apartment = 'Apartment',
  Room = 'Room',
}
