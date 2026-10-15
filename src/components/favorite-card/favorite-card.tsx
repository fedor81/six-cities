import type { PlaceCard } from '../../types/place-card';
import OfferCardBody from '../offer-card/offer-card-body';

type FavoriteCardProps = PlaceCard;

function FavoriteCard({
  img,
  cost,
  title,
  type,
  rating,
  isPremium,
}: FavoriteCardProps): JSX.Element {
  return (
    <article className="favorites__card place-card">
      <OfferCardBody
        isPremium={isPremium}
        rating={rating}
        cost={cost}
        title={title}
        type={type}
        imageLink={
          <a href="#">
            <img
              className="place-card__image"
              src={img}
              width={150}
              height={110}
              alt="Place image"
            />
          </a>
        }
        bookmarkActive
      />
    </article>
  );
}

export default FavoriteCard;
