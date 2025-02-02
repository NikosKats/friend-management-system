import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRequest } from "../actions/usersActions";
import { sendFriendRequestRequest } from "../actions/friendActions";
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
    console.log(
      `📤 Sending friend request from user with ID: ${senderId} to user with ID: ${receiverId}`
    );
    dispatch(sendFriendRequestRequest(senderId, receiverId));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">🌍 Discover Users</h1>

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
      {loading && <p className="text-blue-500">Loading users...</p>}

      {/* Display error if any */}
      {error && <p className="text-red-500">❌ Error: {error}</p>}

      {/* Display users in a responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center space-y-3 border border-gray-200 hover:shadow-lg transition"
            >
              {/* Avatar Placeholder */}
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-gray-700">
                {user.username.charAt(0).toUpperCase()}
              </div>

              {/* User Info */}
              <h2 className="text-lg font-semibold">{user.username}</h2>
              <p className="text-gray-500">{user.email}</p>

              {/* Friend Request Button */}
              <button
                onClick={() => {
                  const loggedInUser = localStorage.getItem("user");
                  if (loggedInUser) {
                    const senderId = JSON.parse(loggedInUser)?._id;
                    const receiverId = user._id;
                    if (senderId && receiverId) {
                      console.log(`📤 Sending friend request from ${senderId} to ${receiverId}`);
                      handleSendFriendRequest(senderId, receiverId);
                    } else {
                      console.error("❌ [UI] Sender or Receiver ID is missing.");
                    }
                  } else {
                    console.error("❌ [UI] Logged-in user data not found.");
                  }
                }}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Send Friend Request
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserGrid;
