// let users = [
//   {
//     id: 1,
//     problems: [
//       {
//         id: 1,
//         difficulty: 'easy',
//         feedback: true,
//       },
//       {
//         id: 2,
//         difficulty: 'easy',
//         feedback: true,
//       },
//       {
//         id: 4,
//         difficulty: 'medium',
//         feedback: false,
//       },
//     ],
//   },
//   {
//     id: 2,
//     problems: [
//       {
//         id: 4,
//         difficulty: 'medium',
//         feedback: false,
//       },
//       {
//         id: 7,
//         difficulty: 'hard',
//         feedback: true,
//       },
//       {
//         id: 5,
//         difficulty: 'medium',
//         feedback: true,
//       },
//     ],
//   },
//   {
//     id: 3,
//     problems: [
//       {
//         id: 7,
//         difficulty: 'hard',
//         feedback: false,
//       },
//       {
//         id: 8,
//         difficulty: 'hard',
//         feedback: false,
//       },
//       {
//         id: 12,
//         difficulty: 'nightmare',
//         feedback: true,
//       },
//     ],
//   },
// ];

// const oneUser = {
//   id: 3,
//   problems: [
//     {
//       id: 7,
//       difficulty: 'hard',
//       feedback: false,
//     },
//     {
//       id: 8,
//       difficulty: 'hard',
//       feedback: false,
//     },
//     {
//       id: 12,
//       difficulty: 'nightmare',
//       feedback: true,
//     },
//   ],
// };

// // Calculate user score
// let getUserScore = function (user) {
//   var sum = 0;

//   //iterate over problems, add scores and boosts to sum
//   user.problems.map((problem) => {
//     //add score
//     sum += problem.score;
//     //add difficulty modifier
//     if (problem.difficulty === 'medium') {
//       sum += (problem.score * 0.25); // 25%boost
//     } else if (problem.difficulty === 'hard') {
//       sum += (problem.score * 0.5); // 50% boost
//     } else if (problem.difficulty === 'nightmare') {
//       sum += (problem.score); // 100% boost
//     }
//   });
//   user.sum = sum;
// };

// Calculate ranks of all users

let rankUsers = function (userScores) {
  var rankedScores = [];
  var rank = 1;
  var previousScore;
  userScores.sort((a, b) => b.score - a.score);

  userScores.map((element, i) => {
    var scoreObj = element;
    if (i === 0) {
      scoreObj.rank = rank;
      previousScore = scoreObj.score;
    } else if (scoreObj.score === previousScore) {
      scoreObj.rank = rank;
    } else {
      rank = i + 1;
      scoreObj.rank = rank;
      previousScore = scoreObj.score;
    }
    rankedScores.push(scoreObj);
  });
  return rankedScores;
};

module.exports = rankUsers;
