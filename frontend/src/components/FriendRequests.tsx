import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { respondFriendRequestRequest } from '../actions/friendActions'; // Actions
import { socket } from '../streams/websocketStream'; // WebSocket connection

const FriendRequests: React.FC = () => {
    const dispatch = useDispatch();
    const { friendRequests } = useSelector((state: RootState) => state.friend);

    useEffect(() => {
        // Fetch the friend's requests when the component is mounted
        // You can dispatch an action to get requests here, assuming you have such an action
        // Example: dispatch(getFriendRequests());
    }, [dispatch]);

    // Handle accepting a friend request
    const handleAccept = (requestId: string, senderId: string) => {
        dispatch(respondFriendRequestRequest(requestId, 'accepted')); // Respond with 'accepted'
        socket.emit('respond-friend-request', { requestId, status: 'accepted', senderId });
    };

    // Handle declining a friend request
    const handleDecline = (requestId: string, senderId: string) => {
        dispatch(respondFriendRequestRequest(requestId, 'declined')); // Respond with 'declined'
        socket.emit('respond-friend-request', { requestId, status: 'declined', senderId });
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
                                    onClick={() => handleAccept(request._id, request.senderId)}
                                    className="bg-green-500 text-white p-2 rounded"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleDecline(request._id, request.senderId)}
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
