import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthStatus } from "redux/auth/auth-selector";

const PrivateRoute = ({ children, redirectTo = '/', ...props }) => {
    const isLoggedIn = useSelector(state => getAuthStatus(state));

    return (
        <Route {...props}>
            {isLoggedIn ? children : <Redirect to={redirectTo} />}
        </Route>
    );
};

export default PrivateRoute;