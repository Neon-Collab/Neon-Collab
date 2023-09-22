import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AppContext from '../../contexts/AppContext.jsx';

export default function Ranking({ id }) {
  const [rank, setRank] = useState(null);
  const [rankNum, setRankNum] = useState(null);
  const { account, setAccount } = useContext(AppContext);

  const getSuffix = (num) => {
    let ord = 'th';
    if (num % 10 === 1 && num % 100 !== 11) {
      ord = 'st';
    } else if (num % 10 === 2 && num % 100 !== 12) {
      ord = 'nd';
    } else if (num % 10 === 3 && num % 100 !== 13) {
      ord = 'rd';
    }
    return ord;
  };

  useEffect(() => {
    axios.get(`/api/rank/search/${id}`)
      .then((response) => {
        setRank((response.data.rank + getSuffix(response.data.rank)));
        setRankNum(response.data.rank);
      });
  }, []);
  return (
    <div className="common-container component-container">
      <h2>Global Ranking</h2>
      {rankNum ? (
        <h2 style={{ color: 'white' }}>{rank}</h2>
      ) : <h2>No rank available at this time</h2>}
    </div>
  );
}
