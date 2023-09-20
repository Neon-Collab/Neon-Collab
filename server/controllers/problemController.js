const models = require('../models/index');

/*
  These functions are invoked by the router, send any data needed for the query to the model
*/

module.exports = {
  get: (req, res) => {
    models.problems.getProblems()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  getOne: (req, res) => {
    const { id } = req.params;
    models.problems.getOneProblem(id)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  getWithScores: (req, res) => {
    models.problems.getProblemsWithScores()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  },
};
