import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from '../actions/usersActions';

type UserState = {
  users: any[];
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action: any): UserState => {
  console.log('🚀 [REDUCER] Current State:', state);  // Log current state
  console.log('📥 [REDUCER] Dispatched Action:', action);  // Log dispatched action

  switch (action.type) {
    case FETCH_USERS_REQUEST:
      console.log('⏳ [REDUCER] Handling FETCH_USERS_REQUEST...');
      return { ...state, loading: true };
      
    case FETCH_USERS_SUCCESS:
      console.log('✅ [REDUCER] Handling FETCH_USERS_SUCCESS...');
      return { ...state, loading: false, users: action.payload };
      
    case FETCH_USERS_FAILURE:
      console.log('❌ [REDUCER] Handling FETCH_USERS_FAILURE...');
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};

export default userReducer;
