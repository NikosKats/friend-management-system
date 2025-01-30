// src/App.tsx
import React from 'react';
import FriendsList from './components/FriendsList';
import FriendRequestForm from './components/FriendRequestForm';
import FriendRequestItem from './components/FriendRequestItem';
import Notification from './components/Notification';
import Counter from './components/Counter';
import './app.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-semibold text-center text-blue-600 mb-6">Friend Management System</h1>
      
      <Notification />
      
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-md">
        <FriendRequestForm />
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-md">
        <FriendsList />
      </div>

      {/* Example of showing friend requests */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-md">
        <FriendRequestItem 
          requestId="1" 
          senderUsername="John Doe" 
          onAccept={() => {}} 
          onDecline={() => {}} 
        />
      </div>

      <Counter />
    </div>
  );
};

export default App;
