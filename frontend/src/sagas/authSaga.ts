import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, loginFailure, handleLoginSuccess } from '../actions/authActions';
import { loginApi } from '../api/authApi';

// Worker Saga for Login
function* handleLogin(action: any) {
  console.log("⏳ Saga: handleLogin started. Action payload:", action.payload);

  const { email, password } = action.payload;

  try {
    console.log("🔄 Saga: Calling login API with email:", email, "and password:", password);
    const data = yield call(loginApi, email, password);  // API call to authenticate user
    console.log("📡 Saga: API Response:", data);

    if (data.token && data.user) {
      console.log("✅ Saga: Login success, dispatching LOGIN_SUCCESS.");
      
      // Store token and user in localStorage, and dispatch success
      yield put(handleLoginSuccess(data.token, data.user));
    } else {
      console.log("❌ Saga: Login failed, dispatching LOGIN_FAILURE.");
      yield put(loginFailure(data.message || 'Login failed'));
    }
  } catch (error: any) {
    console.error("⚠️ Saga: Login error", error);
    yield put(loginFailure(error.message || 'Login failed'));
  }
}

// Watcher Saga for LOGIN_REQUEST
function* watchLoginRequest() {
  console.log("👀 Watching for LOGIN_REQUEST action...");
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}

export default watchLoginRequest;
