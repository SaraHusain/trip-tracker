import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL!;

const Signup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const nav = useNavigate();

    const handleSignup = async () => {
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
        // Password validation: min 8 chars, one uppercase, one lowercase, one special char
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one special character.');
            return;
        }
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
        <div className='form-container'>
            <div className='form-card'>

                <h1 style={{ marginBottom: 0 }}>Sign Up</h1>
                <p style={{ marginTop: 0 }}>Please enter your details to create an account.</p>

                <input
                    name='email'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    required
                    autoComplete="on"
                />
                <input
                    name='password'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError('') }}
                    required
                />
                
                <button className='action-button' onClick={handleSignup}>Sign Up</button>

                {error && <span className='error'>{error}</span>}

                <p>Already have an account? <Link to="/login">Log in</Link></p>

            </div>
        </div>
    );
};

export default Signup;