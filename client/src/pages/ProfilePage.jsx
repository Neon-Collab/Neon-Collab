import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../components/ProfilePageComponents/styles.css';
import AccountInfo from '../components/ProfilePageComponents/AccountInfo';
import ProblemHistory from '../components/ProfilePageComponents/ProblemHistory';
import Ranking from '../components/ProfilePageComponents/Ranking';
import ProblemsSolved from '../components/ProfilePageComponents/ProblemsSolved';

export default function ProfilePage() {
  return (
    <div className="profile-container">
      <AccountInfo />
      <Ranking />
      <ProblemHistory />
      <ProblemsSolved />
    </div>
  );
}
