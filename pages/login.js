import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from 'next/link';

const Login = () => {
  const auth = getAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle the email input change event and update the email state
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle the password input change event and update the password state
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle the login form submit event and sign in the user with Firebase
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Enter email and password!");
      return;
    }
    setError("Logging In...");
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="container">
      <h1>Login to continue</h1>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" />
        <input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" />
        <div className='button'><button type="submit">Login</button></div>
      </form>
      <p>Don't have an account? <Link href="/signup">Sign up</Link></p>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
