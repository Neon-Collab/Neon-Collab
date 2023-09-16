const models = require('../models/index');

/*
  These functions are invoked by the router, send any data needed for the query to the model.
  Gets results from controller and sends response to client
*/

module.exports = {
  get: (req, res) => {
    models.users.getUsers()
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
    models.users.getOneUser(id)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
