import type { PlaceCard } from '../../types/place-card';
import OfferCardBody from '../offer-card/offer-card-body';

function FavoriteCard({
  id,
  img,
  cost,
  title,
  type,
  rating,
  isPremium,
}: PlaceCard): JSX.Element {
  return (
    <article className="favorites__card place-card">
      <OfferCardBody
        isPremium={isPremium}
        rating={rating}
        cost={cost}
        title={title}
        type={type}
        imgSrc={img}
        offerId={id}
        bookmarkActive
        imgWidth={150}
        imgHeight={110}
      />
    </article>
  );
}

export default FavoriteCard;
