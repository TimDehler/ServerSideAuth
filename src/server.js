const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db.Connection");
const dotenv = require("dotenv").config();
const cors = require("cors");

const DB_CLIENT = connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  req.DB_CLIENT = DB_CLIENT;
  next();
});

app.use("/api/private/users", require("./routes/private/privateUserRoutes"));
app.use("/api/public/users", require("./routes/public/publicUserRoutes"));

app.use(errorHandler);

app.listen(process.env.port, () => {
  console.log(`Server running on port ${process.env.port}`);
});
