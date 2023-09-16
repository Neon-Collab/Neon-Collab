const db = require('../../db/dbConfig');

db.connect();

module.exports = {
  getUsers: async () => {
    const text = 'SELECT * FROM users;';
    const results = await db.query(text);
    db.end();
    return results.rows;
  },
  getOneUser: async (id) => {
    const text = 'SELECT * FROM users WHERE id = $1;';
    const values = [id];
    const results = await db.query(text, values);
    db.end();
    return results.rows;
  },
};
