const route = require('express').Router();
const transcriptController = require('../Controllers/transcriptController');


route.get('/get-transcript/:id', transcriptController.getTranscript);
route.put('/update-transcript/:id', transcriptController.updateTranscript);

module.exports = route;