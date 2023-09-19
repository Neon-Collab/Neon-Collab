const feedbackModel = require('../models/feedbackModel.js');

module.exports = {
  getChats: async (req, res) => {
    const { id } = req.query;
    const results = await feedbackModel.getChats(id);
    res.send(results.rows).status(200);
  },
};
