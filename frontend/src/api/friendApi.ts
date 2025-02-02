const API_URL = 'http://localhost:8080/'; // Adjust API URL if needed

// API Request for Sending a Friend Request
export const sendFriendRequestApi = async (senderId: string, receiverId: string) => {
  console.log(`📡 API: Sending Friend Request from ${senderId} to ${receiverId}`);
  
  try {
    const response = await fetch(`${API_URL}friendRequests/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Ensure JSON content type
      },
      body: JSON.stringify({
        senderId, // Sender ID
        receiverId, // Receiver ID
      }),
    });

    if (!response.ok) {
      console.error("⚠️ API: Error in sending Friend Request. Response not OK.", response);
      throw new Error('Error sending Friend Request');
    }

    const data = await response.json();
    console.log("📥 API: Received response for sending Friend Request:", data);
    
    return data;
  } catch (error) {
    console.error("🔥 API: Error in sending Friend Request:", error);
    throw error;
  }
};

// API Request for Responding to a Friend Request (Accept/Decline)
export const respondToFriendRequestApi = async (requestId: string, status: string) => {
  console.log(`📡 API: Responding to Friend Request with ID: ${requestId}, Status: ${status}`);
  
  try {
    const response = await fetch(`${API_URL}friendRequests/respond`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Ensure JSON content type
      },
      body: JSON.stringify({
        requestId, // Friend request ID
        status, // "accepted" or "declined"
      }),
    });

    if (!response.ok) {
      console.error("⚠️ API: Error in responding to Friend Request. Response not OK.", response);
      throw new Error('Error responding to Friend Request');
    }

    const data = await response.json();
    console.log("📥 API: Received response for responding to Friend Request:", data);

    return data;
  } catch (error) {
    console.error("🔥 API: Error in responding to Friend Request:", error);
    throw error;
  }
};

// API Request for Removing a Friend
export const removeFriendApi = async (userId: string, friendId: string) => {
  console.log(`📡 API: Removing Friend with ID: ${friendId} for User with ID: ${userId}`);
  
  try {
    const response = await fetch(`${API_URL}friends/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Ensure JSON content type
      },
      body: JSON.stringify({
        userId, // User ID
        friendId, // Friend ID
      }),
    });

    if (!response.ok) {
      console.error("⚠️ API: Error in removing Friend. Response not OK.", response);
      throw new Error('Error removing Friend');
    }

    const data = await response.json();
    console.log("📥 API: Received response for removing Friend:", data);
    
    return data;
  } catch (error) {
    console.error("🔥 API: Error in removing Friend:", error);
    throw error;
  }
};
