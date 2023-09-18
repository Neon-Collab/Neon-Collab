const db = require('../../db/dbConfig');

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
};
