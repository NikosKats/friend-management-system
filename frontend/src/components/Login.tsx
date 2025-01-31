import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginRequest } from '../actions/authActions';

// Define state type for better type safety (Assuming you have a Redux state shape like this)
interface AuthState {
  user: { token: string } | null;
  loading: boolean;
  error: string | null;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  
  // Component state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Redux state and dispatch
  const dispatch = useDispatch();
  const { user, loading: authLoading, error: authError } = useSelector(
    (state: { auth: AuthState }) => state.auth
  );

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent submitting if already loading
    if (authLoading) return;

    setError(null); // Reset error on form submit
    dispatch(loginRequest(email, password)); // Dispatch login request
  };

  // Side effects to handle user login and error updates
  useEffect(() => {
    if (authError) {
      setError(authError); // Set error when there's an auth error
    }
  }, [authError]);

  useEffect(() => {
    if (user) {
      // If user is logged in, save token and redirect to home
      const { token } = user;
      if (token) {
        localStorage.setItem('authToken', token); // Store token in localStorage
      }
      navigate('/');  // Redirect to your dashboard or home page
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Login</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${authLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={authLoading}
          >
            {authLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <a href="/signup" className="text-sm font-medium text-blue-600 hover:underline">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
