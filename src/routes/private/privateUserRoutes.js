const express = require("express");

const { currentUser } = require("../../controllers/userController");
const authenticateSession = require("../../middleware/validateSessionCookie");

const router = express.Router();

router.use(authenticateSession);

router.route("/current").get(currentUser);

module.exports = router;
