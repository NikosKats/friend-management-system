// src/components/Home.tsx
import React from 'react';
import FriendsList from './FriendsList';
import FriendRequestForm from './FriendRequestForm';
import FriendRequestItem from './FriendRequestItem';
import Notification from './Notification';
import Counter from './Counter';

const Home: React.FC = () => {
  return (
 
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 pt-20">
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
    </div>
  );
};

export default Home;
