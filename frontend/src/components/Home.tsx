import React from "react";
import { useSelector } from "react-redux";
import Counter from "./Counter";
import UserGrid from "./UserGrid"; // Import the new UserGrid component

const Home: React.FC = () => {
  // Access user info from Redux store
  const payload = useSelector((state: any) => state.auth.user);

  const user = payload.user;

  if (!user) {
    return <div>Loading...</div>; // Render loading if user is not available
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 pt-20">
      <h1 className="text-4xl font-semibold text-center text-blue-600 mb-6">
        Friend Management System
      </h1>
      
      <Counter />

      {/* UserGrid component to display all users */}
      <UserGrid />
    </div>
  );
};

export default Home;
