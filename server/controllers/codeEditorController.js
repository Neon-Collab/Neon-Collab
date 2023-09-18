const codeEditorModel = require('../models/codeEditorModel.js');

module.exports = {
  addCode: async (req, res) => {
    const { userId, problemId, code } = req.body;

    try {
      const submission = await codeEditorModel.addCode(userId, problemId, code);
      res.status(201).send(submission);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
};