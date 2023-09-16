const models = require('../models/userModel');

module.exports = {
  get: (req, res) => {
    models.users.getUsers()
      .then((response) => {
        res.status(200).send(response);
      });
  },
  getOne: (req, res) => {
    const { id } = req.params; // Gets user id from query params
    models.users.getOneUser(id)
      .then((response) => {
        res.status(200).send(response);
      });
  },
};
