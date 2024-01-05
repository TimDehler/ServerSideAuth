const expressAsyncHandler = require("express-async-handler");
const { checkForSession } = require("../sql/user.queries");

const authenticateSession = expressAsyncHandler(async (req, res, next) => {
  const reqSessionId = req.cookies.session;

  console.log("Authenticating with sessionId...");
  console.log(reqSessionId);

  const sessionExists = await checkForSession(reqSessionId, req.DB_CLIENT);

  if (!sessionExists) {
    return res.status(401).send("Invalid session");
  }
  next();
});

module.exports = authenticateSession;
