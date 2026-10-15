import { Link, NavLink } from 'react-router-dom';

type HeaderProps = {
  isLoggedIn?: boolean;
  favoriteCount?: number;
  isLogoActive?: boolean;
  showNavigation?: boolean;
}

function Header({
  isLoggedIn = true,
  favoriteCount = 0,
  isLogoActive = false,
  showNavigation = true,
}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {isLogoActive ? (
              <NavLink
                className="header__logo-link header__logo-link--active"
                to="/"
                end
              >
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </NavLink>
            ) : (
              <NavLink className="header__logo-link" to="/" end>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </NavLink>
            )}
          </div>
          {showNavigation && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isLoggedIn ? (
                  <>
                    <li className="header__nav-item user">
                      <a className="header__nav-link header__nav-link--profile" href="#">
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                        <span className="header__favorite-count">{favoriteCount}</span>
                      </a>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#">
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to="/login"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
