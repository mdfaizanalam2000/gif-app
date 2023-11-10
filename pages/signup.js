import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Link from 'next/link';

const Login = () => {
    const auth = getAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [error, setError] = useState('');

    // Handle the email input change event and update the email state
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Handle the password input change event and update the password state
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Handle the confirm password input change event and update the confirm password state
    const handleConfirmPasswordChange = (e) => {
        setCPassword(e.target.value);
    };

    // Handle the sign up form submit event and create a new user with Firebase
    const handleSignUp = (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            setError("Passwords are not matching!");
        }
        else if (!email || !password || !cpassword) {
            setError("One or more fields are empty!");
        }
        else {
            setError("Signing up...");
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    router.push('/login');
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
    };

    return (
        <div className="container">
            <h1>Signup Now</h1>
            <form onSubmit={handleSignUp}>
                <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter email" />
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter password" />
                <input type="password" value={cpassword} onChange={handleConfirmPasswordChange} placeholder="Confirm Password" />
                <div className='button'><button type="submit">Signup</button></div>
            </form>
            <p>Already have an account? <Link href="/login">Login</Link></p>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Login;
