import { 
  SEND_FRIEND_REQUEST_REQUEST, 
  SEND_FRIEND_REQUEST_SUCCESS, 
  SEND_FRIEND_REQUEST_FAILURE,
  RESPOND_FRIEND_REQUEST_REQUEST,
  RESPOND_FRIEND_REQUEST_SUCCESS,
  RESPOND_FRIEND_REQUEST_FAILURE,
} from '../actions/friendActions';  // Ensure the correct path

const initialState = {
  loading: false,
  error: null,
  message: '',
};

const friendReducer = (state = initialState, action: any) => {
  console.log("🚀 [REDUCER] Current State:", state);  // Log current state
  console.log("📥 [REDUCER] Dispatched Action:", action);  // Log dispatched action
  
  switch (action.type) {
    case SEND_FRIEND_REQUEST_REQUEST:
      console.log("⏳ [REDUCER] Handling SEND_FRIEND_REQUEST_REQUEST...");
      return {
        ...state,
        loading: true,
        error: null,
        message: '',
      };

    case SEND_FRIEND_REQUEST_SUCCESS:
      console.log("✅ [REDUCER] Handling SEND_FRIEND_REQUEST_SUCCESS with message:", action.payload);
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case SEND_FRIEND_REQUEST_FAILURE:
      console.error("❌ [REDUCER] Handling SEND_FRIEND_REQUEST_FAILURE with error:", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case RESPOND_FRIEND_REQUEST_REQUEST:
      console.log("⏳ [REDUCER] Handling RESPOND_FRIEND_REQUEST_REQUEST...");
      return {
        ...state,
        loading: true,
        error: null,
        message: '',
      };

    case RESPOND_FRIEND_REQUEST_SUCCESS:
      console.log("✅ [REDUCER] Handling RESPOND_FRIEND_REQUEST_SUCCESS with message:", action.payload);
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case RESPOND_FRIEND_REQUEST_FAILURE:
      console.error("❌ [REDUCER] Handling RESPOND_FRIEND_REQUEST_FAILURE with error:", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default friendReducer;
