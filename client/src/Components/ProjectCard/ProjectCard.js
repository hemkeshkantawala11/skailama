import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick}) => {
    return (
        <div className="project-card" onClick={() => onClick(project._id)}>
            <div className="project-thumbnail">
                {/* Display project initials */}
                <div className="initials">{project.name.charAt(0)}</div>
            </div>
            <div className="project-details">
                <h3>{project.name}</h3>
                {/*<p>{project.episodes} Episodes</p>*/}
                {/*<small>Last edited {project.lastEdited}</small>*/}
            </div>
        </div>
    );
};

export default ProjectCard;
