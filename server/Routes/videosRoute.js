const router = require('express').Router();
const videosController = require('../Controllers/videosController');

router.post('/add-video', videosController.addVideo);
router.get('/get-by-project', videosController.getVideosByProject);
router.delete(`/delete-video/:id`, videosController.deleteVideo);

module.exports = router;