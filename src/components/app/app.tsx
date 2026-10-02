import { AppRoute } from '../../const';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import NotFound from '../../pages/not-found/not-found';
import Offer from '../../pages/offer/offer';

type AppProps = {
  placesCount: number;
}

function App({ placesCount }: AppProps): JSX.Element {
  return <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<Main placesCount={placesCount}></Main>}>
      </Route>
      <Route
        path={AppRoute.Login}
        element={<Login />}>
      </Route>
      <Route
        path={AppRoute.Favorites}
        element={<Favorites />}>
      </Route>
      <Route
        path={AppRoute.Offer + "/:id"}
        element={<Offer />}>
      </Route>
      <Route
        path="*"
        element={<NotFound />}>
      </Route>
    </Routes>
  </BrowserRouter >
}

export default App;
