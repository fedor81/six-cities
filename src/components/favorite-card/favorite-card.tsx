import { Link } from 'react-router-dom';

import type { PlaceCard } from '../../types/place-card';
import OfferCardBody from '../offer-card/offer-card-body';
import { AppRoute } from '../../const';

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
        imageLink={
          <Link to={`${AppRoute.Offer}/${id}`}>
            <img
              className="place-card__image"
              src={img}
              width={150}
              height={110}
              alt="Place image"
            />
          </Link>
        }
        bookmarkActive
      />
    </article>
  );
}

export default FavoriteCard;
