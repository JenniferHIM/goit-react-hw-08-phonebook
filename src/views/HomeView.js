import { useSelector } from 'react-redux';
import { getAuthStatus } from 'redux/auth/auth-selector';
import { useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';
import { ContactPhone } from '@material-ui/icons';

const HomeView = () => {
  const isLoggedIn = useSelector(state => getAuthStatus(state));
  const history = useHistory();

  const handleClick = () => {
    history.push(isLoggedIn ? '/contacts' : '/login');
  };

  return (
    <>
      <div className="logoSide">
        <div className="logoBackground">
          <ContactPhone className="logo" style={{ fontSize: 120 }} />
          <p className="logotext">PhoneBook</p>
        </div>
      </div>
      <div className="sloganSide">
        <h1 className="mainTitle">My PhoneBook</h1>
        <h2 className="slogan">Your phone numbers in safe hands</h2>
        <Button
          color="primary"
          variant="contained"
          type="button"
          onClick={handleClick}
        >
          Get started
        </Button>
      </div>
    </>
  );
};

export default HomeView;