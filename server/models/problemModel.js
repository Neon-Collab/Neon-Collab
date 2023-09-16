const db = require('../../db/dbConfig');

/*
  These functions are invoked by the controllers.
  Query the db and send results back to controller
*/

module.exports = {
  getProblems: async () => {
    const text = 'SELECT * FROM problems;';
    const results = await db.query(text);
    return results.rows;
  },
  getOneProblem: async (id) => {
    const text = 'SELECT * FROM users WHERE id = $1;';
    const values = [id];
    const results = await db.query(text, values);
    return results.rows;
  },
};
