import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store'; // Adjust this import based on your store file location
import { logoutUser } from '../actions/authActions'; // Assuming you have an action for logging out

const TopBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();

    // Access the user authentication state from Redux store
    const user = useSelector((state: RootState) => state.auth.user);
    console.log("🚀 ~ !!!!!!!!!!!!!!! user:", user)

    const dispatch = useDispatch();

    // Handle Logout
    const handleLogout = () => {
        dispatch(logoutUser()); // Dispatch action to log out the user
        navigate('/login');  // Redirect to login page using navigate
    };

    // Handle Search Input
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Toggle Notification Dropdown
    const toggleNotifications = () => {
        setShowNotifications((prevState) => !prevState);
    };

    // Handle profile redirection
    const handleProfileClick = () => {
        navigate('/profile'); // Redirect to profile page
    };

    // Navigate to My Friends page
    const handleMyFriendsClick = () => {
        navigate('/my-friends'); // Redirect to My Friends page
    };


    // Navigate to My Friends page
    const handleFriendRequestsClick = () => {
        navigate('/friend-requests'); // Redirect to My Friends page
    };

    return (
        <div className="w-full bg-blue-600 text-white p-4 flex justify-between items-center fixed top-0 left-0 z-50">
            {/* Logo on the left */}
            <div className="text-2xl font-bold">
                <a href="/" className="mr-4 no-underline hover:no-underline">
                    <span>Friend Management System</span>
                </a>
            </div>

            {/* Conditional rendering of Search Bar if user is authenticated */}
            {user && (
                <div className="relative flex items-center w-1/3">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search for friends"
                        className="w-full p-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black shadow-md"
                    />
                    <svg
                        className="absolute left-3 text-gray-500 w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6M9 4a7 7 0 1014 0A7 7 0 009 4z"
                        />
                    </svg>
                </div>
            )}

            {/* My Friends Link */}
            {user && (
                <button
                    onClick={handleMyFriendsClick}
                    className="text-white hover:underline"
                >
                    My Friends
                </button>
            )}

            {/* My Friends Link */}
            {user && (
                <button
                    onClick={handleFriendRequestsClick}
                    className="text-white hover:underline"
                >
                    Friend Requests
                </button>
            )}

            {/* Conditional rendering of Notification Bell if user is authenticated */}
            {user && (
                <div className="relative mr-4">
                    <svg
                        onClick={toggleNotifications} // Toggle notifications on click
                        className="w-6 h-6 text-white cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 16v-6a6 6 0 10-12 0v6H6a2 2 0 00-2 2v2a2 2 0 002 2h12a2 2 0 002-2v-2a2 2 0 00-2-2h-2z"
                        />
                    </svg>
                    {/* Notification Badge */}
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        3
                    </span>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg border border-gray-300">
                            <ul className="divide-y divide-gray-200">
                                <li className="p-2 hover:bg-gray-100 cursor-pointer">New friend request from John Doe</li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer">Your friend Sarah accepted your request</li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer">New comment on your post</li>
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Conditional rendering of Login/Signup or Logout */}
            <div className="flex items-center">
                {user ? (
                    <>
                        {/* Avatar Icon */}
                        <div
                            className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer mr-4"
                            onClick={handleProfileClick} // Navigate to profile
                        >
                            {user.username?.charAt(0).toUpperCase()} {/* Display first letter of username */}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="hover:underline text-white"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <a href="/login" className="mr-4 hover:underline">Login</a>
                        <a href="/signup" className="hover:underline">Signup</a>
                    </>
                )}
            </div>
        </div>
    );
};

export default TopBar;
