import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest } from '../actions/userActions'; // Ensure correct path
import { sendFriendRequestRequest } from '../actions/friendActions'; // Import the action

const UserGrid = () => {
  const dispatch = useDispatch();
  
  // Get users, loading, and error state from Redux
  const { users, loading, error } = useSelector((state: any) => state.user);

  useEffect(() => {
    console.log("📬 Dispatching FETCH_USERS_REQUEST action...");
    dispatch(fetchUsersRequest()); // Dispatch action to start fetching users
  }, [dispatch]);

  // Function to handle sending friend request
  const handleSendFriendRequest = (senderId: string, receiverId: string) => {
    console.log(`📤 Sending friend request from user with ID: ${senderId} to user with ID: ${receiverId}`);
    dispatch(sendFriendRequestRequest(senderId, receiverId)); // Dispatch the friend request action with both senderId and receiverId
  };

  return (
    <div>
      <h1>Users</h1>

      {/* Display loading state */}
      {loading && <p>Loading users...</p>}

      {/* Display error if any */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Display users */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              
              {/* Friend Request Button */}
              <button
                onClick={() => {
                  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}"); // Get logged-in user from localStorage
                  const senderId = loggedInUser?._id; // Extract senderId (_id) from logged-in user object
                  const receiverId = user._id; // Extract receiverId (_id) from the current user in the map
                  if (senderId && receiverId) {
                    handleSendFriendRequest(senderId, receiverId); // Pass both senderId and receiverId
                  } else {
                    console.error("❌ [UI] Sender or Receiver ID is missing.");
                  }
                }}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Send Friend Request
              </button>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserGrid;
