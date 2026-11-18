import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { AppRoute } from '../../const';
import type { AppDispatch, RootState } from '../../store';
import { checkAuth, fetchOffersAction } from '../../store/api-actions';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import Offer from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const offers = useSelector((state: RootState) => state.offers);

  useEffect(() => {
    dispatch(checkAuth()).catch(() => {
      // network error — reducer уже установил статус NoAuth
    });
    dispatch(fetchOffersAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <Favorites offers={offers} />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<Offer />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
