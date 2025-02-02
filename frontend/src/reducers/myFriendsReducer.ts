import {
    FETCH_MY_FRIENDS_REQUEST,
    FETCH_MY_FRIENDS_SUCCESS,
    FETCH_MY_FRIENDS_FAILURE,
  } from '../actions/myFriendsActions';
  
  type FriendsState = {
    friends: any[];
    loading: boolean;
    error: string | null;
  };
  
  const initialState: FriendsState = {
    friends: [],
    loading: false,
    error: null,
  };
  
  export const myFriendsReducer = (state = initialState, action: any): FriendsState => {
    console.log('🚀 [REDUCER] Current State:', state);  // Log current state
    console.log('📥 [REDUCER] Dispatched Action:', action);  // Log dispatched action
  
    switch (action.type) {
      case FETCH_MY_FRIENDS_REQUEST:
        console.log('⏳ [REDUCER] Handling FETCH_MY_FRIENDS_REQUEST...');
        return { ...state, loading: true };
        
      case FETCH_MY_FRIENDS_SUCCESS:
        console.log('✅ [REDUCER] Handling FETCH_MY_FRIENDS_SUCCESS...');
        return { ...state, loading: false, friends: action.payload };
        
      case FETCH_MY_FRIENDS_FAILURE:
        console.log('❌ [REDUCER] Handling FETCH_MY_FRIENDS_FAILURE...');
        return { ...state, loading: false, error: action.payload };
        
      default:
        return state;
    }
  };
  
  export default myFriendsReducer;
  