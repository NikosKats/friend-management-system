export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';

export const fetchUserRequest = (userId: string) => ({
  type: FETCH_USER_REQUEST,
  payload: userId,
});
