import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest } from '../actions/usersActions';  
import { sendFriendRequestRequest } from '../actions/friendActions';  
import { socket } from "../streams/websocketStream";

const UserGrid = () => {
  const dispatch = useDispatch();

  // Get users, loading, and error state from Redux 

    const users = useSelector((state: any) => state.users.users);
    const loading = useSelector((state: any) => state.users.loading);
    const error = useSelector((state: any) => state.users.error); 
  
    const [notifications, setNotifications] = useState<{ senderId: string; message: string }[]>([]);


  useEffect(() => {
    console.log("📬 Dispatching FETCH_USERS_REQUEST action...");
    dispatch(fetchUsersRequest()); // Dispatch action to start fetching users
  }, [dispatch]);

  // Debugging logs for Redux state
  useEffect(() => {
    console.log("📌 Redux State - Users:", users);
    console.log("📌 Redux State - Loading:", loading);
    console.log("📌 Redux State - Error:", error);
  }, [users, loading, error]);

  useEffect(() => {
    // Listen for incoming friend request notifications
    socket.on("friend-request-received", (data) => {
      console.log("🔔 Friend request notification:", data);
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.off("friend-request-received");
    };
  }, []);

  // Function to handle sending friend request
  const handleSendFriendRequest = (senderId: string, receiverId: string) => {
    console.log(`📤 Sending friend request from user with ID: ${senderId} to user with ID: ${receiverId}`);
    dispatch(sendFriendRequestRequest(senderId, receiverId)); // Dispatch the friend request action with both senderId and receiverId
  };

  return (
    <div>
      <h1>Users</h1>

           {/* Notification Section */}
           {notifications.length > 0 && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
          {notifications.map((notif, index) => (
            <div key={index} className="mb-2">
              <strong>📨 Friend Request:</strong> {notif.message} (User ID: {notif.senderId})
            </div>
          ))}
        </div>
      )}

      {/* Display loading state */}
      {loading && <p>Loading users...</p>}

      {/* Display error if any */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Display users */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              
              {/* Friend Request Button */}
              <button
                onClick={() => {
                  const loggedInUser = localStorage.getItem("user");
                  if (loggedInUser) {
                    const senderId = JSON.parse(loggedInUser)?._id; // Get sender ID from logged-in user
                    const receiverId = user._id; // Get receiver ID from the current user
                    if (senderId && receiverId) {
                      console.log(`📤 Sending friend request from ${senderId} to ${receiverId}`);
                      handleSendFriendRequest(senderId, receiverId); // Send friend request
                    } else {
                      console.error("❌ [UI] Sender or Receiver ID is missing.");
                    }
                  } else {
                    console.error("❌ [UI] Logged-in user data not found.");
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
