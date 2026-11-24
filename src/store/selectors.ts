import { createSelector } from '@reduxjs/toolkit';

import type { City, PlaceCard } from '../types/place-card';
import type { OfferDetail } from '../types/offer';
import type { RootState } from './index';

// State selectors
export const getCity = (state: RootState): City => state.data.city;
export const getOffers = (state: RootState): PlaceCard[] => state.data.offers;

export const getBookmarkedOffers = createSelector([getOffers], (offers) =>
  offers.filter((offer) => offer.isBookmarked)
);

export const getFavoriteCount = createSelector([getOffers], (offers) =>
  offers.filter((offer) => offer.isBookmarked).length
);

export const getOffersByCity = createSelector([getOffers, getCity], (offers, city) =>
  offers.filter((offer) => offer.city.name === city.name)
);

export const getHeaderState = createSelector(
  [(state: RootState) => state.user.authorizationStatus, (state: RootState) => state.user.user, getFavoriteCount],
  (authorizationStatus, user, favoriteCount) => ({ authorizationStatus, user, favoriteCount })
);

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
export const groupOffersByCity = (offers: PlaceCard[]): Record<string, PlaceCard[]> => {
  const result: Record<string, PlaceCard[]> = {};

  for (const offer of offers) {
    const cityName = offer.city.name;
    if (!result[cityName]) {
      result[cityName] = [];
    }
    result[cityName].push(offer);
  }

  return result;
};
