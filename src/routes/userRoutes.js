const express = require("express");
const cookieParser = require("cookie-parser");

const {
  currentUser,
  registerUser,
  loginUser,
} = require("../controllers/userController");
const authenticateSession = require("../middleware/validateSessionCookie");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.use(cookieParser());
router.use(authenticateSession);

router.route("/current").get(currentUser);

module.exports = router;
