import clsx from 'classnames';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';
import type { City } from '../../types/place-card';

type CitiesListProps = {
  cities: City[];
  activeCity: City;
  onCityChange: (city: City) => void;
};

function CitiesList({ cities, activeCity, onCityChange }: CitiesListProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li key={city.name} className="locations__item">
            <Link
              className={clsx('locations__item-link tabs__item', {
                'tabs__item--active': city.name === activeCity.name,
              })}
              to={AppRoute.Main}
              onClick={() => onCityChange(city)}
            >
              <span>{city.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CitiesList;
