require('dotenv').config();
const express = require('express');
const controller = require('./controllers');

const router = express.Router();

/*
  Basic route setup
*/

// Users
router.get('/users', controller.users.get);
router.get('/users/search/id:', controller.users.getOne);
router.get('/submissions/user/:id', controller.users.getCompleted);
router.get('/submissions_all/user/:id', controller.users.getAttempts);

// Problems
router.get('/problems', controller.problems.get);
router.get('/problems/search/id:', controller.problems.getOne);

// Submission/Code editor
router.post('/codeEditor/submit', controller.codeEditor.submitCode);
module.exports = router;

// Feedback
router.get('/feedback', controller.feedback.getChats);

// Overall Rankings
router.get('/rank', controller.rank.getRanks);
router.get('/rank/search/:id', controller.rank.getAUserRank);

router.get('/submissions', controller.feedback.getSubmissions);
router.get('/messages', controller.feedback.getMessages);

module.exports = router;
