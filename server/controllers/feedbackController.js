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
  postMessage: async (req, res) => {
    const { chatId, userId, message } = req.body;
    await feedbackModel.postMessage(chatId, userId, message);
    res.sendStatus(201);
  },
  getAllSubmissions: async (req, res) => {
    const results = await feedbackModel.getAllSubmissions();
    res.send(results.rows).status(200);
  },
  pairUsers: async (req, res) => {
    const { problem_id, solver_id, reviewer_id } = req.body;
    await feedbackModel.pairUsers(problem_id, solver_id, reviewer_id);
    res.sendStatus(201);
  },
  getAllChats: async (req, res) => {
    const results = await feedbackModel.getAllChats();
    res.send(results.rows).status(200);
  },
  getPartnerId: async (req, res) => {
    const { chatId } = req.query;
    const results = await feedbackModel.getPartnerId(chatId);
    res.send(results.rows).status(200);
  },
  getPartnerSolution: async (req, res) => {
    const { partnerId, problemId } = req.query;
    const results = await feedbackModel.getPartnerSolution(partnerId, problemId);
    res.send(results.rows).status(200);
  },
};
