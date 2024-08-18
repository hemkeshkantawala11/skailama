// client/src/Components/AddProject/AddProject.js
import React, { useState } from 'react';
import './AddProject.css';

const CreateProjectModal = ({ showModal, onClose, onSubmit }) => {
    const [projectName, setProjectName] = useState('');
    const [error, setError] = useState('');

    const handleCreate = () => {
        if (projectName.trim() === '') {
            setError("Project Name can't be empty");
        } else {
            setError('');
            onSubmit({ name: projectName }); // Call onSubmit with project data
            onClose(); // Close modal on successful creation
        }
    };

    const handleCancel = () => {
        setProjectName('');
        setError('');
        onClose(); // Close modal without saving
    };

    if (!showModal) {
        return null; // Don't render if the modal is not supposed to be shown
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Create Project</h2>
                <div className="input-group">
                    <label>Enter Project Name:</label>
                    <input
                        type="text"
                        placeholder="Type here"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>
                <div className="modal-actions">
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                    <button className="create-button" onClick={handleCreate}>Create</button>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectModal;