import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from '../components/ProfilePageComponents/styles.css';
import AccountInfo from '../components/ProfilePageComponents/AccountInfo';
import ProblemHistory from '../components/ProfilePageComponents/ProblemHistory';
import Ranking from '../components/ProfilePageComponents/Ranking';
import ProblemsSolved from '../components/ProfilePageComponents/ProblemsSolved';
import AppContext from '../contexts/AppContext.jsx';

export default function ProfilePage() {
  // Move useEffect to get user data of current logged in user here
  // Pass down user_id to Ranking and username to AccountInfo
  const { account, setAccount } = useContext(AppContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`/api/users/search/${account.username}`)
      .then((response) => {
        setUser(response.data[0]);
      });
  }, []);
  return (
    <div className="profile-container">
      {user ? (
        <>
          <AccountInfo user={user} />
          <Ranking id={user.user_id} />
          <ProblemHistory />
          <ProblemsSolved />
        </>
      ) : <h1>Loading...</h1>}
    </div>
  );
}
