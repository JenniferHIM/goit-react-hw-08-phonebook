import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLoginRequest } from 'redux/auth/auth-operations';

import { Button } from '@material-ui/core';
import { Visibility, VisibilityOff, AlternateEmail } from '@material-ui/icons';

const LoginForm = () => {
  const [userMail, setUserMail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsVisible(prevState => !prevState);
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'userEmail':
        setUserMail(value);
        break;

      default:
        setUserPassword(value);
        break;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    dispatch(
      userLoginRequest({
        email: userMail,
        password: userPassword,
      }),
    );

    reset();
  };

  const reset = () => {
    setUserMail('');
    setUserPassword('');
    setIsVisible(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="off">
      <label title="E-mail" className="formLabel">
        <AlternateEmail className="formIcons" />
        <input
          type="email"
          name="userEmail"
          value={userMail}
          className="formInput"
          onChange={handleChange}
          autoComplete="off"
          placeholder=" "
          required
        />
        <span className="ariaLabel">E-mail</span>
      </label>
      <label title="Password" className="formLabel">
        {isVisible ? (
          <Visibility onClick={handleClick} className="formIcons" />
        ) : (
          <VisibilityOff onClick={handleClick} className="formIcons" />
        )}
        <input
          type={isVisible ? 'text' : 'password'}
          name="userPassword"
          value={userPassword}
          className="formInput"
          onChange={handleChange}
          minLength={7}
          autoComplete="off"
          placeholder=" "
          required
        />
        <span className="ariaLabel">Password</span>
      </label>
      <Button color="primary" variant="contained" type="submit">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;