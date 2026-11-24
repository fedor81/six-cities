import { Link } from 'react-router-dom';

import Header from '../../components/header/header';
import { AppRoute } from '../../const';

function NotFound(): JSX.Element {
  return (
    <div className="page page--gray">
      <Header />

      <main className="page__main">
        <div className="container">
          <section className="offer not-found">
            <h1 className="offer__name">404. Page not found</h1>
            <p className="offer__text">
              The page you are looking for does not exist or the offer was removed.
            </p>
            <Link className="button" to={AppRoute.Main}>Go to main page</Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
