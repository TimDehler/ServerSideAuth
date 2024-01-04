const express = require("express");
const uuidv4 = require("uuid").v4;
const cors = require("cors");

const PORT = 3001;
const app = express();
const sessions = {};
const users = {};

const authenticateSession = (req, res, next) => {
  const reqSessionId = req.headers.cookie
    ? req.headers.cookie.split("=")[1]
    : null;
  const userSession = sessions[reqSessionId];

  if (!userSession) {
    return res.status(401).send("Invalid session");
  }

  req.user = userSession;
  next();
};

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  if (req.path === "/register" || req.path === "/login") {
    return next();
  }
  return authenticateSession(req, res, next);
});

app.post("/register", (req, res) => {
  const { vorname, nachname, email, telefon, gender, passwort } = req.body;

  if (!vorname || !nachname || !email || !telefon || !gender || !passwort) {
    res.status(400).send("Invalid user");
  }

  const user = {
    vorname,
    nachname,
    email,
    telefon,
    gender,
    passwort,
  };
  users[vorname] = user;

  res.status(201).json(user);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!users[username]) {
    return res.status(404).send("User not found");
  }
  console.log(users[username]);

  if (users[username].passwort !== password) {
    return res.status(401).send("Invalid username or password");
  }

  const sessionId = uuidv4();
  sessions[sessionId] = { username, userId: 1 };
  res.set("Set-Cookie", `session=${sessionId}`);
  res.send("success");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/logout", (req, res) => {
  const reqSessionId = req.user ? req.user.sessionId : null;

  if (!reqSessionId || !sessions[reqSessionId]) {
    return res.status(401).send("Invalid session");
  }

  // Clear the session and cookie
  delete sessions[reqSessionId];
  res.clearCookie("session");
  res.send("Logged out successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
