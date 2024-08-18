import React from 'react';
import './failComponent.css';

const SuccessModal = ({ show, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Failed</h2>
                <p>Invalid Credentials / No user</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SuccessModal;