import React from 'react';
import './successComponent.css';

const SuccessModal = ({ show, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Success</h2>
                <p>Your changes have been successfully saved!</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SuccessModal;