import React, {useState} from 'react';
import './signup.css';
import onlyLogo from '../../Resources/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fullLogo from "../../Resources/full-logo-with-text.png";


const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const submit = async (e) => {
        e.preventDefault();
        console.log("Reached Submit ");
        const response  = await axios.post('https://skailama-2dwr.onrender.com/api/user/signup/',
            {
                email: email,
                password: password,
                name: name
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log("Sent Data" + response);
        if(response.data.success) {
            console.log("Login successful")
            navigate('/');
        } else {
            console.log('Login failed');
        }
    }
    return(
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
                    <div className="logo">
                        <img src={onlyLogo} alt="Ques.AI Logo"/>
                    </div>
                    <p className="paragraph">Sign Up To</p>
                    <h2 className="paragraph">Ques.AI</h2>
                    <form onSubmit={submit}>
                        <div className="input-group3">
                            <label>Name</label>
                            <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="input-group3">
                            <label>Email Address</label>
                            <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="input-group3">
                            <label>Password</label>
                            <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button type="submit" className="login-button">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;