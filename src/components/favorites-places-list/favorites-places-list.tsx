import FavoriteCard from '../favorite-card/favorite-card';
import type { PlaceCard } from '../../types/place-card';
import { getOffersByCityName, getUniqueCities } from '../../store/selectors';

type FavoritesPlacesListProps = {
  offers: PlaceCard[];
};

function FavoritesPlacesList({ offers }: FavoritesPlacesListProps): JSX.Element {
  const cities = getUniqueCities(offers);

  return (
    <ul className="favorites__list">
      {cities.map((cityName) => {
        const cityOffers = getOffersByCityName(offers, cityName);

        return (
          <li className="favorites__locations-items" key={cityName}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{cityName}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {cityOffers.map((offer) => (
                <FavoriteCard key={offer.id} {...offer} />
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default FavoritesPlacesList;
