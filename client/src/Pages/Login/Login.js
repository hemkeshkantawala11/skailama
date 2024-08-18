import React, { useEffect, useState } from 'react';
import './Login.css';
import onlyLogo from '../../Resources/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import Cookies from 'js-cookie';
import FailComponent from '../../Components/failComponent/failComponent';
import fullLogo from "../../Resources/full-logo-with-text.png";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showFailModal, setShowFailModal] = useState(false);

    const checkUser = async () => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get('http://localhost:8080/users/get-current-user', {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            console.log("Users Data " + JSON.stringify(response.data.success));
            if (response.data.success) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const googleAuth = async (e) => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const email = user.email;

            // Send email to backend to store in the database
            const response = await axios.post('http://localhost:8080/api/user/signup/google',
                {
                    email: email
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            // console.log('Google signup response:', response.data);
            if (response.data.success) {
                Cookies.set('email', email);
                navigate('/dashboard');
            } else {
                console.log('Google signup failed');
            }
        } catch (error) {
            console.error('Error during Google signup:', error);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/user/login',
                {
                    email: email,
                    password: password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });

            if (response.data.success) {
                Cookies.set('token', response.data.token);

                const token2 = Cookies.get('token');

                const projectsResponse = await axios.get('http://localhost:8080/projects', {
                    headers: {
                        Authorization: `Bearer ${token2}`
                    },
                    withCredentials: true
                });
                console.log('Projects response: ', projectsResponse.data.projects.length);
                if (projectsResponse.data.projects.length > 0) {
                    navigate('/projects');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setShowFailModal(true);
            }
        } catch (error) {
            setShowFailModal(true);
        }
    };

    useEffect(() => {
        // checkUser();
    }, []);

    return (
        <div className="login-page">
            <div className="promo-section">
                <div className="branding">
                    {/*Ading the fullLogo component/*/}
                    <img id="full-logo" src={fullLogo} alt="Ques.AI Logo" />
                    <h1>Your podcast will no longer be just a hobby.</h1>
                    <p>Supercharge Your Distribution using our AI assistant!</p>
                </div>
            </div>
            <div className="login-section">
                <div className="login-box">
                    <div className="logo2">
                        <img src={onlyLogo} alt="Ques.AI Logo" />
                    </div>
                    <p className="paragraph">Welcome To</p>
                    <h2 className="paragraph">Ques.AI</h2>
                    <form onSubmit={submit}>
                        <div className="input-group2">
                            <label>Email Address</label>
                            <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-group2">
                            <label>Password</label>
                            <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                        <div className="alt-login">
                            <p>or</p>
                            <button onClick={googleAuth}>Continue with Google</button>
                        </div>
                        <p className="forgot-password">Forgot password?</p>
                        <p className="sign-up">Don’t have an account? <a href="/signup">Create Account</a></p>
                    </form>
                </div>
            </div>
            <FailComponent show={showFailModal} onClose={() => setShowFailModal(false)} />
        </div>
    );
};

export default LoginPage;