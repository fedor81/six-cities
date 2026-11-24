import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { fetchOfferDetailsAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import NearPlacesList from '../../components/near-places-list/near-places-list';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/reviews-list/review-list';
import RatingBar from '../../components/offer-card/rating-bar';
import OfferBookmarkButton from '../../components/offer-card/offer-bookmark-button';
import Spinner from '../../components/spinner/spinner';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getNumericRating } from '../../utils/rating';

function Offer(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const offerDetails = useAppSelector((state) => state.data.offerDetails);
  const nearbyOffers = useAppSelector((state) => state.data.nearbyOffers);
  const offerDetailsNotFound = useAppSelector((state) => state.data.offerDetailsNotFound);
  const offerDetailsError = useAppSelector((state) => state.data.offerDetailsError);
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  const isNotFound = id ? Boolean(offerDetailsNotFound[id]) : false;

  useEffect(() => {
    if (id && !offerDetails[id] && !offerDetailsNotFound[id]) {
      dispatch(fetchOfferDetailsAction(id));
    }
  }, [id, dispatch, offerDetails, offerDetailsNotFound]);

  const offer = id ? offerDetails[id] : undefined;
  const nearPlaces = id ? nearbyOffers[id] ?? [] : [];

  if (isNotFound) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (!offer) {
    return (
      <div className="page page--gray">
        <Header />
        <main className="page__main">
          <div className="container">
            <section className="offer not-found">
              {offerDetailsError ? (
                <>
                  <h1 className="offer__name">Предложение не найдено</h1>
                  <p className="offer__text">{offerDetailsError}</p>
                </>
              ) : (
                <Spinner label="Загрузка предложения…" />
              )}
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <Header />

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
                <OfferBookmarkButton />
              </div>
              <div className="offer__rating rating">
                <RatingBar rating={offer.rating} />
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
              <ReviewList reviews={offer.reviews} />
              {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm offerId={offer.id} />}
            </div>
          </div>
          <section className="offer__map map">
            <Map city={offer.city} offers={nearPlaces} selectedOfferId={offer.id} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearPlacesList offers={nearPlaces} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
