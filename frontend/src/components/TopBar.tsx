// src/components/TopBar.tsx
import React from 'react';

const TopBar: React.FC = () => {
    return (
        <div className="w-full bg-blue-600 text-white p-4 flex justify-between items-center fixed top-0 left-0 z-50">
            {/* Logo on the left */}
            <div className="text-2xl font-bold">
                <a href="/" className="mr-4 no-underline hover:no-underline">
                    <span>Friend Management System</span>
                </a>
            </div>


            {/* Login/Signup on the right */}
            <div>
                <a href="/login" className="mr-4 hover:underline">Login</a>
                <a href="/signup" className="hover:underline">Signup</a>
            </div>
        </div>
    );
};

export default TopBar;
