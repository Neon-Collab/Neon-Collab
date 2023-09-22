import React from "react";

function UserSolution({ submissions, selectedProblem, userId }) {
  return (
    <div className="user-solution container">
      <h1>Your Solution</h1>
      {submissions.length ? (
        submissions.map((submission) =>
          submission.user_id === userId &&
          submission.problem_id === selectedProblem ? (
            <div>{submission.code}</div>
          ) : (
            <div />
          )
        )
      ) : (
        <p>Come back friday for a code review</p>
      )}
    </div>
  );
}

export default UserSolution;
