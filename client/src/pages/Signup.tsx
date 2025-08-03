import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL!;

const Signup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    const handleSignup = async () => {
        try {
            const res = await fetch(`${API}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const { token } = await res.json();
            localStorage.setItem('tt_token', token);
            nav('/');
        } catch (err) {
            console.error(err);
        }
  };

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Sign Up</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            /><br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            /><br />
            <button onClick={handleSignup}>Sign Up</button>
            <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
    );
};

export default Signup;