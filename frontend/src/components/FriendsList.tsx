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
        const apiUrl = 'http://localhost:8080/';
        const userId = '679b7b53f31d3947a8aeb8d9'; // Replace with dynamic user ID if needed
        const response = await fetch(`${apiUrl}friends/list/${userId}`);
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
