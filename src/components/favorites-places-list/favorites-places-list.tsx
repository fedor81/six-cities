import FavoriteCard from '../favorite-card/favorite-card';
import type { PlaceCard } from '../../types/place-card';

type FavoritesPlacesListProps = {
  offers: PlaceCard[];
};

function getCityOffers(offers: PlaceCard[], cityName: string): PlaceCard[] {
  return offers.filter((offer) => offer.city.name === cityName);
}

function getUniqueCities(offers: PlaceCard[]): string[] {
  const cities = offers.map((offer) => offer.city.name);
  return [...new Set(cities)];
}

function FavoritesPlacesList({ offers }: FavoritesPlacesListProps): JSX.Element {
  const cities = getUniqueCities(offers);

  return (
    <ul className="favorites__list">
      {cities.map((cityName) => {
        const cityOffers = getCityOffers(offers, cityName);

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
