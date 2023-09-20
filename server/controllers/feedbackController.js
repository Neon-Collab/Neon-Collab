const feedbackModel = require('../models/feedbackModel.js');

module.exports = {
  getChats: async (req, res) => {
    const { id } = req.query;
    const results = await feedbackModel.getChats(id);
    res.send(results.rows).status(200);
  },
  getSubmissions: async (req, res) => {
    const { id } = req.query;
    const results = await feedbackModel.getSubmissions(id);
    res.send(results.rows).status(200);
  },
  getSubmissionsForProblem: async (req, res) => {
    const { problemId } = req.params;
    const results = await feedbackModel.getSubmissionsForProblem(problemId);
    res.send(results.rows).status(200);
},
  getMessages: async (req, res) => {
    const { chatId } = req.query;
    const results = await feedbackModel.getMessages(chatId);
    res.send(results.rows).status(200);
  },
};
