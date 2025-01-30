// src/components/FriendRequestForm.tsx
import React, { useState } from 'react';

const FriendRequestForm: React.FC = () => {
  const [receiverId, setReceiverId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/friendRequests/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderId: '123', receiverId }),
      });

      if (!response.ok) {
        throw new Error('Error sending friend request');
      }

      alert('Friend request sent!');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        placeholder="Enter receiver ID"
        required
      />
      <button type="submit">Send Friend Request</button>
    </form>
  );
};

export default FriendRequestForm;
