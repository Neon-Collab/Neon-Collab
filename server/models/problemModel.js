const db = require('../../db/dbConfig');

db.connect();

module.exports = {
  getProblems: async () => {
    const text = 'SELECT * FROM problems;';
    const results = await db.query(text);
    db.end();
    return results.rows;
  },
  getOneProblem: async (id) => {
    const text = 'SELECT * FROM users WHERE id = $1;';
    const values = [id];
    const results = await db.query(text, values);
    db.end();
    return results.rows;
  },
};
