// actions/friendActions.ts

export const SEND_FRIEND_REQUEST = 'SEND_FRIEND_REQUEST';
export const SEND_FRIEND_REQUEST_SUCCESS = 'SEND_FRIEND_REQUEST_SUCCESS';
export const SEND_FRIEND_REQUEST_FAILURE = 'SEND_FRIEND_REQUEST_FAILURE';

// Action to initiate sending a friend request
export const sendFriendRequest = (userId: string) => ({
  type: SEND_FRIEND_REQUEST,
  payload: userId,
});

// Action to handle successful friend request sending
export const sendFriendRequestSuccess = (message: string) => ({
  type: SEND_FRIEND_REQUEST_SUCCESS,
  payload: message,
});

// Action to handle failure in sending a friend request
export const sendFriendRequestFailure = (error: string) => ({
  type: SEND_FRIEND_REQUEST_FAILURE,
  payload: error,
});
