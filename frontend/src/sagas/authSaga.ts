import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  loginRequest, 
  loginSuccess, 
  loginFailure 
} from '../actions/authActions';  

const API_URL = 'http://localhost:8080/'; // Adjust API URL if needed

// Function to call the API for login
const loginApi = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials'); // Handle errors properly
  }

  return response.json();
};

// Worker Saga for Login Request
function* handleLogin(action: any) {

  try {
    const { email, password } = action.payload;

    console.log('Saga: handleLogin started', action.payload);
    console.log('Saga: Calling API with', email, password);

    const data = yield call(loginApi, email, password);
    console.log('Saga: API Response', data);

    if (data.token && data.user) {
      console.log('Saga: Dispatching LOGIN_SUCCESS');
      yield put({ type: LOGIN_SUCCESS, payload: { user: data.user, token: data.token } });
    } else {
      console.log('Saga: Dispatching LOGIN_FAILURE');
      yield put({ type: LOGIN_FAILURE, payload: data.message || 'Login failed' });
    }
  } catch (error: any) {
    console.error('Saga: Login error', error);
    yield put({ type: LOGIN_FAILURE, payload: error.message || 'Login failed' });
  }
}


// Watcher Saga
function* watchLoginRequest() {
  console.log('Saga: Watching for LOGIN_REQUEST');
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}


export default watchLoginRequest;
