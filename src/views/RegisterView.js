import { useState } from "react";
import { useDispatch } from "react-redux";
import { userRegisterRequest } from 'redux/auth/auth-operations';

import { Button } from "@material-ui/core";
import {
    AccountCircle,
    Visibility,
    VisibilityOff,
    AlternateEmail,
} from '@material-ui/icons';

const RegisterForm = () => {
    const [userName, setUserName] = useState('');
    const [userMail, setUserMail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();

    const handleClick = () => {
        setIsVisible(prevState => !prevState);
    };

    const handleChange = ({ target: { name, value } }) => {
        switch (name) {
            case 'userName':
                setUserName(value);
                break;
            case 'userEmail':
                setUserMail(value);
                break;
            case 'userPassword':
                setUserPassword(value);
                break;
            
            default:
                return;
        }
    };

    const handleSubmit = e => {
        e.preventDefaul();

        dispatch(
            userRegisterRequest({
                name: userName,
                email: userMail,
                password: userPassword,
            }),
        );

        reset();
    };

    const reset = () => {
        setUserName('');
        setUserMail('');
        setUserPassword('');
        setIsVisible(false);
    };

    return (
        <form className="form" onSubmit={handleSubmit} autoComplete="off">
            <h2 className="formTitle">Registration Form</h2>
            <label title="UserName" className="formLabel">
                <AccountCircle className="formIcons" />
                <input
                    type="text"
                    name="userName"
                    value={userName}
                    className="formInput"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder=" "
                    required
                />
                <span className="ariaLable">Name</span>
            </label>
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
                Register
            </Button>

        </form>
    );
};

export default RegisterForm;