import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { PlaceCard } from '../../types/place-card';
import { OfferDetail } from '../../types/offer';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import Offer from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offers: PlaceCard[];
  offerDetails: Record<string, OfferDetail>;
};

function App({ offers, offerDetails }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main offers={offers} />}></Route>
        <Route path={AppRoute.Login} element={<Login />}></Route>
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites offers={offers} />
            </PrivateRoute>
          }
        >
        </Route>
        <Route path={`${AppRoute.Offer}/:id`} element={<Offer offerDetails={offerDetails} />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
