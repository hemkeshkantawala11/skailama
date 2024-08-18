import React from 'react';
import './BoxComponent.css';

const BoxComponent = ({ icon, title, description, backgroundColor, onClick }) => {
    return (
        <div className="box" style={{ backgroundColor: backgroundColor }} onClick={onClick}>
            <div className="icon">
                <img src={icon} alt={title} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default BoxComponent;
