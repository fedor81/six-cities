import type { PlaceCardType, Rating } from '../../types/place-card';

import { PremiumBadge, RatingBar, PriceBlock, PlaceInfo, ImageWrapper } from '.';

export type OfferCardBodyProps = {
  isPremium: boolean;
  rating: Rating;
  cost: number;
  title: string;
  type: PlaceCardType;
  imageLink: JSX.Element;
  bookmarkActive: boolean;
};

function OfferCardBody({
  isPremium,
  rating,
  cost,
  title,
  type,
  imageLink,
  bookmarkActive,
}: OfferCardBodyProps): JSX.Element {
  return (
    <>
      <PremiumBadge isPremium={isPremium} />
      <ImageWrapper link={imageLink} />
      <div className="place-card__info">
        <PriceBlock cost={cost} bookmarkActive={bookmarkActive} />
        <RatingBar rating={rating} />
        <PlaceInfo title={title} type={type} />
      </div>
    </>
  );
}

export default OfferCardBody;
