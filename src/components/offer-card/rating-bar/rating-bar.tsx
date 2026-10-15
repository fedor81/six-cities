import type { Rating } from '../../../types/place-card';

type RatingBarProps = {
  rating: Rating;
};

function RatingBar({ rating }: RatingBarProps): JSX.Element {
  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={{ width: `${rating}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}

export default RatingBar;
