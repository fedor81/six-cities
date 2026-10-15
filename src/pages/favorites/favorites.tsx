import { useMemo } from 'react';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import FavoritesPlacesList from '../../components/favorites-places-list/favorites-places-list';
import type { PlaceCard } from '../../types/place-card';

type FavoritesProps = {
  offers: PlaceCard[];
};

function Favorites({ offers }: FavoritesProps): JSX.Element {
  const bookmarkedOffers = useMemo(
    () => offers.filter((offer) => offer.isBookmarked),
    [offers]
  );

  return (
    <div className="page">
      <Header favoriteCount={bookmarkedOffers.length} />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesPlacesList offers={bookmarkedOffers} />
          </section>
        </div>
      </main>
      <Footer withContainer />
    </div>
  );
}

export default Favorites;
