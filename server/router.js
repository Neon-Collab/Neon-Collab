require('dotenv').config();
const express = require('express');
const controller = require('./controllers');

const router = express.Router();

/*
  Basic route setup
*/

// Login
router.get('/login', controller.login.logInWithEmailAndPassword);
router.post('/signup', controller.login.registerWithEmailAndPassword);
router.get('/resetPassword', controller.login.sendPasswordReset);
router.get('/logout', controller.login.logout);

// Users
router.get('/users', controller.users.get);
router.post('/addUser', controller.users.addUser);
router.get('/users/search/:username', controller.users.getOne);
router.get('/submissions/user/:id', controller.users.getCompleted);
router.get('/submissions_all/user/:id', controller.users.getAttempts);

// Problems
router.get('/problems', controller.problems.get);
router.get('/problemsWithScores', controller.problems.getWithScores);
router.get('/problems/:id', controller.problems.getOne);

// Submission/Code editor
router.post('/codeEditor/submit', controller.codeEditor.submitCode);
router.post('/codeEditor/runCode', controller.codeEditor.runCode);

// Feedback
router.get('/feedback', controller.feedback.getChats);
router.get('/submissions', controller.feedback.getSubmissions);
router.get('/messages', controller.feedback.getMessages);
router.post('/messages', controller.feedback.postMessage);

// Overall Rankings
router.get('/rank', controller.rank.getRanks);
router.get('/rank/search/:id', controller.rank.getAUserRank);

router.get('/submissions', controller.feedback.getSubmissions);
router.get('/submissions/:problemId', controller.feedback.getSubmissionsForProblem);
router.get('/messages', controller.feedback.getMessages);

module.exports = router;
