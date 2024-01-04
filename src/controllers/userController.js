const asyncHandler = require("express-async-handler");

const { createUser } = require("../queries/user.queries");

//@desc Register a user
//@route POST /api/users/register
// @access public
// controllers/userController.js

const registerUser = asyncHandler(async (req, res) => {
  const { name, lastname, email, phone, gender, password } = req.body;

  if (!name || !lastname || !email || !phone || !gender || !password) {
    console.log("did validity check");
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  try {
    const queryResult = await createUser(
      { name, lastname, email, phone, gender, password },
      req.DB_CLIENT
    );

    res.status(201).json({
      queryResult,
    });
  } catch (error) {
    console.log("Error");
    res.status(400);
    throw new Error("SQL Error");
  }
});

//@desc Login user
//@route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  console.log("inside login handler");
  const client = req.DB_CLIENT;
  client.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.json({
        message: "Fehler",
      });
    } else {
      console.log("Query result:", result.rows);
      res.json({
        result: result.rows,
      });
    }
  });
});

//@desc Get current user
//@route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {});

module.exports = { registerUser, loginUser, currentUser };
