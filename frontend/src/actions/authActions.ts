// src/actions/authActions.ts

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';  

export const loginRequest = (email: string, password: string) => ({
  type: LOGIN_REQUEST,
  payload: { email, password },
});

export const loginSuccess = (data: any) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

// Dispatch login success and save to localStorage
export const handleLoginSuccess = (token: string, user: any) => {
  // Save the token and user to localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  return loginSuccess(user);
};

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
 

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const handleLogout = () => {
  // Clear token and user from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // Dispatch the logout action
  return logout();
};
