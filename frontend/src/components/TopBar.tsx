import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const TopBar: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate(); // Use navigate for route redirection

    // Check if the user is authenticated by verifying if the token exists
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);  // User is logged in
        }
    }, []);

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem('token');  // Remove token on logout
        setIsAuthenticated(false);  // Update authentication state
        navigate('/login');  // Redirect to login page using navigate
    };

    return (
        <div className="w-full bg-blue-600 text-white p-4 flex justify-between items-center fixed top-0 left-0 z-50">
            {/* Logo on the left */}
            <div className="text-2xl font-bold">
                <a href="/" className="mr-4 no-underline hover:no-underline">
                    <span>Friend Management System</span>
                </a>
            </div>

            {/* Conditional rendering of Login/Signup or Logout */}
            <div>
                {!isAuthenticated ? (
                    <>
                        <a href="/login" className="mr-4 hover:underline">Login</a>
                        <a href="/signup" className="hover:underline">Signup</a>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="hover:underline text-white"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default TopBar;
