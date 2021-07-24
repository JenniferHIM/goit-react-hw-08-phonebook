import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthStatus } from 'redux/auth/auth-selector';

const PublicRoute = ({
  children,
  restricted = false,
  redirectTo = '/',
  ...props
}) => {
  const isLoggedIn = useSelector(state => getAuthStatus(state));

  return (
    <Route {...props}>
      {isLoggedIn && restricted ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
};

export default PublicRoute;