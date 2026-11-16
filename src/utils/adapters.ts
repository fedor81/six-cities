import { PlaceCard, PlaceCardType, Rating } from '../types/place-card';
import type { OfferPreviewResponse } from '../types/server';

function adaptType(type: string): PlaceCardType {
  switch (type.toLowerCase()) {
    case 'room':
      return PlaceCardType.Room;
    case 'house':
      return PlaceCardType.House;
    case 'hotel':
      return PlaceCardType.Hotel;
    default:
      return PlaceCardType.Apartment;
  }
}

function adaptRating(rating: number): Rating {
  const normalized = Math.min(Math.max(Math.round(rating), 0), 5);
  return (normalized * 20) as Rating;
}

export function adaptOfferToClient(offer: OfferPreviewResponse): PlaceCard {
  return {
    id: offer.id,
    img: offer.previewImage,
    cost: offer.price,
    title: offer.title,
    type: adaptType(offer.type),
    rating: adaptRating(offer.rating),
    isPremium: offer.isPremium,
    isBookmarked: offer.isFavorite,
    city: offer.city,
    location: offer.location,
  };
}
