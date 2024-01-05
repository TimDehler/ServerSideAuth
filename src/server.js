const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db.Connection");
const dotenv = require("dotenv").config();
const cors = require("cors");

const getCurrentDateTimeString = require("./util/dateTime");

const DB_CLIENT = connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  req.DB_CLIENT = DB_CLIENT;
  next();
});

const { date, time } = getCurrentDateTimeString();
console.log(date);
console.log(time);

const clearTables = () => {
  DB_CLIENT.query("DELETE FROM sessions");
  DB_CLIENT.query("DELETE FROM users");

  const query = `SELECT * FROM sessions`;
  DB_CLIENT.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
    } else {
      console.log("Query result", result.rows);
    }
  });

  const query2 = `SELECT * FROM users`;
  DB_CLIENT.query(query2, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
    } else {
      console.log("Query result", result.rows);
    }
  });
};

const addColumnToSessionsTable = async (client) => {
  try {
    const query =
      "ALTER TABLE sessions ADD COLUMN creationTime VARCHAR(255) NOT NULL;";
    await client.query(query);

    console.log("Column added successfully.");
  } catch (error) {
    console.error("Error adding column:", error);
    throw error;
  }
};

const deleteColumnFromSessionsTable = async (client) => {
  try {
    const query =
      "ALTER TABLE sessions DROP COLUMN IF EXISTS creationDateTime;";
    await client.query(query);

    console.log("Column deleted successfully.");
  } catch (error) {
    console.error("Error deleting column:", error);
    throw error;
  }
};

const getSessionsTableEntries = async (client) => {
  try {
    const query = "SELECT * FROM sessions;";
    const result = await client.query(query);
    console.log(result.rows);
  } catch (error) {
    throw error;
  }
};

getSessionsTableEntries(DB_CLIENT);
// deleteColumnFromSessionsTable(DB_CLIENT);
// addColumnToSessionsTable(DB_CLIENT);
// clearTables();

app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(process.env.port, () => {
  console.log(`Server running on port ${process.env.port}`);
});
