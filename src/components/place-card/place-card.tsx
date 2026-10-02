import PlaceCardTypeBadge from '../place-card-type-badge/place-card-type-badge';
import { PlaceCardType } from './place-card-type';

type Rating = 0 | 20 | 40 | 60 | 80 | 100

type PlaceCardProps = {
  img: string;
  cost: number;
  title: string;
  type: PlaceCardType;
  rating: Rating;
  isPremium?: boolean;
  isBookmarked?: boolean;
}

function PlaceCard({
  img,
  cost,
  title,
  type,
  rating,
  isPremium,
  isBookmarked,
}: PlaceCardProps): JSX.Element {
  return (
    <article className="cities__card place-card">
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={img} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{cost}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isBookmarked && 'place-card__bookmark-button--active'} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <PlaceCardTypeBadge type={type} />
      </div>
    </article >
  );
}

export default PlaceCard;
