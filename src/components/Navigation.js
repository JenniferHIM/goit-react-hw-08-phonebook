import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { getAuthStatus, getUserName } from 'redux/auth/auth-selector';
import { userLogoutRequest } from 'redux/auth/auth-operations';

import { Button } from '@material-ui/core';
import { ContactPhone } from '@material-ui/icons';
import { ImReddit, ImExit, ImCross } from 'react-icons/im';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navigation = () => {
  const isLoggedIn = useSelector(state => getAuthStatus(state));
  const userName = useSelector(state => getUserName(state));
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const isSmallScreen = useMediaQuery({ query: '(max-device-width: 767px)' });

  const handleClick = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <>
      <nav className="navBar container">
        <NavLink to="/" className="logo">
          <div className="navLogoBackground">
            <ContactPhone className="logo" style={{ fontSize: 25 }} />
          </div>
        </NavLink>

        {!isSmallScreen && (
          <NavLink to="/" exact className="link" activeClassName="activeLink">
            Home
          </NavLink>
        )}

        {isLoggedIn && (
          <NavLink to="/contacts" className="link" activeClassName="activeLink">
            PhoneBook
          </NavLink>
        )}

        {isSmallScreen && (
          <Button
            id="modalMenu"
            color="primary"
            variant="contained"
            type="button"
            onClick={handleClick}
          >
            {isOpen ? <ImCross /> : <GiHamburgerMenu />}
          </Button>
        )}

        <span
          className={
            !isSmallScreen
              ? 'authBar'
              : isOpen
              ? 'authMobileBar'
              : 'visually-hidden'
          }
          onClick={handleClick}
        >
          {isLoggedIn ? (
            <>
              <ImReddit className="avatar" style={{ fontSize: 25 }} />
              <span className="greeting">
                Welcome
                <span className="userName">{userName}</span>
              </span>
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={() => dispatch(userLogoutRequest())}
              >
                Log out
                <ImExit style={{ marginLeft: 10 }} />
              </Button>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                exact
                className="link register"
                activeClassName="activeLink"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="link"
                activeClassName="activeLink"
              >
                Login
              </NavLink>
            </>
          )}
        </span>
      </nav>
    </>
  );
};

export default Navigation;