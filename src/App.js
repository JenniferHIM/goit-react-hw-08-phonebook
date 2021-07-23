import { useEffect, Suspense, lazy } from 'react';
import { Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PrivateRoute, PublicRoute, Navigation } from 'components';
import { userCheckCurrent } from 'redux/auth/auth-operations';
import { getFetchingStatus, getErrorStatus } from 'redux/auth/auth-selector';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import { Copyright } from '@material-ui/icons';
import { GiCrownedHeart } from 'react-icons/gi';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const HomeView = lazy(() =>
  import('views/HomeView' /* webpackChunkName: "home" */),
);
const RegisterView = lazy(() =>
  import('views/RegisterView' /* webpackChunkName: "registration" */),
);
const LoginView = lazy(() =>
  import('views/LoginView' /* webpackChunkName: "login" */),
);
const ContactsView = lazy(() =>
  import('views/ContactsView' /* webpackChunkName: "contacts" */),
);
const NotFoundView = lazy(() =>
  import('views/NotFoundView.js' /* webpackChunkName: "unknownPage" */),
);

const App = () => {
  const isFetching = useSelector(getFetchingStatus);
  const isError = useSelector(getErrorStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userCheckCurrent());
  }, [dispatch]);

  return (
    <div className="App container">
      <ToastContainer autoClose={2000} />

      <Navigation />

      <div className="viewContainer">
        {isFetching && (
          <Loader type="Circles" color="#00BFFF" height={80} width={80} />
        )}
        {isError && <div>"Something was wrong"</div>}
        {!isFetching && !isError && (
          <Suspense
            fallback={
              <Loader type="Circles" color="#00BFFF" height={80} width={80} />
            }
          >
            <Switch>
              <PublicRoute path="/" exact>
                <HomeView />
              </PublicRoute>

              <PublicRoute path="/register" exact restricted>
                <RegisterView />
              </PublicRoute>

              <PublicRoute path="/login" exact restricted>
                <LoginView />
              </PublicRoute>

              <PrivateRoute path="/contacts" redirectTo="/login">
                <ContactsView />
              </PrivateRoute>

              <PublicRoute>
                <NotFoundView />
              </PublicRoute>
            </Switch>
          </Suspense>
        )}
      </div>

      <div className="footer">
        <Copyright id="icon-copyRigths" />
        Created by Jennifer | 2021
        <GiCrownedHeart id="icon-heart" />
      </div>
    </div>
  );
};

export default App;