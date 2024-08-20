import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Hook for navigation
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:2000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            // On successful login, navigate to the dashboard
            setErrorMessage('');
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', JSON.stringify(data.user));
            navigate('/dashboard');  // Redirect to dashboard
        })
        .catch(error => {
            console.error('Error logging in:', error);
            setErrorMessage('Wrong username or password');
        });
    };

    return (
        <>
            <div id='main'>
                <div className="login-container">
                    <h2>Login</h2>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
