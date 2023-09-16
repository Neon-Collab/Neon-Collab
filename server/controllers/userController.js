const models = require('../models/userModel');

module.exports = {
  get: (req, res) => {
    models.users.getUsers()
      .then((response) => {
        res.status(200).send(response);
      });
  },
  getOne: (req, res) => {
    models.users.getOneUser()
      .then((response) => {
        res.status(200).send(response);
      });
  },
};
