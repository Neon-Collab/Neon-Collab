const models = require('../models/problemModel');

module.exports = {

  get: (req, res) => {
    models.problems.getProblems()
      .then((response) => {
        res.status(200).send(response);
      });
  },
  getOne: (req, res) => {
    const { id } = req.params; // Gets user id from query params
    models.problems.getOneProblem(id)
      .then((response) => {
        res.status(200).send(response);
      });
  },
};
