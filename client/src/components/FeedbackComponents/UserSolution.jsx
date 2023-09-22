import React from "react";

function UserSolution({ submissions, selectedProblem, userId }) {
  return (
    <div className="common-container" style={{ flex: 2 }}>
      <h2>Your Solution</h2>
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
