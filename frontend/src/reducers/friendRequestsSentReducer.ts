import {
    FETCH_FRIEND_REQUESTS_SENT_REQUEST,
    FETCH_FRIEND_REQUESTS_SENT_SUCCESS,
    FETCH_FRIEND_REQUESTS_SENT_FAILURE,
} from '../actions/friendRequestsSentActions';

type FriendRequestsSentState = {
    friendRequests: any[];
    loading: boolean;
    error: string | null;
};

const initialState: FriendRequestsSentState = {
    friendRequests: [],
    loading: false,
    error: null,
};

export const friendRequestsSentReducer = (state = initialState, action: any): FriendRequestsSentState => {
    console.log('🚀 [REDUCER] Current State:', state); // Log current state
    console.log('📥 [REDUCER] Dispatched Action:', action); // Log dispatched action

    switch (action.type) {
        case FETCH_FRIEND_REQUESTS_SENT_REQUEST:
            console.log('⏳ [REDUCER] Handling FETCH_FRIEND_REQUESTS_SENT_REQUEST...');
            return { ...state, loading: true };

        case FETCH_FRIEND_REQUESTS_SENT_SUCCESS:
            console.log('✅ [REDUCER] Handling FETCH_FRIEND_REQUESTS_SENT_SUCCESS...');
            return { ...state, loading: false, friendRequests: action.payload };

        case FETCH_FRIEND_REQUESTS_SENT_FAILURE:
            console.log('❌ [REDUCER] Handling FETCH_FRIEND_REQUESTS_SENT_FAILURE...');
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default friendRequestsSentReducer;
