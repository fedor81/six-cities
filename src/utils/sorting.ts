import { SortingType } from '../const';
import type { PlaceCard } from '../types/place-card';

export function sortOffers(offers: PlaceCard[], sorting: SortingType): PlaceCard[] {
  const sortedOffers = [...offers];

  switch (sorting) {
    case SortingType.PriceLowToHigh:
      return sortedOffers.sort((first, second) => first.cost - second.cost);
    case SortingType.PriceHighToLow:
      return sortedOffers.sort((first, second) => second.cost - first.cost);
    case SortingType.TopRatedFirst:
      return sortedOffers.sort((first, second) => second.rating - first.rating);
    default:
      return sortedOffers;
  }
}
