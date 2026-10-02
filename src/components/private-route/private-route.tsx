import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type ProtectedRouteProps = {
  authorizationStatus: AuthorizationStatus;
  redirectTo?: AppRoute;
  children: JSX.Element;
}

function ProtectedRoute({ authorizationStatus, redirectTo, children }: ProtectedRouteProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.Auth ? (
      children
    ) : (
      <Navigate to={redirectTo || AppRoute.Login} />
    )
  );
}

export default ProtectedRoute;
