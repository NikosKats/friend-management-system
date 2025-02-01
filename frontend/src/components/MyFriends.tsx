import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const MyFriends: React.FC = () => {
    // Get the current user data from Redux store
    const user = useSelector((state: RootState) => state.auth.user);

    // State for holding the friends list
    const [friends, setFriends] = useState<string[]>([]);

    // Fetch the friends list (this can be an API call)
    useEffect(() => {
        if (user) {
            // Assuming you have a friends list in the user object or you could call an API
            setFriends(user.friends || []);
        }
    }, [user]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">My Friends</h2>
            <ul className="space-y-2">
                {friends.length > 0 ? (
                    friends.map((friend, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                            <span>{friend}</span>
                            <button className="text-red-500 hover:underline">Remove</button>
                        </li>
                    ))
                ) : (
                    <li>No friends yet.</li>
                )}
            </ul>
        </div>
    );
};

export default MyFriends;
