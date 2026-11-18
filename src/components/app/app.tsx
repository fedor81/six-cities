import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { AppRoute } from '../../const';
import type { AppDispatch, RootState } from '../../store';
import { checkAuth, fetchOffersAction } from '../../store/api-actions';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Spinner from '../spinner/spinner';

const Login = lazy(() => import('../../pages/login/login'));
const Favorites = lazy(() => import('../../pages/favorites/favorites'));
const Offer = lazy(() => import('../../pages/offer/offer'));

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
      <Suspense fallback={<Spinner />}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
