import React, { useState } from "react";
import PropTypes from "prop-types";
import "./UploadModal.css";

const UploadModal = ({ source, typeOf, showModal, onClose, onSubmit, pro }) => {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [error, setError] = useState('');

    if (!showModal) {
        return null; // Don't render if the modal is not supposed to be shown
    }

    const handleCreate = () => {
        if (link.trim() === '') {
            setError("Link can't be empty");
        } else {
            setError('');
            onSubmit({ name: name, transcript: link, projectId: pro }); // Call onSubmit with project data
            onClose(); // Close modal on successful creation
        }
    };

    const handleCancel = () => {
        setName('');
        setError('');
        onClose(); // Close modal without saving
    };

    return (
        <div className="upload-modal-backdrop">
            <div className="upload-modal">
                <div className="upload-modal-header">
                    <div className="upload-modal-icon">
                        <img src={source} alt={`icon`} />
                    </div>
                    <div className="upload-modal-title">
                        Upload from {typeOf}
                    </div>
                </div>
                <div className="upload-modal-body">
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
                    <label>Link</label>
                    <input type="text" placeholder="Enter link" onChange={(e) => setLink(e.target.value)} />
                    {error && <div className="error">{error}</div>}
                </div>
                <div className="upload-modal-footer">
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                    <button className="upload-button" onClick={handleCreate}>
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

UploadModal.propTypes = {
    source: PropTypes.string.isRequired,
    typeOf: PropTypes.string.isRequired,
    showModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    pro: PropTypes.func.isRequired,

};

export default UploadModal;
