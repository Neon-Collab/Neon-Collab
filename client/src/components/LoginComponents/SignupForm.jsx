import React, { useState } from 'react';

export default function SignupForm() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUsername]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //add skill level
  return (
    <form onSubmit={() => { console.log('Form Submitted'); }}>
      <input type="text" placeholder="First Name" />
      <input type="text" placeholder="Last Name" />
      <input type="text" placeholder="Username" />
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Password" />
      <input type="text" placeholder="Verify Password" />
      <input type="submit" value="Create Account" />
    </form>
  );
}
