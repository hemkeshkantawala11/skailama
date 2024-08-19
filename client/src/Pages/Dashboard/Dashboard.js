import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import dashboardImage from '../../Resources/dash.svg';
import settingsIcon from '../../Resources/Icon.svg';
import notificationIcon from '../../Resources/notifications.svg';
import FullLogo from '../../Resources/LogoText.png';
import CreateProjectModal from '../../Components/AddProject/AddProject';
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);

    const get_current_user = async () => {
        const token = Cookies.get('token');
        try {
            const userResponse = await axios.get('https://skailama-2dwr.onrender.com/users/get-current-user', {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Users Data " + JSON.stringify(userResponse.data));
            setUser(userResponse.data.data._id);
        } catch (error) {
            console.error('Error fetching user or hospital data:', error);
        }
    }

    const redirectingCheck = async () => {
        const token3 = Cookies.get('token');

        const projectsResponse = await axios.get('https://skailama-2dwr.onrender.com/projects', {
            headers: {
                Authorization: `Bearer ${token3}`
            }
        });
        console.log('Projects response: ', projectsResponse.data.projects.length);
        if (projectsResponse.data.projects.length > 0) {
            navigate('/projects');
        }
    }

    const projectAdd = async (data) => {
        const token = Cookies.get('token');
        try {
            const projectResponse = await axios.post('https://skailama-2dwr.onrender.com/projects', data, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Project Data " + JSON.stringify(projectResponse.data));
            navigate('/projects');
        } catch (error) {
            console.error('Error adding project:', error);
        }
    }

    useEffect(() => {
        get_current_user();
        redirectingCheck();
    }, []);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="logo">
                    <img src={FullLogo} alt="Ques.AI Logo" />
                </div>
                <div className="header-icons">
                    <span className="icon settings-icon">
                        <img src={settingsIcon} alt="Settings" />
                    </span>
                    <span className="icon notification-icon">
                        <img src={notificationIcon} alt="Notifications" />
                    </span>
                </div>
            </header>

            <div className="content-section">
                <h2>Create a New Project</h2>
                <img src={dashboardImage} alt="Dashboard Illustration" className="dashboard-image" />
                <p className="description-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <br/>
                <br/>
                <button className="create-button" onClick={() => setShowModal(true)}>
                    <span className="icon">+</span>
                    Create New Project
                </button>
                <CreateProjectModal
                    onSubmit={projectAdd}
                    showModal={showModal}
                    onClose={() => setShowModal(false)}
                />
            </div>
        </div>
    );
}

export default Dashboard;