import React, { useState } from 'react';
import { registerUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const RegisterForm = ({ state }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await registerUser(name, password, email);
            dispatch(login(data.user));
            navigate({ to: "/dashboard" });
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form
                onSubmit={handleSubmit}
                className="bg-slate-900 border border-slate-800 shadow-xl shadow-black/20 rounded-xl px-8 pt-8 pb-8"
            >
                <h2 className="text-2xl font-semibold text-center text-slate-100 mb-1">Create account</h2>
                <p className="text-center text-slate-500 text-sm mb-6">Start shortening links in seconds</p>

                {error && (
                    <div className="mb-4 p-3 bg-red-950/50 border border-red-900 text-red-400 text-sm rounded-md">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-slate-400 text-sm font-medium mb-1.5" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-slate-400 text-sm font-medium mb-1.5" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-slate-400 text-sm font-medium mb-1.5" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    className={`bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 px-4 rounded-md w-full transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Creating account...' : 'Create Account'}
                </button>

                <p className="text-center mt-5 text-sm text-slate-500">
                    Already have an account?{' '}
                    <span
                        onClick={() => state(true)}
                        className="text-indigo-400 hover:text-indigo-300 cursor-pointer font-medium"
                    >
                        Log in
                    </span>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;