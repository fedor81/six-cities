import { PlaceCard, PlaceCardType, Rating } from '../types/place-card';
import type { OfferDetailResponse, OfferPreviewResponse, ReviewResponse, UserResponse } from '../types/server';
import type { OfferDetail, Review, User } from '../types/offer';

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
  return [0, 20, 40, 60, 80, 100][normalized] as Rating;
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

function adaptUser(serverUser: UserResponse): User {
  return {
    name: serverUser.name,
    avatarUrl: serverUser.avatarUrl,
    isPro: serverUser.isPro,
  };
}

export function adaptReviewToClient(serverReview: ReviewResponse): Review {
  return {
    id: serverReview.id,
    date: serverReview.date,
    user: adaptUser(serverReview.user),
    comment: serverReview.comment,
    rating: serverReview.rating as Review['rating'],
  };
}

export function adaptOfferDetailToClient(offer: OfferDetailResponse, reviews: ReviewResponse[]): OfferDetail {
  return {
    id: offer.id,
    img: offer.images[0] ?? '',
    cost: offer.price,
    title: offer.title,
    type: adaptType(offer.type),
    rating: adaptRating(offer.rating),
    isPremium: offer.isPremium,
    isBookmarked: offer.isFavorite,
    city: offer.city,
    location: offer.location,
    description: offer.description,
    images: offer.images,
    goods: offer.goods,
    host: adaptUser(offer.host),
    bedrooms: offer.bedrooms,
    maxAdults: offer.maxAdults,
    reviews: reviews.map(adaptReviewToClient),
  };
}
