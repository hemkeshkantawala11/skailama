import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';
import CreateProjectModal from "../../Components/AddProject/AddProject";
import './Projects.css';
import FullLogo from "../../Resources/LogoText.png";
import settingsIcon from "../../Resources/Icon.svg";
import notificationIcon from "../../Resources/notifications.svg";

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);


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

    const getProjects = async () => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get('https://skailama-2dwr.onrender.com/projects', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setProjects(response.data.projects);
            if(response.data.projects.length > 0){
                navigate("/projects");
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const goToAddPodcast = (projectId) => {
        Cookies.set('currentProjectId', projectId);
        navigate('/podcasts');
    }

    useEffect(() => {
        getProjects();
    }, []);



    return (
        <div className="projects-page">
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <div className="logo">
                        <img src={FullLogo} alt="Ques.AI Logo" />
                    </div>
                    <div className="header-icons">
                        <span className="icon settings-icon">
                            <img src={settingsIcon} alt="Settings" onClick={() => navigate("/settings")} />
                        </span>
                            <span className="icon notification-icon">
                            <img src={notificationIcon} alt="Notifications" />
                        </span>
                    </div>
                </header>
                <div className = "projects-add-new">
                    <h2>Projects</h2>
                    <button className="create-button" onClick={() => setShowModal(true)}>
                        <span className="icon">+</span>
                         Create New Project
                    </button>
                </div>
                <CreateProjectModal
                    onSubmit={projectAdd}
                    showModal={showModal}
                    onClose={() => setShowModal(false)}
                />
            </div>
            <div className="projects-list">
                {projects.map((project) => (
                    <ProjectCard key={project._id} project={project} onClick={() => goToAddPodcast(project._id)}/>
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;
