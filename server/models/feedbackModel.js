const pool = require('../../db/db.js');

module.exports = {
  getChats: async (user_id) => {
    const query = `SELECT * from chat WHERE solver_id = $1 OR reviewer_id = $1`
    const result = await pool.query(query, [user_id]);
    return result;
  },
};
