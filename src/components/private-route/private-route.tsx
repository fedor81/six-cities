import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../store/hooks';

type PrivateRouteProps = {
  children: JSX.Element;
  redirectTo?: AppRoute;
};

function PrivateRoute({
  redirectTo = AppRoute.Login,
  children,
}: PrivateRouteProps): JSX.Element | null {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null;
  }

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
}

export default PrivateRoute;
