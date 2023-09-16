const models = require('../models/problemModel');

module.exports = {

  get: (req, res) => {
    models.problems.getProblems()
      .then((response) => {
        res.status(200).send(response);
      });
  },
  getOne: (req, res) => {
    models.problems.getOneProblem()
      .then((response) => {
        res.status(200).send(response);
      });
  },
};
