// src/components/FriendCard.tsx
import React from 'react';

interface FriendCardProps {
  username: string;
  email: string;
  onRemove: () => void; // Function to remove the friend
}

const FriendCard: React.FC<FriendCardProps> = ({ username, email, onRemove }) => {
  return (
    <div className="friend-card">
      <p>{username} - {email}</p>
      <button onClick={onRemove}>Remove Friend</button>
    </div>
  );
};

export default FriendCard;
