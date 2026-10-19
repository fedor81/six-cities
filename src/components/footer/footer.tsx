import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type FooterProps = {
  withContainer?: boolean;
};

function Footer({ withContainer = false }: FooterProps): JSX.Element {
  return (
    <footer className={`footer${withContainer ? ' container' : ''}`}>
      <Link className="footer__logo-link" to={AppRoute.Main}>
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width="64"
          height="33"
        />
      </Link>
    </footer>
  );
}

export default Footer;
