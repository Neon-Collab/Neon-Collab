require('dotenv').config();
const express = require('express');
const controller = require('./controllers');

const router = express.Router();

/*
  Basic route setup
*/
// Login
router.get('/api/login', controller.login.logInWithEmailAndPassword);
router.post('/api/signup', controller.login.registerWithEmailAndPassword);
router.get('/api/resetPassword', controller.login.sendPasswordReset);
router.get('/api/logout', controller.login.logout);

// Users
router.get('/users', controller.users.get);
router.get('/users/:id', controller.users.getOne);

// Problems
router.get('/problems', controller.problems.get);
router.get('/problems/:id', controller.problems.getOne);

// Submission/Code editor
router.post('/codeEditor/submit', controller.codeEditor.addCode);

// Feedback
router.get('/feedback', controller.feedback.getChats);
router.get('/submissions', controller.feedback.getSubmissions);
router.get('/messages', controller.feedback.getMessages);

module.exports = router;
