export const SEND_FRIEND_REQUEST_REQUEST = 'SEND_FRIEND_REQUEST_REQUEST';
export const SEND_FRIEND_REQUEST_SUCCESS = 'SEND_FRIEND_REQUEST_SUCCESS';
export const SEND_FRIEND_REQUEST_FAILURE = 'SEND_FRIEND_REQUEST_FAILURE';

export const RESPOND_FRIEND_REQUEST_REQUEST = 'RESPOND_FRIEND_REQUEST_REQUEST';
export const RESPOND_FRIEND_REQUEST_SUCCESS = 'RESPOND_FRIEND_REQUEST_SUCCESS';
export const RESPOND_FRIEND_REQUEST_FAILURE = 'RESPOND_FRIEND_REQUEST_FAILURE';

// For sending a friend request
export const sendFriendRequestRequest = (senderId: string, receiverId: string) => {
  console.log(`📬 [ACTION] Dispatching SEND_FRIEND_REQUEST_REQUEST from sender: ${senderId} to receiver: ${receiverId}`);
  return { 
    type: SEND_FRIEND_REQUEST_REQUEST, 
    payload: { senderId, receiverId } 
  };
};


export const sendFriendRequestSuccess = (message: string) => {
  console.log(`✅ [ACTION] Dispatching SEND_FRIEND_REQUEST_SUCCESS with message: ${message}`);
  return { type: SEND_FRIEND_REQUEST_SUCCESS, payload: message };
};

export const sendFriendRequestFailure = (error: string) => {
  console.error(`❌ [ACTION] Dispatching SEND_FRIEND_REQUEST_FAILURE with error: ${error}`);
  return { type: SEND_FRIEND_REQUEST_FAILURE, payload: error };
};

// For responding to a friend request
export const respondFriendRequestRequest = (requestId: string, status: string) => {
  console.log(`📬 [ACTION] Dispatching RESPOND_FRIEND_REQUEST_REQUEST with request ID: ${requestId} and status: ${status}`);
  return { type: RESPOND_FRIEND_REQUEST_REQUEST, payload: { requestId, status } };
};

export const respondFriendRequestSuccess = (message: string) => {
  console.log(`✅ [ACTION] Dispatching RESPOND_FRIEND_REQUEST_SUCCESS with message: ${message}`);
  return { type: RESPOND_FRIEND_REQUEST_SUCCESS, payload: message };
};

export const respondFriendRequestFailure = (error: string) => {
  console.error(`❌ [ACTION] Dispatching RESPOND_FRIEND_REQUEST_FAILURE with error: ${error}`);
  return { type: RESPOND_FRIEND_REQUEST_FAILURE, payload: error };
};
