import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CitiesList from '../../components/cities-list/cities-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import PlacesList from '../../components/places-list/places-list';
import ServerError from '../../components/server-error/server-error';
import SortingOptions from '../../components/sorting-options/sorting-options';
import Spinner from '../../components/spinner/spinner';
import { CITIES, DataLoadingStatus, SortingType } from '../../const';
import { changeCity } from '../../store/action';
import type { AppDispatch, RootState } from '../../store';
import { getOffersByCityName } from '../../store/selectors';
import type { City } from '../../types/place-card';
import { sortOffers } from '../../utils/sorting';

function Main(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingType>(SortingType.Popular);
  const dispatch = useDispatch<AppDispatch>();

  const city = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);
  const offersStatus = useSelector((state: RootState) => state.offersStatus);
  const offersError = useSelector((state: RootState) => state.offersError);

  const isError = offersStatus === DataLoadingStatus.Error;
  const isLoading = offersStatus === DataLoadingStatus.Idle || offersStatus === DataLoadingStatus.Loading;

  const cityOffers = useMemo(
    () => sortOffers(getOffersByCityName(offers, city.name), sorting),
    [offers, city.name, sorting]
  );

  const handleCityChange = (nextCity: City) => {
    dispatch(changeCity(nextCity));
  };

  const handleOfferHover = useCallback((offerId: string | null) => setActiveOfferId(offerId), []);

  const handleSortingChange = (nextSorting: SortingType) => {
    setSorting(nextSorting);
  };

  return (
    <div className="page page--gray page--main">
      <Header isLogoActive />

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
            {isError ? (
              <ServerError message={offersError ?? 'Не удалось загрузить предложения.'} />
            ) : (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{cityOffers.length} places to stay in {city.name}</b>
                <SortingOptions
                  currentSorting={sorting}
                  onSortingChange={handleSortingChange}
                />
                {isLoading && <Spinner />}
                {!isLoading && (
                  <PlacesList
                    offers={cityOffers}
                    activeOfferId={activeOfferId}
                    onHover={handleOfferHover}
                  />
                )}
              </section>
            )}
            {!isError && (
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    city={city}
                    offers={cityOffers}
                    selectedOfferId={activeOfferId}
                  />
                </section>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
