import React, { useEffect, useState } from 'react';
import LeftSideNavBar from '../../Components/LeftSideNavBar/LeftSideNavBar'; // Import your existing component
import './editPodcast.css';
import Cookies from "js-cookie";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const EditTranscriptPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [transcript, setTranscript] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [proName, setProName] = useState("hi")


    const getproject = async () => {
        const token = Cookies.get('token');
        const id = Cookies.get('currentProjectId');
        try {
            const response = await axios.get(`http://localhost:8080/projects/get-project/${id}`, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Project Data: ", response.data.name);
            setProName(response.data.name);

            if (response.data.success) {
                setProName(response.data.name);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const getUser = async () => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get('http://localhost:8080/users/get-current-user', {
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

    const getTranscript = async () => {
        const id = Cookies.get('currentVideoId');
        const token = Cookies.get('token');
        const response = await axios.get(`http://localhost:8080/transcript/get-transcript/${id}`, {
            headers: {
                ContentType: 'application/json',
                bearer: `Bearer ${token}`
            }
        });
        if (response.data.success) {
            setTranscript(response.data.data.transcript);
        } else {
            navigate("/podcasts");
        }
    };

    const saveTranscript = async () => {
        const id = Cookies.get('currentVideoId');
        const token = Cookies.get('token');
        try {
            const response = await axios.put(`http://localhost:8080/transcript/update-transcript/${id}`, {
                transcript
            }, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setIsEditing(false);
            } else {
                console.error('Error saving transcript:', response.data.message);
            }
        } catch (error) {
            console.error('Error saving transcript:', error);
        }
    };

    const editT = () => {
        if (isEditing) {
            saveTranscript();
        } else {
            setIsEditing(true);
        }
    };

    useEffect(() => {
        getUser();
        getTranscript();
        getproject();
    }, []);

    return (
        <div className="edit-transcript-page">
            <LeftSideNavBar Username={user} email={email} />
            <div className="content">
                <div className="breadcrumb">
                    <a href="/projects">Home Page</a> / <a href="/podcasts">{proName}</a> / <span>Edit your podcast</span>
                </div>
                <div className="transcript-container">
                    <div className="transcript-header">
                        <div className="header">
                            <Link to="/podcasts" className="back-button">←</Link>
                        </div>
                        <h2>Edit Transcript</h2>
                        <button className="edit-button" onClick={editT}>{isEditing ? 'Save' : 'Edit'}</button>
                    </div>
                    <div className="transcript-content">
                        <h3>Speaker</h3>
                        {isEditing ? (
                            <textarea
                                cols="30"
                                rows="10"
                                value={transcript}
                                onChange={(e) => setTranscript(e.target.value)}
                            />
                        ) : (
                            <p>{transcript}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTranscriptPage;