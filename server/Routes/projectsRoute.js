const router = require('express').Router();
const projectsController = require('../Controllers/projectsController');

router.get('/', projectsController.getAllProjectsOfAUser);
router.post('/', projectsController.createProject);
router.get('/get-project/:projectId', projectsController.getProjectById);

module.exports = router;