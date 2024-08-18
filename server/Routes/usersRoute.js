const router = require("express").Router();
const usersController = require("../Controllers/usersController");

router.get("/get-current-user", usersController.getCurrentUser);
router.put("/update-user", usersController.updateUser);
module.exports = router;