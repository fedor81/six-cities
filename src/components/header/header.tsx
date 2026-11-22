import type { MouseEvent } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { logout } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getHeaderState } from '../../store/selectors';

type HeaderProps = {
  isLogoActive?: boolean;
  showNavigation?: boolean;
}

function Header({
  isLogoActive = false,
  showNavigation = true,
}: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { authorizationStatus, user, favoriteCount } = useAppSelector(getHeaderState);

  const isLoggedIn = authorizationStatus === AuthorizationStatus.Auth;

  const handleSignOut = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {isLogoActive ? (
              <NavLink
                className="header__logo-link header__logo-link--active"
                to={AppRoute.Main}
                end
              >
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </NavLink>
            ) : (
              <NavLink className="header__logo-link" to={AppRoute.Main} end>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </NavLink>
            )}
          </div>
          {showNavigation && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isLoggedIn && user ? (
                  <>
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Favorites}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          {user.avatarUrl && (
                            <img
                              className="user__avatar"
                              src={user.avatarUrl}
                              width="54"
                              height="54"
                              alt="User avatar"
                            />
                          )}
                        </div>
                        <span className="header__user-name user__name">{user.email}</span>
                        <span className="header__favorite-count">{favoriteCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a
                        className="header__nav-link"
                        href="#"
                        onClick={handleSignOut}
                      >
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Login}
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
