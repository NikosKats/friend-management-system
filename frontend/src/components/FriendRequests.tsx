import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { respondFriendRequestRequest } from '../actions/friendActions'; // Actions
import {fetchFriendRequestsReceivedRequest} from '../actions/friendRequestsReceivedActions';
import {fetchFriendRequestsSentRequest} from '../actions/friendRequestsSentActions';
import { socket } from '../streams/websocketStream'; // WebSocket connection

const FriendRequests: React.FC = () => {
    const dispatch = useDispatch();
   
    const friendRequestsReceived = useSelector((state: any) => state.friendRequestsReceived.friendRequests);
    console.log("---------->>>>>>>>>>>>>>>>>>>🚀 ~ friendRequestsReceived:", friendRequestsReceived)


    const friendRequestsSent = useSelector((state: any) => state.friendRequestsSent.friendRequests);

    console.log("---------->>>>>>>>>>>>>>>>>>>🚀 ~ friendRequestsSent:", friendRequestsSent)
    

    useEffect(() => {
        // Fetch friend requests when component mounts
        dispatch(fetchFriendRequestsReceivedRequest());
    }, [dispatch]);

    useEffect(() => {
        // Fetch friend requests when component mounts
        dispatch(fetchFriendRequestsSentRequest());
    }, [dispatch]);

    // Handle accepting a friend request
    const handleAccept = (requestId: string, senderId: string) => {
        dispatch(respondFriendRequestRequest(requestId, 'accepted'));
        socket.emit('respond-friend-request', { requestId, status: 'accepted', senderId });
    };

    // Handle declining a friend request
    const handleDecline = (requestId: string, senderId: string) => {
        dispatch(respondFriendRequestRequest(requestId, 'declined'));
        socket.emit('respond-friend-request', { requestId, status: 'declined', senderId });
    };

    return (
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Friend Requests Received */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Friend Requests Received</h2>
                <ul className="space-y-4">
                    {friendRequestsReceived && friendRequestsReceived.length > 0 ? (
                        friendRequestsReceived.map((request) => (
                            <li key={request._id} className="flex justify-between items-center p-4 border border-gray-300 rounded-lg">
                                <div>
                                    <span className="font-medium">{request.receiverId.username}</span> sent you a friend request.
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
                        <li>No friend requests received.</li>
                    )}
                </ul>
            </div>

            {/* Friend Requests Sent */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Friend Requests Sent</h2>
                <ul className="space-y-4">
                    {friendRequestsSent && friendRequestsSent.length > 0 ? (
                        friendRequestsSent.map((request) => (
                            <li key={request._id} className="flex justify-between items-center p-4 border border-gray-300 rounded-lg">
                                <div>
                                    <span className="font-medium">{request.receiverId.username}</span> has not responded yet.
                                </div>
                                <div className="text-gray-500">Pending...</div>
                            </li>
                        ))
                    ) : (
                        <li>No friend requests sent.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default FriendRequests;
