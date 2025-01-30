import React, { useState } from 'react';

const API_URL = "http://localhost:8080/"; // Replace with your actual API URL

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Send login request to backend
    try {
      const response = await fetch(`${API_URL}users/login`, {  // Adjust URL if needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("🚀 ~ handleSubmit ~ data:", data.user)


      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Save token in local storage (or state management)
      localStorage.setItem('token', data.token);
    
      localStorage.setItem("user",  JSON.stringify(data.user)); // Store user 

      console.log('Login successful:', data.message);
      
      // Redirect user to a protected page (or handle accordingly)
      window.location.href = '/';  
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
      // console.log("🚀 ~ handleSubmit ~ data:", data)
      // console.log("🚀 ~ handleSubmit ~ data:", data)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Login</h2>

        {/* Display error message if any */}
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
            className={`w-full py-3 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
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
