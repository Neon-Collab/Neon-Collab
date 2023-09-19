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
    console.log(results.rows);
    return results.rows[0];
  },
  getProblemsWithScores: async () => {
    const query = `
      SELECT
        problems.problem_id,
        problems.problem_name,
        problems.description,
        problems.difficulty,
        problems.problem_code,
        problems.problem_number,
        COALESCE(AVG(submission.score), 0) AS averageScore
      FROM problems
      LEFT JOIN submission ON problems.problem_id = submission.problem_id
      GROUP BY problems.problem_id
      ORDER BY problems.problem_number;
    `;

    const results = await db.query(query);
    return results.rows;
  },
};
