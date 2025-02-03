const API_URL = 'http://localhost:8080/'; // Adjust API URL if needed

// API function to fetch user's friends
export const myFriendsApi = async () => { 
 
  const user = localStorage.getItem("user");
 
  const parsedUser = JSON.parse(user); // Parse the JSON string into an object
  const userId = parsedUser._id; // Extract the _id
  console.log("User ID:", userId);
 

  const token = localStorage.getItem("token");

  if (!token) {
    console.error("🛑 [API] No token found! Authentication required.");
    throw new Error("Authentication token missing.");
  }

  try {
    const response = await fetch(`${API_URL}friends/list/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         "x-auth-token": token ? `${token}` : ""
      },
    });

    console.log("📡 [API] Response received:", response);

    const data = await response.json();
    console.log("📡 [API] Parsed JSON:", data);

    if (!response.ok) {
      console.error("❌ [API] Fetch failed:", data.message);
      throw new Error(data.message || "Failed to fetch friends list");
    }

    return data;
  } catch (error) {
    console.error("🔥 [API] Error fetching friends list:", error);
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
        'Content-Type': 'application/json', // Ensure JSON content typ
         "x-auth-token": token ? `${token}` : ""
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
