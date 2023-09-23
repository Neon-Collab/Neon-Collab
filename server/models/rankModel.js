const db = require('../../db/db.js');
const { rankUsers, getUserScore } = require('../../data/ranking.js');

/*
  These functions are invoked by the controllers.
  Query the db and send results back to controller
*/

module.exports = {
  calculateUserRanks: async () => {
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
    for (let user of rankedUsers) {
      const insertText = 'INSERT INTO rankings(user_id, total_score, rank) VALUES ($1, $2, $3);';
      const values = [user.user_id, user.score, user.rank];

      try {
        db.query(insertText, values);
      } catch (error) {
        console.log(error);
      }
    }
    return rankedUsers;
  },
  getUserRanks: async () => {
    const text = 'SELECT r.user_id,u.username,r.total_score,r.rank from rankings r JOIN users u ON r.user_id = u.user_id ORDER BY rank';
    const results = await db.query(text);
    return results.rows;
  },
  getOneUserRank: async (id) => {
    const text = 'SELECT rank from rankings WHERE user_id = $1';
    const values = [id];
    const results = await db.query(text, values);
    return results.rows[0];
  },
};
