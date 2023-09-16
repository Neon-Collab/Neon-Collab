require('dotenv').config();
const express = require('express');
const controller = require('./controllers');

const router = express.Router();

/*
  Basic route setup
*/

// Users
router.get('/users', controller.users.get);
router.get('/users/:id', controller.users.getOne);

// Problems
router.get('/problems', controller.problems.get);
router.get('/problems/:id', controller.problems.getOne);

module.exports = router;
