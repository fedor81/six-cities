import { PlaceCard, PlaceCardType, Rating } from '../types/place-card';
import { OfferDetail, Review, User } from '../types/offer';

export const mockOffers: PlaceCard[] = [
  {
    id: 'offer-1',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cost: 180,
    title: 'Nice, cozy, warm big bed apartment',
    type: PlaceCardType.Apartment,
    rating: 80,
    isPremium: true,
    isBookmarked: true,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.354367,
        longitude: 4.677622,
        zoom: 13,
      },
    },
  },
  {
    id: 'offer-2',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cost: 80,
    title: 'Wood and stone place',
    type: PlaceCardType.Room,
    rating: 60,
    isPremium: false,
    isBookmarked: true,
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13,
      },
    },
  },
  {
    id: 'offer-3',
    img: 'https://images.unsplash.com/photo-1780427670049-43aa7921e3f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cost: 250,
    title: 'Canal view parka. Antwerp',
    type: PlaceCardType.Apartment,
    rating: 100,
    isPremium: true,
    isBookmarked: true,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3672523,
        longitude: 4.903096,
        zoom: 12,
      },
    },
  },
];

const mockUsers: Record<string, User> = {
  'user-1': {
    name: 'Angelina',
    avatarUrl: 'img/avatar-angelina.jpg',
    isPro: true,
  },
  'user-2': {
    name: 'Max',
    avatarUrl: 'img/avatar-max.jpg',
    isPro: false,
  },
  'user-3': {
    name: 'Oliver',
    avatarUrl: 'img/avatar-oliver.jpg',
    isPro: true,
  },
  'user-4': {
    name: 'Sophia',
    avatarUrl: 'img/avatar-sophia.jpg',
    isPro: false,
  },
  'user-5': {
    name: 'Daniel',
    avatarUrl: 'img/avatar-daniel.jpg',
    isPro: true,
  },
};

const mockReviews: Record<string, Review[]> = {
  'offer-1': [
    {
      id: 'review-1',
      date: '2019-05-08T14:13:56.569Z',
      user: mockUsers['user-2'],
      comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      rating: 4,
    },
    {
      id: 'review-2',
      date: '2019-04-29T14:13:56.569Z',
      user: mockUsers['user-3'],
      comment: 'Excellent! The apartment is exactly as described - spacious, clean, and in a great location.',
      rating: 5,
    },
  ],
  'offer-2': [
    {
      id: 'review-3',
      date: '2020-08-02T14:13:56.569Z',
      user: mockUsers['user-4'],
      comment: 'Great place for a short stay. The room was cozy and clean.',
      rating: 3,
    },
  ],
  'offer-3': [
    {
      id: 'review-4',
      date: '2021-03-15T14:13:56.569Z',
      user: mockUsers['user-5'],
      comment: 'Amazing canal view! The apartment exceeded all expectations.',
      rating: 5,
    },
    {
      id: 'review-5',
      date: '2021-02-20T14:13:56.569Z',
      user: mockUsers['user-2'],
      comment: 'Wonderful stay. Highly recommend for anyone visiting Antwerp.',
      rating: 4,
    },
    {
      id: 'review-6',
      date: '2021-01-10T14:13:56.569Z',
      user: mockUsers['user-1'],
      comment: 'Beautiful apartment with stunning views. Will definitely come back.',
      rating: 5,
    },
  ],
  'offer-4': [],
};

export const mockOfferDetails: Record<string, OfferDetail> = {
  'offer-1': {
    id: 'offer-1',
    title: 'Nice, cozy, warm big bed apartment',
    type: PlaceCardType.Apartment,
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cost: 180,
    rating: 80 as Rating,
    isPremium: true,
    isBookmarked: true,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.354367,
        longitude: 4.677622,
        zoom: 13,
      },
    },
    description:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    images: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
    ],
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cable TV', 'Fridge'],
    host: mockUsers['user-1'],
    bedrooms: 3,
    maxAdults: 4,
    reviews: mockReviews['offer-1'],
  },
  'offer-2': {
    id: 'offer-2',
    title: 'Wood and stone place',
    type: PlaceCardType.Room,
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cost: 80,
    rating: 60 as Rating,
    isPremium: false,
    isBookmarked: true,
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13,
      },
    },
    description:
      'A neat little room in a great location in Cologne. The wooden and stone decor gives it a unique charm. Perfect for a solo traveler or a couple.',
    images: [
      'img/apartment-01.jpg',
      'img/room.jpg',
      'img/apartment-02.jpg',
      'img/studio-01.jpg',
      'img/apartment-03.jpg',
      'img/apartment-01.jpg',
    ],
    goods: ['Wi-Fi', 'Heating', 'Baby seat', 'Kitchen'],
    host: mockUsers['user-3'],
    bedrooms: 1,
    maxAdults: 2,
    reviews: mockReviews['offer-2'],
  },
  'offer-3': {
    id: 'offer-3',
    title: 'Canal view parka. Antwerp',
    type: PlaceCardType.Apartment,
    img: 'https://images.unsplash.com/photo-1780427670049-43aa7921e3f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cost: 250,
    rating: 100 as Rating,
    isPremium: true,
    isBookmarked: true,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3672523,
        longitude: 4.903096,
        zoom: 12,
      },
    },
    description:
      'Stunning apartment with direct canal views in the heart of Antwerp. Recently renovated with modern amenities while preserving its historic charm. Walking distance to all major attractions.',
    images: [
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/room.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
    ],
    goods: ['Wi-Fi', 'Washing machine', 'Kitchen', 'Dishwasher', 'Fridge', 'Cable TV', 'Heating'],
    host: mockUsers['user-5'],
    bedrooms: 2,
    maxAdults: 3,
    reviews: mockReviews['offer-3'],
  },
  'offer-4': {
    id: 'offer-4',
    title: 'The house among olive trees',
    type: PlaceCardType.Room,
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cost: 600,
    rating: 40 as Rating,
    isPremium: false,
    isBookmarked: false,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    description:
      'A charming room in a historic house surrounded by olive trees in the suburbs of Paris. A unique experience away from the tourist crowds.',
    images: [
      'img/studio-01.jpg',
      'img/apartment-03.jpg',
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/room.jpg',
    ],
    goods: ['Heating', 'Kitchen', 'Towels'],
    host: mockUsers['user-4'],
    bedrooms: 1,
    maxAdults: 2,
    reviews: mockReviews['offer-4'],
  },
};
