// src/components/Logout.tsx
import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Optionally, redirect to login or home page
    history.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
    >
      Logout
    </button>
  );
};

export default Logout;
