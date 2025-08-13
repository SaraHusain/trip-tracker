import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL!;

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const nav = useNavigate();

    const handleLogin = async () => {
        // Basic validation
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        // Simple email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        
        try {
            const res = await fetch(`${API}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
        });
            const { token } = await res.json();
            localStorage.setItem('tt_token', token);
            nav('/');
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='form-container'>
            <div className='form-card'>

                <h1 style={{ marginBottom: 0 }}>Welcome back</h1>
                <p style={{ marginTop: 0 }}>Please enter your details to login.</p>
                
                <input
                    name='email'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="on"
                />
                <input
                    name='password'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button className='action-button' onClick={handleLogin}>Log In</button>

                {error && <span className='error'>{error}</span>}

                <p>New here? <Link to="/signup">Sign up</Link></p>

            </div>
        </div>
    );
};

export default Login;