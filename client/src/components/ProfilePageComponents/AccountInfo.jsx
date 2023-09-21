import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AppContext from '../../contexts/AppContext.jsx';

export default function AccountInfo() {
  const { account, setAccount } = useContext(AppContext);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   console.log(account)
  //   axios.get(`/users/search/${account.username}`)
  //     .then((response) => {
  //       setUser(response.data);
  //     });
  // }, []);
  // console.log(user)
  return (
    <div className="common-container component-container">
      <h1>Account Information</h1>
      <div className="account-container">
        <span>Name: </span>
        <span>Username: </span>
        <span>Email: </span>
      </div>
    </div>
  );
}
