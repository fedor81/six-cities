import type { City, PlaceCard } from '../types/place-card';
import type { OfferDetail } from '../types/offer';
import type { InitialState } from './reducer';

// State selectors
export const getCity = (state: InitialState): City => state.city;
export const getOffers = (state: InitialState): PlaceCard[] => state.offers;
export const getBookmarkedOffers = (state: InitialState): PlaceCard[] =>
  state.offers.filter((offer) => offer.isBookmarked);
export const getFavoriteCount = (state: InitialState): number =>
  state.offers.filter((offer) => offer.isBookmarked).length;
export const getOffersByCity = (state: InitialState): PlaceCard[] =>
  state.offers.filter((offer) => offer.city.name === state.city.name);

// Offers-level selectors (operate on a PlaceCard[] array)
export const getBookmarkedOffersFromList = (offers: PlaceCard[]): PlaceCard[] =>
  offers.filter((offer) => offer.isBookmarked);
export const getOffersByCityName = (offers: PlaceCard[], cityName: string): PlaceCard[] =>
  offers.filter((offer) => offer.city.name === cityName);
export const getNearbyOffers = (offers: PlaceCard[], offer: OfferDetail): PlaceCard[] =>
  offers
    .filter((nearOffer) => nearOffer.id !== offer.id && nearOffer.city.name === offer.city.name)
    .slice(0, 3);
export const getUniqueCities = (offers: PlaceCard[]): string[] => {
  const cities = offers.map((offer) => offer.city.name);
  return [...new Set(cities)];
};
