import React from 'react';
import { Link } from 'react-router-dom';
import './LeftSideNavBar.css';
import profile from '../../Resources/profile.png';
import fullLogo from '../../Resources/LogoText.png';
import { useNavigate } from 'react-router-dom';
const LeftSideNavBar = ({Username, email}) => {
    console.log(Username, email);
    const navigate = useNavigate();
    return (

        <div className="left-nav">
             <div className="LogoAdd">
                 <img src={fullLogo} alt="logo"/>
             </div>
            <div className={"links"}>
                <Link to="/add-podcast" className="nav-link">+ Add your Podcast(s)</Link>
                <Link to="/create-repurpose" className="nav-link">Create & Repurpose</Link>
                <Link to="/podcast-widget" className="nav-link">Podcast Widget</Link>
                <Link to="/upgrade" className="nav-link">Upgrade</Link>
            </div>
            <div className="separator"></div>

            <Link to="/help" className="nav-link">Help</Link>

            <div className="user-profile" onClick={() => navigate("/settings")}>
                <img src={profile} alt="Profile" className="profile-pic" />
                <div className="user-details">
                    <p>{Username}</p>
                    <small>{email}</small>
                </div>
            </div>
        </div>
    );
};

export default LeftSideNavBar;
