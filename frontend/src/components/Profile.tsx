import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store"; // Adjust this import based on your store file location

const Profile: React.FC = () => {
  // Access the user data directly from the Redux store
  const payload = useSelector((state: any) => state.auth.user);  // Assuming user is stored in auth slice
  
  const user = payload?.user;  
  
  // If user is not loaded yet (or not authenticated), you can show a loading state or message
  if (!user) {
    return <div>Loading...</div>;
  }

  const { username, email, _id, createdAt, updatedAt, friendRequests, friends } = user;

  return (
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
  );
};

export default Profile;
