import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import type { OfferDetail } from '../../types/offer';
import Header from '../../components/header/header';
import ReviewForm from '../../components/review-form/review-form';
import { getRatingPercentage, getNumericRating } from '../../utils/rating';

type OfferProps = {
  offerDetails: Record<string, OfferDetail>;
};

function Offer({ offerDetails }: OfferProps): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const offer = id ? offerDetails[id] : null;

  if (!offer) {
    return (
      <div className="page page--gray">
        <main className="page__main">
          <div className="container">
            <section className="offer not-found">
              <h1 className="offer__name">Offer not found</h1>
            </section>
          </div>
        </main>
      </div>
    );
  }

  const nearPlaces = Object.values(offerDetails)
    .filter((o) => o.id !== offer.id)
    .slice(0, 3);

  const reviewsCount = offer.reviews.length;

  return (
    <div className="page">
      <Header favoriteCount={3} />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt={offer.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: getRatingPercentage(offer.rating) }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{getNumericRating(offer.rating)}</span>
              </div>
              <ul className="offer__features">
                <li className={`offer__feature offer__feature--${offer.type.toLowerCase()}`}>
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedroom{offer.bedrooms > 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adult{offer.maxAdults > 1 ? 's' : ''}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.cost}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsCount}</span></h2>
                <ul className="reviews__list">
                  {offer.reviews.map((review) => (
                    <li className="reviews__item" key={review.id}>
                      <div className="reviews__user user">
                        <div className="reviews__avatar-wrapper user__avatar-wrapper">
                          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Review avatar" />
                        </div>
                        <span className="reviews__user-name">
                          {review.user.name}
                        </span>
                      </div>
                      <div className="reviews__info">
                        <div className="reviews__rating rating">
                          <div className="reviews__stars rating__stars">
                            <span style={{ width: getRatingPercentage(review.rating * 20) }} />
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <p className="reviews__text">
                          {review.comment}
                        </p>
                        <time className="reviews__time" dateTime={review.date}>
                          {new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </time>
                      </div>
                    </li>
                  ))}
                </ul>
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="offer__map map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearPlaces.map((place) => (
                <article className="near-places__card place-card" key={place.id}>
                  {place.isPremium && (
                    <div className="place-card__mark">
                      <span>Premium</span>
                    </div>
                  )}
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <Link to={`/offer/${place.id}`}>
                      <img className="place-card__image" src={place.img} width="260" height="200" alt="Place image" />
                    </Link>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{place.cost}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                      </div>
                      {place.isBookmarked && (
                        <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                          <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark" />
                          </svg>
                          <span className="visually-hidden">In bookmarks</span>
                        </button>
                      )}
                      {!place.isBookmarked && (
                        <button className="place-card__bookmark-button button" type="button">
                          <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark" />
                          </svg>
                          <span className="visually-hidden">To bookmarks</span>
                        </button>
                      )}
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{ width: getRatingPercentage(place.rating) }} />
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <Link to={`/offer/${place.id}`}>{place.title}</Link>
                    </h2>
                    <p className="place-card__type">{place.type}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
