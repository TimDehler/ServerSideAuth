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

// const query = `SELECT * FROM sessions`;
// DB_CLIENT.query(query, (err, result) => {
//   if (err) {
//     console.error("Error executing query", err);
//   } else {
//     console.log("Query result", result.rows);
//   }
// });

app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(process.env.port, () => {
  console.log(`Server running on port ${process.env.port}`);
});
