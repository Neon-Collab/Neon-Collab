import React from 'react';
import axios from 'axios';
import { getUserScore, rankUsers } from '../../../../data/ranking.js';

function Ranking({ problemId }) {
  const [rankedUsers, setRankedUsers] = React.useState([]);

  React.useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('/users');
        const allUsers = response.data;
        const userScores = allUsers.map((user) => {
          const specificProblem = user.problems.find((problem) => problem.id === problemId);

          // clone user to manipulate problems without affecting original user
          const clonedUser = { ...user, problems: [specificProblem] };

          const score = getUserScore(clonedUser);
          return { user: user.name, score };
        });

        const ranked = rankUsers(userScores);
        setRankedUsers(ranked);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, [problemId]);

  return (
    <div>
      <h2>
        Ranking for Problem ID:
        { problemId }
      </h2>
      {rankedUsers.map((user, index) => (
        <div key={index}>
          {user.rank}. {user.user} - {user.score}
        </div>
      ))}
    </div>
  );
}

export default Ranking;
