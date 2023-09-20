import React, { useState, useEffect } from 'react';
import ProblemsList from '../components/ProblemPageComponents/ProblemsList';
import ProblemsListFri from '../components/ProblemPageComponents/ProblemsListFri';
import RankingbyProblem from '../components/ProblemPageComponents/RankingbyProblem';
import Leaderboard from '../components/ProblemPageComponents/Leaderboard';

// add a toggle button for switching views, only for presentation purpose
function ToggleBar({ isWeekendView, onToggle }) {
  return (
    <div>
      <button type="button" onClick={onToggle}>
        {isWeekendView ? 'Switch to Mon-Thu View' : 'Switch to Fri-Sun View'}
      </button>
    </div>
  );
}

function WeekdayPage({ selectedProblemId, setSelectedProblemId }) {
  return (
    <div>
      <h1>Mon-Thu page here</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <ProblemsList
            selectedProblemId={selectedProblemId}
            setSelectedProblemId={setSelectedProblemId} />
        </div>
        <div style={{ flex: 1 }}>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}

function WeekendPage({ selectedProblemId }) {
  return (
    <div>
      <h1>Fri-Sun page here</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <ProblemsListFri />
        </div>
        <div style={{ flex: 1 }}>
          <RankingbyProblem problemId={selectedProblemId} />
        </div>
      </div>
    </div>
  );
}

function ProblemsPage() {
  // get the current day of the week, 0 for Sunday, 1 for Monday, etc
  const currentDay = new Date().getDay();
  // check for the day, if it's Sunday or Friday or Saturday, isWeekendView
  const [isWeekendView, setIsWeekendView] = React.useState(currentDay === 0 || currentDay > 4);

  // Initialize from local storage
  const initialProblemId = localStorage.getItem('selectedProblemId');
  const [selectedProblemId, setSelectedProblemId] = useState(initialProblemId);

  return (
    <div>
      <ToggleBar isWeekendView={isWeekendView} onToggle={() => setIsWeekendView(!isWeekendView)} />
      {
        isWeekendView && selectedProblemId
          ? <WeekendPage selectedProblemId={selectedProblemId} />
          : <WeekdayPage selectedProblemId={selectedProblemId} setSelectedProblemId={setSelectedProblemId} />
      }


    </div>
  );
}

export default ProblemsPage;
