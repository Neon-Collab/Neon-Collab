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

// Submission/Code editor
router.post('/codeEditor/submit', controller.codeEditor.addCode);
module.exports = router;

// Feedback
router.get('/feedback', controller.feedback.getChats);

// Ranking
router.get('/rank', controller.rank.getRanks);
router.get('/submissions', controller.feedback.getSubmissions);
router.get('/messages', controller.feedback.getMessages);
