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
    const { id } = req.params;
    models.users.getOneUser(id)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  addUser: (req, res) => {
    const {
      firstname,
      lastname,
      username,
      email,
      skill,
    } = req.body;
    models.users.addOneUser([firstname, lastname, username, email, skill])
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);

  getCompleted: (req, res) => {
    const { id } = req.params;
    models.users.getUserCompleted(id)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
    
  getAttempts: (req, res) => {
    const { id } = req.params;
    models.users.getUserAttempts(id)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
