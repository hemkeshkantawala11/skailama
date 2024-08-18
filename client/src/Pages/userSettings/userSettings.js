import React, { useEffect, useState } from 'react';
import './userSettings.css';
import profile from '../../Resources/profile.png';
import LeftSideNavBar from '../../Components/LeftSideNavBar/LeftSideNavBar';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from "axios";
import SuccessModal from '../../Components/successComponent/successComponent';

const UserSettings = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const logout = () => {
        Cookies.remove('token');
        window.location.href = '/';
    }
    const getUser = async () => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get('https://skailama-2dwr.onrender.com/users/get-current-user', {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setUser(response.data.data.name);
                setEmail(response.data.data.email);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const saveChanges = async () => {
        const token = Cookies.get('token');
        try {
            const response = await axios.put('https://skailama-2dwr.onrender.com/users/update-user', {
                name: user,
                email: email
            }, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setShowSuccessModal(true);
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="user-settings-page-container">
            <LeftSideNavBar Username={user} email={email} />
            <div className="user-settings-page">
                <div className="header">
                    <Link to="/podcasts" className="back-button">←</Link>
                    <h1>Account Settings</h1>
                </div>
                <div className="user-info">
                    <img src={profile} alt="Profile" className="profile-pic-large" />
                    <div className="user-details">
                        <div className="input-group">
                            <label>User Name</label>
                            <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={"buttons"}>
                            <button className="save-button" onClick={saveChanges}>Save Changes</button>
                            <button className="save-button" onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
                <div className="subscriptions">
                    <h2>Subscriptions</h2>
                    <div className="no-subscription">
                        <p>Oops! You don’t have any active plans. <Link to="/upgrade" className="upgrade-link">Upgrade now!</Link></p>
                        <button className="upgrade-button">Upgrade</button>
                    </div>
                </div>
            </div>
            <SuccessModal show={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
        </div>
    );
};

export default UserSettings;