const models = require('../models/index');

/*
  These functions are invoked by the router, send any data needed for the query to the model.
  Gets results from controller and sends response to client
*/

module.exports = {
  calculateRanks: (req, res) => {
    models.rank.calculateUserRanks()
      .then((response) => {
        res.status(200).send(response);
      });
  },
  getRanks: (req, res) => {
    models.rank.getUserRanks()
      .then((response) => {
        res.status(200).send(response);
      });
  },
  getAUserRank: (req, res) => {
    const { id } = req.params;
    models.rank.getOneUserRank(id)
      .then((response) => {
        res.status(200).send(response);
      });
  },
};
