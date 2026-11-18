import { formatDate } from '../../utils/date';
import type { Review } from '../../types/offer';

import RatingBar from '../offer-card/rating-bar';

type ReviewItemProps = Review;

function ReviewItem({ user, comment, rating, date }: ReviewItemProps): JSX.Element {
  const starsWidth = (rating / 5) * 100;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width={54}
            height={54}
            alt={user.name}
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <RatingBar rating={starsWidth} className="reviews__stars rating__stars" />
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>
          {formatDate(date)}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
