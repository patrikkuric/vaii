import React, { useState } from "react";
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import useTokenStore from "../token";

export default function Signup() {
    const { setToken } = useTokenStore();
    const [isHover, setIsHover] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const buttonStyle = {
        width: "200px",
        border: "2px solid black",
        color: isHover ? "#4bd2ff" : "#E8DFDC",
        backgroundColor: "#151819",
        borderColor: isHover ? "#4bd2ff" : "#2E3234",
        marginTop: "20px"
    };

    const validateRegister = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const repeatPassword = event.target["repeat-password"].value;

        //errors
        if (username === "" || email === "" || password === "" || repeatPassword === "") {
            setErrMessage('All fields must be filled out');
            NotificationManager.error('All fields must be filled out', 'Error');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrMessage('Invalid email address');
            NotificationManager.error('Invalid email address', 'Error');
            return;
        }
        if (password !== repeatPassword) {
            setErrMessage('Passwords do not match');
            NotificationManager.error('Passwords do not match', 'Error');
            return;
        }

        // warnings
        if (username.length < 6 || username.includes(' ')) {
            setErrMessage('Username must be at least 6 characters long and should not contain spaces');
            NotificationManager.warning('Choose a different name', 'Warning');
            return;
        }
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setErrMessage('Password must be at least 8 characters long, contain at least one uppercase letter, and contain at least one number or special character');
            NotificationManager.warning('Weak password', 'Warning');
            return;
        }

        try {
            await axios.post('http://localhost:4000/users/register', {
                username,
                email,
                password,
                repeatPassword
            });

            setErrMessage('');
            NotificationManager.success('You have been successfully registered ', 'Success');
        } catch (error) {
            if (error.response) {
                setErrMessage(error.response.data.error);
                NotificationManager.error(error.response.data.error, 'Error');
            }
        }
    };

    const validateLogin = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;

        //errors
        if (username === "" || password === "") {
            setErrMessage('All fields must be filled out');
            NotificationManager.error('All fields must be filled out', 'Error');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/users/login', {
                username,
                password,
            });

            const { token } = response.data;
            setToken(token);
            window.location.reload(); //f5
            window.location.href = "/account";
        } catch (error) {
            setErrMessage('Invalid username/password combination');
            NotificationManager.error('Invalid username/password combination', 'Error');
        }
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <ul className="nav nav-tabs card-header-tabs">
                                    <li className="nav-item overflow-hidden nav-item-signup">
                                        <a onClick={() => setErrMessage('')} className="nav-link active" id="register-tab" data-bs-toggle="tab" href="#register">Register</a>
                                    </li>
                                    <li className="nav-item overflow-hidden nav-item-signup mx-2">
                                        <a onClick={() => setErrMessage('')} className="nav-link" id="login-tab" data-bs-toggle="tab" href="#login">Login</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="card-body">
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="register">
                                        <h5 className="card-title overflow-hidden lh-base">Register</h5>
                                        <form onSubmit={validateRegister} noValidate>
                                            <label htmlFor="username" className="form-label">Username</label>
                                            <input type="username" className="form-control" name="username" placeholder="vaii enjoyer" />
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" name="email" placeholder="example@stud.uniza.sk" />
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" name="password" />
                                            <label htmlFor="repeat-password" className="form-label">Repeat password</label>
                                            <input type="password" className="form-control" name="repeat-password" />

                                            <button type="submit" className="btn btn-link" style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                                Register
                                            </button>
                                        </form>
                                        { errMessage && <div className="mt-3" style={{color: "red"}}>
                                            {errMessage}
                                        </div>}
                                    </div>

                                    <div className="tab-pane fade" id="login">
                                        <h5 className="card-title overflow-hidden lh-base">Login</h5>
                                        <form onSubmit={validateLogin}>
                                            <label htmlFor="username" className="form-label">Username</label>
                                            <input type="username" className="form-control" name="username" placeholder="vaii enjoyer" />
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" name="password" />

                                            <button type="submit" className="btn btn-link" style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                                Login
                                            </button>
                                        </form>
                                        { errMessage && <div className="mt-3" style={{color: "red"}}>
                                            {errMessage}
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}