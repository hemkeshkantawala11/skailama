const Project = require('../Models/projects');
const Video = require('../Models/videos');
const User = require('../Models/users');
const jwt = require('jsonwebtoken');

exports.addVideo = async (req, res) => {
    console.log("Received request to add video");

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        console.log("Token: ", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        console.log("User authenticated: ", user);

        console.log("Received Data: ", req.body);
        const { name, transcript, projectId} = req.body;

        if (!name || !transcript || !projectId) {
            return res.status(400).send("All fields are required");
        }
        const date = new Date();

        const newVideo = new Video({ name, transcript, date });
        const savedVideo = await newVideo.save();

        const project = await Project.findOneAndUpdate(
            { _id: projectId },
            { $push: { videos: savedVideo._id } },
            { new: true }
        );

        if (!project) {
            return res.status(404).send('Project not found');
        }

        res.send(project);

    } catch (err) {
        console.error("Error during adding video:", err);
        res.status(500).send('Failed to add video');
    }
};

exports.getVideosByProject = async (req, res) => {
    console.log("Received request to get videos by project");

    try {
        const projectId = req.headers.authorization.split(' ')[1];

        if (!projectId) {
            return res.status(401).json({ message: 'No project id provided' });
        }

        console.log("Project ID: ", projectId);

        const project = await Project.findById(projectId).populate('videos');

        if (!project) {
            return res.status(404).send('Project not found');
        }

        console.log("Project: ", project);

        res.send(project.videos);

    } catch (err) {
        console.error("Error during getting videos by project:", err);
        res.status(500).send('Failed to get videos by project');
    }
};

exports.deleteVideo = async (req, res) => {
    console.log("Received request to delete video");

    try {
        console.log("Received request to delete video");
        console.log("Headers " + JSON.stringify(req.params));
        const token = req.headers.authorization.split(' ')[1];
        const videoId = req.params.id;
        console.log("Token: ", token);
        console.log("Video ID: ", videoId);
        console.log(1);

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        console.log(2);
        if (!videoId) {
            return res.status(401).json({ message: 'No video id provided' });
        }
        console.log(3);
        console.log("Token: ", token);
        console.log("Video ID: ", videoId);

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).send('Video not found');
        }

        await Video.findByIdAndDelete(videoId);
        const project = await Project.findOneAndUpdate(
            { videos: videoId },
            { $pull: { videos: videoId } },
            { new: true }
        );

        if (!project) {
            return res.status(404).send('Project not found');
        }

        res.send(video);

    } catch (err) {
        console.error("Error during deleting video:", err);
        res.status(500).send('Failed to delete video');
    }
};