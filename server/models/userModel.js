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
