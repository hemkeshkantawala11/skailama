import React, { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import LeftSideNavBar from '../../Components/LeftSideNavBar/LeftSideNavBar';
import BoxComponent from '../../Components/BoxComponent/BoxComponent';
import './AddPodcast.css';
import RSS from '../../Resources/RSS.png';
import YT from '../../Resources/YT.png';
import UP from '../../Resources/iconUpload.png';
import UploadModal from "../../Components/UploadModal/UploadModal";
import { useNavigate } from 'react-router-dom';

const AddPodcast = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState("");
    const [hasVideos, setHasVideos] = useState(false);
    const [project, setProject] = useState(null);
    const [videos, setVideos] = useState([]);
    const [proName, setProName] = useState("hi");
    const [loading, setLoading] = useState(false);

    const projects = () => {
        setProject(Cookies.get('currentProjectId'));
    }

    const getproject = async () => {
        const token = Cookies.get('token');
        const id = Cookies.get('currentProjectId');
        try {
            const response = await axios.get(`https://skailama-2dwr.onrender.com/projects/get-project/${id}`, {
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

    const checkVideos = async () => {
        const projectId = Cookies.get('currentProjectId');
        try {
            const response = await axios.get(`https://skailama-2dwr.onrender.com/videos/get-by-project`, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${projectId}`
                }
            });
            console.log("Videos: ", response.data);

            if (response.data.length > 0) {
                setHasVideos(true); // Set to true if videos exist
                setVideos(response.data);
            } else {
                setHasVideos(false); // Set to false if no videos exist
            }
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const deleteAVideo = async (id) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.delete(`https://skailama-2dwr.onrender.com/videos/delete-video/${id}`, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Video deleted: ", response.data);
            const updatedVideos = videos.filter(video => video._id !== id);
            setVideos(updatedVideos);
            if (updatedVideos.length === 0) {
                setHasVideos(false); // Set to false if no videos are left
            }
        } catch (error) {
            console.error('Error deleting video:', error)
        }
    }

    const videoAdd = async (data) => {
        const token = Cookies.get('token');
        setLoading(true);
        try {
            const videoResponse = await axios.post('https://skailama-2dwr.onrender.com/videos/add-video', {
                name: data.name,
                transcript: data.transcript,
                projectId: data.projectId
            }, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Video Data " + JSON.stringify(videoResponse.data));
            setVideos([...videos, videoResponse.data]);
            setHasVideos(true); // Set to true when a new video is added
        } catch (error) {
            console.error('Error adding video:', error);
        } finally {
            setLoading(false);
        }
    };

    const oc = (type) => {
        setType(type);
        setShowModal(true);
    };

    const gotopodcast = (id) => {
        console.log("REACHED HERE ");
        console.log("Video ID: ", id);
        Cookies.set('currentVideoId', id);
        navigate('/edit');
    }

    useEffect(() => {
        getUser();
        checkVideos();
        projects();
        getproject();
    }, []);

    useEffect(() => {
        if (!loading) {
            checkVideos();
        }
    }, [loading]);

    console.log("name: "+ proName);

    return (
        <div className="add-podcast-page">
            <LeftSideNavBar Username={user} email={email}/>
            <div className="content">
                <div className="header">
                    <div className="breadcrumb">
                        <a href="/projects">Home Page</a> / <a href="/podcasts">{proName}</a> / <span>Add your podcast</span>
                    </div>
                    <div className="top-icons">
                        <i className="icon-bell"></i>
                        <i className="icon-exit"></i>
                    </div>
                </div>
                <h1>Add Podcast</h1>

                <div className="box-container">
                    <BoxComponent
                        icon={RSS}
                        title="RSS Feed"
                        description="Lorem ipsum dolor sit. Dolor lorem sit."
                        backgroundColor="#FFF3E0"
                        onClick={() => oc("RSS")}
                    />
                    <BoxComponent
                        icon={YT}
                        title="Youtube Video"
                        description="Lorem ipsum dolor sit. Dolor lorem sit."
                        backgroundColor="#FFE0E0"
                        onClick={() => oc("YT")}
                    />
                    <BoxComponent
                        icon={UP}
                        title="Upload Files"
                        description="Lorem ipsum dolor sit. Dolor lorem sit."
                        backgroundColor="#E0E7FF"
                        onClick={() => oc("UP")}
                    />
                </div>

                {/* Conditional rendering of the file-upload section based on the presence of videos */}
                {hasVideos ? (
                    <div className="videos-container">
                        <h2>Existing Videos</h2>
                        <table className="video-table">
                            <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Upload Date & Time</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {videos.map((video, index) => (
                                <tr key={video.id}>
                                    <td>{index + 1}</td>
                                    <td>{video.name}</td>
                                    <td>{new Date(video.uploadDate).toLocaleString()}</td>
                                    <td>
                                        <button onClick={() => gotopodcast(video._id)}>View</button>
                                        <button onClick={() => deleteAVideo(video._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="file-upload">
                        <i className="icon-cloud-upload"></i>
                        <p>Select a file or drag and drop here (Podcast Media or Transcription Text)</p>
                        <small>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</small>
                        <button className="select-file" onClick={() => oc("UP")}>Select File</button>
                    </div>
                )}

                <UploadModal
                    source={type === "RSS" ? RSS : type === "YT" ? YT : UP}
                    typeOf={type}
                    onSubmit={videoAdd}
                    showModal={showModal}
                    onClose={() => setShowModal(false)}
                    pro={project}
                />
            </div>
        </div>
    );
};

export default AddPodcast;