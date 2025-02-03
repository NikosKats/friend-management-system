import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyFriendsRequest, REMOVE_MY_FRIENDS_REQUEST } from "../actions/myFriendsActions";
import { RootState } from "../store";

const MyFriends: React.FC = () => {
  const dispatch = useDispatch();
  const { friends, loading, error } = useSelector(
    (state: RootState) => state.myFriend
  );

  console.log("🚀 ~ friends:", friends);

  useEffect(() => {
    console.log("📬 Dispatching FETCH_MY_FRIENDS_REQUEST action...");
    dispatch(fetchMyFriendsRequest());
  }, [dispatch]);

  // Remove Friend Handler
  const handleRemoveFriend = (userId: string, friendId: string) => {
    console.log("📡 Dispatching REMOVE_MY_FRIENDS_REQUEST action...");
    dispatch({
      type: REMOVE_MY_FRIENDS_REQUEST,
      payload: { userId, friendId },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">👥 My Friends</h2>

      {loading && <p className="text-blue-500">Loading friends...</p>}
      {error && <p className="text-red-500">❌ Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-2 border border-gray-200 hover:shadow-lg transition"
            >
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-gray-700">
                {friend.username.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-lg font-semibold">{friend.username}</h3>
              <p className="text-gray-500">{friend.email}</p>
              <button
                onClick={() => handleRemoveFriend("userId-placeholder", friend.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-500">No friends yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyFriends;
