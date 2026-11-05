import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CitiesList from '../../components/cities-list/cities-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import PlacesList from '../../components/places-list/places-list';
import SortingOptions from '../../components/sorting-options/sorting-options';
import { CITIES, SortingType } from '../../const';
import { changeCity } from '../../store/action';
import type { RootState } from '../../store';
import type { City } from '../../types/place-card';

function Main(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingType>(SortingType.Popular);
  const dispatch = useDispatch();

  const city = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);

  const cityOffers = offers.filter((offer) => offer.city.name === city.name);

  const handleCityChange = (nextCity: City) => {
    dispatch(changeCity(nextCity));
  };

  const handleOfferHover = (offerId: string | null) => {
    setActiveOfferId(offerId);
  };

  const handleSortingChange = (nextSorting: SortingType) => {
    setSorting(nextSorting);
  };

  return (
    <div className="page page--gray page--main">
      <Header isLogoActive favoriteCount={3} />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList
            cities={CITIES}
            activeCity={city}
            onCityChange={handleCityChange}
          />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers.length} places to stay in {city.name}</b>
              <SortingOptions
                currentSorting={sorting}
                onSortingChange={handleSortingChange}
              />
              <PlacesList
                offers={cityOffers}
                activeOfferId={activeOfferId}
                onOfferTypeChange={handleOfferHover}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={city}
                  offers={cityOffers}
                  selectedOfferId={activeOfferId}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
