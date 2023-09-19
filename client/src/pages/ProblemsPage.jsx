import React from 'react';
import ProblemsList from '../components/ProblemPageComponents/ProblemsList';
import Ranking from '../components/ProblemPageComponents/RankingbyProblem';
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
            setSelectedProblemId={setSelectedProblemId}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}

function WeekendPage({ selectedProblemId, setSelectedProblemId }) {
  return (
    <div>
      <h1>Fri-Sun page here</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <ProblemsList
            selectedProblemId={selectedProblemId}
            setSelectedProblemId={setSelectedProblemId}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Ranking problemId={selectedProblemId} />
        </div>
      </div>
    </div>
  );
}

function ProblemsPage({ selectedProblemId, setSelectedProblemId }) {
  // get the current day of the week, 0 for Sunday, 1 for Monday, etc
  const currentDay = new Date().getDay();
  // check for the day, if it's Sunday or Friday or Saturday, isWeekendView
  const [isWeekendView, setIsWeekendView] = React.useState(currentDay === 0 || currentDay > 4);

  return (
    <div>
      <ToggleBar isWeekendView={isWeekendView} onToggle={() => setIsWeekendView(!isWeekendView)} />
      {isWeekendView ? <WeekendPage selectedProblemId={selectedProblemId}
          setSelectedProblemId={setSelectedProblemId}
        />
      :
        <WeekdayPage selectedProblemId={selectedProblemId}
          setSelectedProblemId={setSelectedProblemId} />}
    </div>
  );
}

export default ProblemsPage;
