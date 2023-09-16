import React from 'react';

export default function LoginForm() {
  return (
    <form onSubmit={() => { console.log('Form Submitted'); }}>
      <input type="text" placeholder="Username" />
      <input type="text" placeholder="Password" />
      <input type="submit" value="Log In" />
    </form>
  );
}
