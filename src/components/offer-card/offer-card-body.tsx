import { Link } from 'react-router-dom';

import type { PlaceCardType, Rating } from '../../types/place-card';
import { AppRoute } from '../../const';
import RatingBar from './rating-bar';
import PriceBlock from './price-block';

type OfferCardBodyProps = {
  isPremium: boolean;
  rating: Rating;
  cost: number;
  title: string;
  type: PlaceCardType;
  imgSrc: string;
  offerId: string;
  bookmarkActive: boolean;
  imgWidth?: number;
  imgHeight?: number;
};

function OfferCardBody({
  isPremium,
  rating,
  cost,
  title,
  type,
  imgSrc,
  offerId,
  bookmarkActive,
  imgWidth = 260,
  imgHeight = 200,
}: OfferCardBodyProps): JSX.Element {
  return (
    <>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${offerId}`}>
          <img
            className="place-card__image"
            src={imgSrc}
            width={imgWidth}
            height={imgHeight}
            alt="Place image"
            loading="lazy"
            decoding="async"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <PriceBlock cost={cost} bookmarkActive={bookmarkActive} />
        <div className="place-card__rating rating">
          <RatingBar rating={rating} />
        </div>
        <h2 className="place-card__name">{title}</h2>
        <p className="place-card__type">{type}</p>
      </div>
    </>
  );
}

export default OfferCardBody;
export type { OfferCardBodyProps };
