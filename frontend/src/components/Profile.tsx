import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { fetchUserRequest } from "../actions/userActions"; // Ensure this action is correctly implemented

const Profile: React.FC = () => {
  const dispatch = useDispatch();

  const payload = useSelector((state: any) => state.auth.user);

  console.log("-------------->🚀 ~ payload:", payload)
  const user = payload?.user;
  console.log("------------->🚀 ~ user:", user)

  // Fetch updated user data on component mount and periodically
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserRequest(user._id));

      const interval = setInterval(() => {
        dispatch(fetchUserRequest(user._id));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [dispatch, user?._id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const { username, email, _id, createdAt, updatedAt, friendRequests, friends } = user;

  const renderFriendRequests = (requests: string[]) => {
    if (requests.length === 0) {
      return <p>No friend requests.</p>;
    }
    return (
      <ul>
        {requests.map((requestId) => (
          <li key={requestId}>Request ID: {requestId}</li>
        ))}
      </ul>
    );
  };

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
        <p><strong>Sent:</strong> {friendRequests?.sent.length || 0}</p>
        {renderFriendRequests(friendRequests?.sent || [])}

        <p><strong>Received:</strong> {friendRequests?.received.length || 0}</p>
        {renderFriendRequests(friendRequests?.received || [])}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Friends</h3>
        <p>{friends?.length || 0} friends</p>
      </div>
    </div>
  );
};

export default Profile;
