import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest } from '../actions/userActions'; // Ensure correct path

const UserGrid = () => {
  const dispatch = useDispatch();
  
  // Use useSelector to get users and loading state from Redux
  const { users, loading, error } = useSelector((state: any) => state.user);

  useEffect(() => {
    console.log("📬 Dispatching FETCH_USERS_REQUEST action...");
    dispatch(fetchUsersRequest()); // Dispatch action to start fetching users
  }, [dispatch]);

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
              {/* Render more user information as needed */}
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
