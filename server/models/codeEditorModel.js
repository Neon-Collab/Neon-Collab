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
  getTests: async (problemId) => {
    const text = `
      SELECT test_case_input, test_case__output
      FROM tests
      WHERE problem_id = $1;
    `;
    const result = await pool.query(text, [problemId]);
    return result.rows;
  },
  updateScore: async (userId, problemId, score) => {
    const text = `
      UPDATE submission
      SET score = $3
      WHERE user_id = $1 AND problem_id = $2;
    `;
    const result = await pool.query(text, [userId, problemId, score]);
    return result.rowCount;
  },
  getProblemCode: async (problemId) => {
    const text = `
      SELECT problem_function_name
      FROM problems
      WHERE problem_id = $1;
    `;
    const result = await pool.query(text, [problemId]);
    return result.rows[0].problem_function_name;
  },
  updateCompletion: async (userId, problemId, status) => {
    const text = `
      UPDATE submission
      SET completed = $3
      WHERE user_id = $1 AND problem_id = $2;
  `;
    await pool.query(text, [userId, problemId, status]);
  },
  hasUserCompleted: async (userId, problemId) => {
    const text = `
      SELECT completed
      FROM submission
      WHERE user_id = $1 AND problem_id = $2;
    `
    const result = await pool.query(text, [userId, problemId]);
    if (result.rows.length > 0) {
      return result.rows[0].completed;
    }
    return false;
  },
  getUserIdByUsername: async (username) => {
    const text = `
      SELECT user_id
      FROM users
      WHERE username = $1;
    `;
    const values = [username];
    const result = await pool.query(text, values);
    return result.rows[0];
  },
};