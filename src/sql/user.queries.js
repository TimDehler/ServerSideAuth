const bcrypt = require("bcrypt");

const createUser = async (
  { name, lastname, email, phone, gender, password },
  client
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
  INSERT INTO users (name, lastname, email, phone, gender, password)
  VALUES ('${name}', '${lastname}', '${email}', '${phone}', '${gender}', '${hashedPassword}')
  RETURNING *;`;
  return await executeQuery(query, client);
};

const getPasswordForEmail = async ({ email, password }, client) => {
  const query = `SELECT password FROM USERS WHERE email = '${email}'`;
  return await executeQuery(query, client);
};

const executeQuery = (query, client) => {
  return new Promise((resolve, reject) => {
    client.query(query, (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        reject(err);
      } else {
        console.log("Query result", result.rows[0]);
        resolve(result.rows[0]);
      }
    });
  });
};

const deleteUser = () => {
  const deleteQuery = `
      DELETE FROM users
      WHERE name = $1
        AND lastname = $2
        AND email = $3
        AND phone = $4
        AND gender = $5
        AND password = $6
      RETURNING *;`;
};

module.exports = { createUser, deleteUser, getPasswordForEmail };
