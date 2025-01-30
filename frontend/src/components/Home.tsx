import React from 'react';
import FriendsList from './FriendsList';
import FriendRequestForm from './FriendRequestForm';
import FriendRequestItem from './FriendRequestItem';
import Notification from './Notification';
import Counter from './Counter';

const Home: React.FC = () => {
  const { _id, username, email, friends, friendRequests, createdAt, updatedAt } = JSON.parse(localStorage.getItem("user") || "{}");

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

      {/* Display User Information */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>User ID:</strong> {_id}</p>
        <p><strong>Account Created:</strong> {new Date(createdAt).toLocaleString()}</p>
        <p><strong>Last Updated:</strong> {new Date(updatedAt).toLocaleString()}</p>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Friend Requests</h3>
          <p><strong>Sent:</strong> {friendRequests.sent.length}</p>
          <p><strong>Received:</strong> {friendRequests.received.length}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Friends</h3>
          <p>{friends.length} friends</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
