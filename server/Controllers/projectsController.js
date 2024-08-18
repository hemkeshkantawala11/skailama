const mongoose = require('mongoose');
const Project = require('../Models/projects');
const User = require('../Models/users');
const jwt = require('jsonwebtoken');

exports.createProject = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).send('No token provided');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const project = new Project({
            name: req.body.name,
            videos: []
        });
        const savedProject = await project.save();
        user.projects.push(savedProject._id);
        await user.save();
        res.send(savedProject);

    } catch (err) {
        console.error('Error verifying token:', err);
        res.status(500).send('Failed to authenticate token');
    }
};


exports.getAllProjectsOfAUser = async (req, res) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).send('No token provided');
        }

        const decoded2 = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded2.userId;
        const user = await User.findById(userId).populate('projects');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ projects: user.projects });
    } catch (error) {
        console.error('Error fetching user projects:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getProjectById = async (req, res) => {
    try {
        console.log("Reached projects");

        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).send('No token provided');
        }
        console.log("Reached projects 2");


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("proId" + JSON.stringify(req.params));
        const project = await Project.findById(req.params.projectId);
        console.log("pro " + project);

        if (!project) {
            return res.status(404).send('Project not found');
        }

        res.send(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).send('Failed to get project');
    }
}
