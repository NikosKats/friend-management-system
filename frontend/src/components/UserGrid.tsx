import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsersRequest } from '../actions/userActions'; // Ensure correct path

const UserGrid = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("📬 Dispatching FETCH_USERS_REQUEST action...");
    dispatch(fetchUsersRequest()); // Dispatch action to start fetching users
  }, [dispatch]);

  return (
    <div>
      <h1>Users</h1>
      {/* Render users here */}
    </div>
  );
};

export default UserGrid;
