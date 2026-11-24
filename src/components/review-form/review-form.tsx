import { useState, useCallback, Fragment } from 'react';

import { DataLoadingStatus } from '../../const';
import { submitReviewAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;

const ratingTitles: Record<number, string> = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const reviewSubmitStatus = useAppSelector((state) => state.data.reviewSubmitStatus);
  const reviewSubmitError = useAppSelector((state) => state.data.reviewSubmitError);
  const [review, setReview] = useState({ text: '', rating: 0 });

  const isSubmitting = reviewSubmitStatus === DataLoadingStatus.Loading;

  const isSubmitDisabled =
    isSubmitting ||
    review.rating === 0 ||
    review.text.length < MIN_REVIEW_LENGTH ||
    review.text.length > MAX_REVIEW_LENGTH;

  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReview((prev) => ({ ...prev, text: e.target.value }));
    },
    [],
  );

  const handleRatingChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setReview((prev) => ({ ...prev, rating: Number(e.target.value) }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (isSubmitDisabled) {
        return;
      }

      dispatch(submitReviewAction({ offerId, data: { comment: review.text, rating: review.rating } }))
        .unwrap()
        .then(() => setReview({ text: '', rating: 0 }))
        .catch(() => undefined);
    },
    [dispatch, offerId, review, isSubmitDisabled],
  );

  return (
    <form className="reviews__form form" onSubmit={handleSubmit} method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              checked={review.rating === star}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={ratingTitles[star]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.text}
        onChange={handleTextareaChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set&nbsp;
          <span className="reviews__star">rating</span> and describe your
          stay&nbsp; with at least&nbsp;
          <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>
          .
        </p>
        {reviewSubmitError && (
          <p className="reviews__help">
            <b className="reviews__text-amount">{reviewSubmitError}</b>
          </p>
        )}
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
