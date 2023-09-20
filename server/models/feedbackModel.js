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
  getMessages: async (chatId) => {
    const query = 'SELECT * FROM messages WHERE chat_id = $1';
    const result = await pool.query(query, [chatId]);
    return result;
  },
  postMessage: async (chatId, userId, message) => {
    const query = 'INSERT INTO messages(chat_id, user_id, message) VALUES ($1, $2, $3)';
    await pool.query(query, [chatId, userId, message]);
  },
};
