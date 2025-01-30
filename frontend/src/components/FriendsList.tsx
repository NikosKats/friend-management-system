// src/components/FriendsList.tsx
import React, { useEffect, useState } from 'react';

interface Friend {
  _id: string;
  username: string;
  email: string;
}

const FriendsList: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    // Fetch the friends list when the component mounts
    const fetchFriends = async () => {
      try {
        const response = await fetch('/api/friends/list/123');  
        if (!response.ok) {
          throw new Error('Error fetching friends');
        }
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };
    fetchFriends();
  }, []);

  return (
    <div>
      <h2>My Friends</h2>
      {friends.length === 0 ? (
        <p>No friends found</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend._id}>
              {friend.username} - {friend.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsList;
