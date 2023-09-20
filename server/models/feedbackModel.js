/* eslint-disable camelcase */
const pool = require('../../db/db.js');

module.exports = {
  getChats: async (user_id) => {
    const query = 'SELECT * from chat WHERE solver_id = $1 OR reviewer_id = $1';
    const result = await pool.query(query, [user_id]);
    return result;
  },
  getSubmissions: async (user_id) => {
    const query = 'SELECT * from submission WHERE user_id = $1';
    const result = await pool.query(query, [user_id]);
    return result;
  },
  getSubmissionsForProblem: async (problemId) => {
    const query = 'SELECT * from submission WHERE problem_id = $1';
    const result = await pool.query(query, [problemId]);
    return result;
  },
  getMessages: async (chatId) => {
    const query = 'SELECT * from messages WHERE chat_id = $1';
    const result = await pool.query(query, [chatId]);
    return result;
  },
};
