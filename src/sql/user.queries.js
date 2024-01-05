const bcrypt = require("bcrypt");

const createUser = async (
  { name, lastname, email, phone, gender, hashedPassword },
  client
) => {
  const query = `
  INSERT INTO users (name, lastname, email, phone, gender, password)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;`;

  return await executeQuery(query, client, [
    name,
    lastname,
    email,
    phone,
    gender,
    hashedPassword,
  ]);
};

const getPasswordForEmail = async ({ email }, client) => {
  const query = `SELECT id,password FROM USERS WHERE email = $1`;
  return await executeQuery(query, client, [email]);
};

const storeSession = async (sessionId, userId, client) => {
  const query = `
  INSERT INTO sessions (userid, sessionid)
  VALUES ($1, $2)
  RETURNING *;`;
  return await executeQuery(query, client, [
    userId,
    sessionId.toString("utf8"),
  ]);
};

const checkForSession = async (sessionId, client) => {
  const query = `
    SELECT EXISTS (
    SELECT 1
    FROM sessions
    WHERE sessionid = $1
  );`;

  const result = await client.query(query, [sessionId]);
  return result.rows[0].exists;
};

const deleteUser = () => {
  const query = `
      DELETE FROM users
      WHERE name = $1
        AND lastname = $2
        AND email = $3
        AND phone = $4
        AND gender = $5
        AND password = $6
      RETURNING *;`;
};

const executeQuery = (query, client, params) => {
  return new Promise((resolve, reject) => {
    client.query(query, params, (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        reject(err);
      } else {
        console.log("Query result", result.rows);
        resolve(result.rows[0]);
      }
    });
  });
};

module.exports = {
  createUser,
  deleteUser,
  getPasswordForEmail,
  storeSession,
  checkForSession,
};
