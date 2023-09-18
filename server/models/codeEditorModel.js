const pool = require('../../db/db.js');
module.exports = {
  addCode: async (userId, problemId, code) => {
    const text = `
      INSERT INTO submission (user_id, problem_id, code)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await pool.query(text, [userId, problemId, code]);
    return result.rows[0];
  },
};
