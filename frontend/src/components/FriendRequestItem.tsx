// src/components/FriendRequestItem.tsx
import React from 'react';

interface FriendRequestItemProps {
  requestId: string;
  senderUsername: string;
  onAccept: () => void;
  onDecline: () => void;
}

const FriendRequestItem: React.FC<FriendRequestItemProps> = ({ requestId, senderUsername, onAccept, onDecline }) => {
  return (
    <div className="friend-request-item">
      <p>Friend request from {senderUsername}</p>
      <button onClick={onAccept}>Accept</button>
      <button onClick={onDecline}>Decline</button>
    </div>
  );
};

export default FriendRequestItem;
