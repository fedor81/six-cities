import { SortingType } from '../const';
import type { PlaceCard } from '../types/place-card';

export function sortOffers(offers: PlaceCard[], sorting: SortingType): PlaceCard[] {
  switch (sorting) {
    case SortingType.PriceLowToHigh:
      return [...offers].sort((first, second) => first.cost - second.cost);
    case SortingType.PriceHighToLow:
      return [...offers].sort((first, second) => second.cost - first.cost);
    case SortingType.TopRatedFirst:
      return [...offers].sort((first, second) => second.rating - first.rating);
    default:
      return offers;
  }
}
