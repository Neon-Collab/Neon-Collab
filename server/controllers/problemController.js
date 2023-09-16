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
    const { id } = req.params; // Gets user id from query params
    models.problems.getOneProblem(id)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
