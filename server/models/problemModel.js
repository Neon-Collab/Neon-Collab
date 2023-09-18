const db = require('../../db/db.js');

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
    const text = 'SELECT * FROM problems WHERE problem_id = $1;';
    const values = [id];
    const results = await db.query(text, values);
    console.log(results.rows)
    return results.rows[0];
  },
};
