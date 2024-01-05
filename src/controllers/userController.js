const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const uuidv4 = require("uuid").v4;

const {
  createUser,
  getPasswordForEmail,
  storeSession,
} = require("../sql/user.queries");

//@desc Register a user
//@route POST /api/users/register
// @access public
// controllers/userController.js
const registerUser = asyncHandler(async (req, res) => {
  const { name, lastname, email, phone, gender, password } = req.body;

  if (!name || !lastname || !email || !phone || !gender || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const queryResult = await createUser(
    { name, lastname, email, phone, gender, hashedPassword },
    req.DB_CLIENT
  );

  if (queryResult) {
    res.status(201).json({
      message: "Created",
      user: queryResult,
    });
  } else {
    res.status(500);
    throw new Error("SQL Error");
  }
});

//@desc Login user
//@route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const client = req.DB_CLIENT;

  const queryResult = await getPasswordForEmail({ email }, client);

  if (!queryResult) {
    res.status(401);
    throw new Error("Invalid Credentials");
  }

  const isPwdMatch = await bcrypt.compare(password, queryResult.password);

  if (!isPwdMatch) {
    res.status(401);
    throw new Error("Invalid Credentials");
  }

  const sessionId = uuidv4();

  const sessionQueryResult = await storeSession(
    sessionId,
    queryResult.id,
    client
  );

  if (!sessionQueryResult) {
    throw new Error();
  }

  if (sessionQueryResult && isPwdMatch) {
    res.set("Set-Cookie", `session=${sessionId}`);
    res.send("success");
  }
});

//@desc Get current user
//@route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  try {
    res.status(200).send("OK");
  } catch (error) {
    res.json({ error });
  }
});

module.exports = { registerUser, loginUser, currentUser };
