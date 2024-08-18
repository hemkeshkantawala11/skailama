const Videos = require('../Models/videos');
const Projects = require('../Models/projects');
const jwt = require('jsonwebtoken');

exports.getTranscript = async (req, res) => {
    console.log("Received request to get transcript");

    try {
        const videoId = req.params.id;
        console.log("Video ID: ", videoId);
        console.log("Headers " + JSON.stringify(req.headers.bearer));
        const token = req.headers.bearer.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: 'No token provided'});
        }

        console.log("Token: ", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const transcript = await Videos.findOne({_id: videoId});

        if (!transcript) {
            return res.status(404).send('video not found');
        }
        else{
            return res.send({success:true, data: transcript, message: "Successfully got transcript"});

        }

    }
    catch (err){
        console.error("Error during getting transcript:", err);
        res.status(500).send('Failed to get transcript');
    }

}

exports.updateTranscript = async (req, res) => {
    console.log("Received request to update transcript");

    try {
        const videoId = req.params.id;
        console.log("Video ID: ", videoId);
        console.log("Headers " + JSON.stringify(req.headers.authorization.split(' ')[1]));
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: 'No token provided'});
        }

        console.log("Token: ", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const transcript = await Videos.findOneAndUpdate({_id: videoId}, {transcript: req.body.transcript});

        if (!transcript) {
            return res.status(404).send('video not found');
        } else {
            return res.send({success: true, message: "Successfully updated transcript", data: transcript});
        }
    }
    catch(err){
        console.error("Error during updating transcript:", err);
        res.status(500).send({success: false, message: "Failed updated transcript"});
    }

}