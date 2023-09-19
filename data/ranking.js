// Calculate user score
let getUserScore = function (user) {
  var sum = 0;

  // iterate over problems, add scores and boosts to sum
  user.problems.map((problem) => {
    // add score
    sum += problem.score;
    // add difficulty modifier
    if (problem.difficulty === 'medium') {
      sum += (problem.score * 0.25); // 25%boost
    } else if (problem.difficulty === 'hard') {
      sum += (problem.score * 0.5); // 50% boost
    } else if (problem.difficulty === 'nightmare') {
      sum += (problem.score); // 100% boost
    }
    // add feedback participation boost
    if (problem.feedback === true) {
      sum += (problem.score * 0.2) // 20% boost
    }
  });
  return sum;
};

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

module.exports = {
  getUserScore,
  rankUsers,
};
