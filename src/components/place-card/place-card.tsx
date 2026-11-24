import React from 'react';

import type { PlaceCard } from '../../types/place-card';
import OfferCardBody from '../offer-card/offer-card-body';

type PlaceCardProps = PlaceCard & {
  isActive: boolean;
  onHover: (offerId: string | null) => void;
};

function PlaceCardInner({
  id,
  img,
  cost,
  title,
  type,
  rating,
  isPremium,
  isBookmarked,
  isActive,
  onHover,
}: PlaceCardProps): JSX.Element {
  return (
    <article
      className={`cities__card place-card ${isActive ? 'place-card--active' : ''}`}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      <OfferCardBody
        isPremium={isPremium}
        rating={rating}
        cost={cost}
        title={title}
        type={type}
        imgSrc={img}
        offerId={id}
        bookmarkActive={isBookmarked}
      />
    </article>
  );
}

const PlaceCard = React.memo(PlaceCardInner);

export default PlaceCard;
