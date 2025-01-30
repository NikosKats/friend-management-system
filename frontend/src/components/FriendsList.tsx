import React, { useEffect, useState } from "react";

interface Friend {
  _id: string;
  username: string;
  email: string;
}

const FriendsList: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const { _id, username, email, friends, friendRequests, createdAt, updatedAt } = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("🚀 ~ useEffect ~ updatedAt:", updatedAt)
    console.log("🚀 ~ useEffect ~ createdAt:", createdAt)
    console.log("🚀 ~ useEffect ~ friendRequests:", friendRequests)
    console.log("🚀 ~ useEffect ~ friends:", friends)
    console.log("🚀 ~ useEffect ~ email:", email)
    console.log("🚀 ~ useEffect ~ username:", username)
    console.log("🚀 ~ useEffect ~ _id:", _id)

  
    if (!_id) {
      console.error("User ID not found");
      return;
    }

    // Directly set the friends data from the localStorage user object
    setFriends(friends || []);
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
