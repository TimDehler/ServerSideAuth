const expressAsyncHandler = require("express-async-handler");

const authenticateSession = expressAsyncHandler(async (req, res, next) => {
  const reqSessionId = req.headers.cookie
    ? req.headers.cookie.split("=")[1]
    : null;
  const userSession = sessions[reqSessionId];

  if (!userSession) {
    return res.status(401).send("Invalid session");
  }

  req.user = userSession;
  next();
});

module.exports = authenticateSession;
