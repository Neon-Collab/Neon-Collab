import React from 'react';
import ProblemsList from './ProblemsList';
import Ranking from './Ranking';

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

function ProblemsPage() {
  // get the current day of the week, 0 for Sunday, 1 for Monday, etc
  const currentDay = new Date().getDay();
  // check for the day, if it's Sunday or Friday or Saturday, isWeekendView
  const [isWeekendView, setIsWeekendView] = React.useState(currentDay === 0 || currentDay > 4);

  return (
    <div>
      <ToggleBar isWeekendView={isWeekendView} onToggle={() => setIsWeekendView(!isWeekendView)} />
      {isWeekendView ? <Ranking /> : <ProblemsList />}
    </div>
  );
}

export default ProblemsPage;
