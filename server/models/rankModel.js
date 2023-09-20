const db = require('../../db/db.js');
const { rankUsers, getUserScore } = require('../../data/ranking.js');

/*
  These functions are invoked by the controllers.
  Query the db and send results back to controller
*/

module.exports = {
  getUserRanks: async () => {
    const text = `SELECT user_id, json_strip_nulls(json_agg(json_build_object('id', problem_id, 'difficulty', difficulty, 'score', score, 'feedback', feedback))) as problems FROM submission RIGHT JOIN problems USING (problem_id) WHERE completed = TRUE AND AGE(current_date, submission_DATE) <= interval '21 days' GROUP BY user_id;
    `;
    const results = await db.query(text);

    const userSubmissions = [];
    results.rows.map((element) => {
      const sub = {};
      sub.user_id = element.user_id;
      sub.score = getUserScore(element);
      userSubmissions.push(sub);
    });
    const rankedUsers = rankUsers(userSubmissions);
    console.log(rankedUsers);
    return rankedUsers;
  },
};
