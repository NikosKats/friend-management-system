import {
    FETCH_FRIEND_REQUESTS_RECEIVED_REQUEST,
    FETCH_FRIEND_REQUESTS_RECEIVED_SUCCESS,
    FETCH_FRIEND_REQUESTS_RECEIVED_FAILURE,
} from '../actions/friendRequestsReceivedActions';

type FriendRequestsReceivedState = {
    friendRequests: any[];
    loading: boolean;
    error: string | null;
};

const initialState: FriendRequestsReceivedState = {
    friendRequests: [],
    loading: false,
    error: null,
};

export const friendRequestsReceivedReducer = (state = initialState, action: any): FriendRequestsReceivedState => {
    console.log('🚀 [REDUCER] Current State:', state); // Log current state
    console.log('📥 [REDUCER] Dispatched Action:', action); // Log dispatched action

    switch (action.type) {
        case FETCH_FRIEND_REQUESTS_RECEIVED_REQUEST:
            console.log('⏳ [REDUCER] Handling FETCH_FRIEND_REQUESTS_RECEIVED_REQUEST...');
            return { ...state, loading: true };

        case FETCH_FRIEND_REQUESTS_RECEIVED_SUCCESS:
            console.log('✅ [REDUCER] Handling FETCH_FRIEND_REQUESTS_RECEIVED_SUCCESS...');
            return { ...state, loading: false, friendRequests: action.payload };

        case FETCH_FRIEND_REQUESTS_RECEIVED_FAILURE:
            console.log('❌ [REDUCER] Handling FETCH_FRIEND_REQUESTS_RECEIVED_FAILURE...');
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default friendRequestsReceivedReducer;
