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
    p.problem_id,
    p.problem_name,
    p.description,
    AVG(s.score) as averageScore
    FROM
    problems p
    LEFT JOIN
    submission s ON p.problem_id = s.problem_id
    GROUP BY
    p.problem_id, p.problem_name, p.description
    `;

    const results = await db.query(query);
    return results.rows;
  },
};
