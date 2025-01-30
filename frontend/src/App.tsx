// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FriendsList from './components/FriendsList';
import FriendRequestForm from './components/FriendRequestForm';
import FriendRequestItem from './components/FriendRequestItem';
import Notification from './components/Notification';
import Counter from './components/Counter';
import TopBar from './components/TopBar';
import Login from './components/Login';
import Signup from './components/Signup';

import './app.css';

const App: React.FC = () => {
  return (
    <Router>
      <TopBar /> {/* Add the TopBar component */}
      
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 pt-20">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/" 
            element={
              <>
                <h1 className="text-4xl font-semibold text-center text-blue-600 mb-6">
                  Friend Management System
                </h1>
                <Notification />
                <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-md">
                  <FriendRequestForm />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-md">
                  <FriendsList />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-md">
                  <FriendRequestItem 
                    requestId="1" 
                    senderUsername="John Doe" 
                    onAccept={() => {}} 
                    onDecline={() => {}} 
                  />
                </div>
                <Counter />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
