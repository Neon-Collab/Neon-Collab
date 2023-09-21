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
router.get('/checkLoginStatus', controller.login.checkLoginStatus);

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
router.get('/chats', controller.feedback.getChats);
router.get('/submissions', controller.feedback.getSubmissions);
router.get('/messages', controller.feedback.getMessages);
router.post('/messages', controller.feedback.postMessage);
router.get('/submission', controller.feedback.getAllSubmissions);
router.post('/chats', controller.feedback.pairUsers);
router.get('/chat', controller.feedback.getAllChats);
router.get('/chat/partner', controller.feedback.getPartnerId);
router.get('/submissions/partner', controller.feedback.getPartnerSolution);

// Global Rankings
router.post('/rank/calculate', controller.rank.calculateRanks); // Ranking Table needs to be empty before this endpoint is invoked otherwise it will cause an error
router.get('/rank/', controller.rank.getRanks);
router.get('/rank/search/:id', controller.rank.getAUserRank);

module.exports = router;
