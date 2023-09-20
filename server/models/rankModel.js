const db = require('../../db/db.js');
const { rankUsers, getUserScore } = require('../../data/ranking.js');

/*
  These functions are invoked by the controllers.
  Query the db and send results back to controller
*/

module.exports = {
  getUserRanks: async () => {
    // Begin query

    // Get all submissions, group by user id.
    // Need all submissions of a user within a 3 week period from today

    // iterate over array of submissions and calculate score (getUserScore)

    // take new array of objects that includes score and invoke rankUsers
  },
};
