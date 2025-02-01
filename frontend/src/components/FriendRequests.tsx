// src/components/FriendRequests.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { getFriendRequests, acceptFriendRequest, declineFriendRequest } from '../actions/friendActions'; // Assume these actions exist

const FriendRequests: React.FC = () => {
    const dispatch = useDispatch();
    const { friendRequests } = useSelector((state: RootState) => state.friend);

    useEffect(() => {
        // Fetch the friend's requests when the component is mounted
        dispatch(getFriendRequests());
    }, [dispatch]);

    const handleAccept = (requestId: string) => {
        dispatch(acceptFriendRequest(requestId)); // Dispatch action to accept friend request
    };

    const handleDecline = (requestId: string) => {
        dispatch(declineFriendRequest(requestId)); // Dispatch action to decline friend request
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-semibold">Friend Requests</h2>
            <ul className="space-y-4">
                {friendRequests && friendRequests.length > 0 ? (
                    friendRequests.map((request) => (
                        <li key={request._id} className="flex justify-between items-center p-4 border border-gray-300 rounded-lg">
                            <div>
                                <span className="font-medium">{request.senderName}</span> has sent you a friend request.
                            </div>
                            <div className="space-x-4">
                                <button
                                    onClick={() => handleAccept(request._id)}
                                    className="bg-green-500 text-white p-2 rounded"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleDecline(request._id)}
                                    className="bg-red-500 text-white p-2 rounded"
                                >
                                    Decline
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No friend requests at the moment.</li>
                )}
            </ul>
        </div>
    );
};

export default FriendRequests;
