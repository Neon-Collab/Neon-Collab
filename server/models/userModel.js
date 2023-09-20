const db = require('../../db/db.js');

/*
  These functions are invoked by the controllers.
  Query the db and send results back to controller
*/

module.exports = {
  getUsers: async () => {
    const text = 'SELECT * FROM users;';
    const results = await db.query(text);
    return results.rows;
  },
  getOneUser: async (id) => {
    const text = 'SELECT * FROM users WHERE id = $1;';
    const values = [id];
    const results = await db.query(text, values);
    return results.rows;
  },
  addOneUser: async (userData) => {
    const insert = 'INSERT INTO users(first_name, last_name, username, email, skill_level) VALUES ($1, $2, $3, $4, $5)';
    try {
      await db.query(insert, userData);
      console.log('user posted to postgres');
    } catch (err) {
      console.error(err);
      console.log(err.message);
    }
  },
  getUserCompleted: async (id) => {
    const text = 'SELECT * FROM submission WHERE user_id = $1 AND completed = true';
    const values = [id];
    const results = await db.query(text, values);
    return results.rows;
  },
  getUserAttempts: async (id) => {
    const text = 'SELECT * FROM submission WHERE user_id = $1';
    const values = [id];
    const results = await db.query(text, values);
    return results.rows;
  },
};
