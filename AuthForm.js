import React, { useState } from 'react';
import axios from 'axios';

function AuthForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `/api/auth/${isLogin ? 'login' : 'register'}`;
        const res = await axios.post(url, { email, password });
        if (isLogin && res.data.token) {
            localStorage.setItem('token', res.data.token);
            onLogin(res.data.user);
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <p onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need to register?' : 'Already have an account?'}
            </p>
        </div>
    );
}

export default AuthForm;