/* eslint-disable camelcase */
const pool = require('../../db/db.js');

module.exports = {
  getChats: async (user_id) => {
    const query = 'SELECT * FROM chat WHERE solver_id = $1 OR reviewer_id = $1';
    const result = await pool.query(query, [user_id]);
    return result;
  },
  getSubmissions: async (user_id) => {
    const query = 'SELECT * FROM submission WHERE user_id = $1';
    const result = await pool.query(query, [user_id]);
    return result;
  },

  getAllSubmissions: async () => {
    const query = 'SELECT * FROM submission';
    const result = await pool.query(query);
    return result;
  },

  getSubmissionsForProblem: async (problemId) => {
    const query = 'SELECT * from submission WHERE problem_id = $1';
    const result = await pool.query(query, [problemId]);
    return result;
  },
  getMessages: async (chatId) => {
    const query = 'SELECT * FROM messages WHERE chat_id = $1';
    const result = await pool.query(query, [chatId]);
    return result;
  },
  postMessage: async (chatId, userId, message) => {
    const query = 'INSERT INTO messages(chat_id, user_id, message) VALUES ($1, $2, $3)';
    await pool.query(query, [chatId, userId, message]);
  },
  pairUsers: async (problemId, user1, user2) => {
    const query = 'INSERT INTO chat(problem_id, solver_id, reviewer_id) VALUES ($1, $2, $3)';
    await pool.query(query, [problemId, user1, user2]);
  },
  getAllChats: async () => {
    const query = 'SELECT * FROM chat';
    const result = await pool.query(query);
    return result;
  },
  getPartnerId: async (chatId) => {
    const query = 'SELECT * from chat where chat_id = $1';
    const result = await pool.query(query, [chatId]);
    return result;
  },
  getPartnerSolution: async (partnerId, problemId) => {
    const query = 'SELECT * from submission where user_id = $1 AND problem_id = $2';
    const result = await pool.query(query, [partnerId, problemId]);
    return result;
  },
};
